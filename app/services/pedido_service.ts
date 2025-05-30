import vine from '@vinejs/vine'
import { PedidoDTO, UpdatePedidoDTO } from '#dtos/pedido_dto.js'
import Pedido from '#models/pedido'
import db from '@adonisjs/lucid/services/db'

const pedidoSchema = vine.object({
  usuario_id: vine.number(),
  produtos: vine
    .array(
      vine.object({
        produto_id: vine.number(),
        quantidade: vine.number().min(1),
        preco_unitario: vine.number().min(0),
      })
    )
    .minLength(1),
  forma_pagamento: vine.string().trim().maxLength(50).in(['cartao', 'pix', 'boleto']),
  observacoes: vine.string().trim().maxLength(500).optional(),
})

const updatePedidoSchema = vine.object({
  status: vine.string().trim().in(['pendente', 'aprovado', 'cancelado', 'entregue']),
})

export class PedidoService {
  async create(dados: PedidoDTO) {
    // Valida os dados
    const dadosValidados = await vine.validate({
      schema: pedidoSchema,
      data: dados,
    })

    // Validação adicional para garantir que existem produtos
    if (!dadosValidados.produtos || dadosValidados.produtos.length === 0) {
      throw new Error('O pedido deve conter pelo menos um produto')
    }

    // Calcula o valor total do pedido e prepara os itens com subtotal
    const produtosComSubtotal = dadosValidados.produtos.map((item) => {
      if (!item.produto_id || !item.quantidade || !item.preco_unitario) {
        throw new Error('Dados inválidos para os produtos do pedido')
      }

      return {
        ...item,
        subtotal: item.preco_unitario * item.quantidade,
      }
    })

    const valorTotal = produtosComSubtotal.reduce((total: number, item) => total + item.subtotal, 0)

    // Validação do valor total
    if (valorTotal <= 0) {
      throw new Error('O valor total do pedido deve ser maior que zero')
    }

    // Inicia a transação
    const trx = await db.transaction()

    try {
      // Cria o pedido
      const pedido = await Pedido.create(
        {
          usuario_id: dadosValidados.usuario_id,
          valor_total: valorTotal,
          forma_pagamento: dadosValidados.forma_pagamento,
          observacoes: dadosValidados.observacoes,
          status: 'pendente',
        },
        { client: trx }
      )

      // Cria os itens do pedido com subtotal
      await pedido.related('produtos').createMany(produtosComSubtotal, {
        client: trx,
      })

      // Confirma a transação
      await trx.commit()

      // Recarrega o pedido com os relacionamentos
      await pedido.refresh()
      await pedido.load('produtos', (query) => {
        query.preload('produto')
      })
      await pedido.load('usuario')

      return pedido
    } catch (error) {
      // Reverte a transação em caso de erro
      await trx.rollback()
      throw error
    }
  }

  async findById(id: number) {
    const pedido = await Pedido.query()
      .where('id', id)
      .preload('usuario')
      .preload('produtos', (query) => {
        query.preload('produto')
      })
      .firstOrFail()

    return pedido
  }

  async findAll() {
    const pedidos = await Pedido.query()
      .preload('usuario')
      .preload('produtos', (query) => {
        query.preload('produto')
      })

    return pedidos
  }

  async update(id: number, dados: UpdatePedidoDTO) {
    // Valida os dados
    const dadosValidados = await vine.validate({
      schema: updatePedidoSchema,
      data: dados,
    })

    const pedido = await this.findById(id)

    // Verifica se a mudança de status é permitida
    if (!this.isStatusChangeAllowed(pedido.status, dadosValidados.status)) {
      throw new Error('Mudança de status não permitida')
    }

    // Atualiza o status do pedido
    await pedido.merge({ status: dadosValidados.status }).save()

    return pedido
  }

  private isStatusChangeAllowed(currentStatus: string, newStatus: string): boolean {
    const statusFlow: Record<string, string[]> = {
      pendente: ['aprovado', 'cancelado'],
      aprovado: ['entregue', 'cancelado'],
      entregue: [],
      cancelado: [],
    }

    return statusFlow[currentStatus]?.includes(newStatus) || false
  }

  async findByUserId(usuarioId: number) {
    const pedidos = await Pedido.query()
      .where('usuario_id', usuarioId)
      .preload('usuario')
      .preload('produtos', (query) => {
        query.preload('produto')
      })
      .orderBy('criado_em', 'desc')

    return pedidos
  }
}
