import { validator } from '@adonisjs/validator'
import { createValidator } from '@adonisjs/validator/validator'
import { PedidoDTO, UpdatePedidoDTO, PedidoProdutoDTO } from '#dtos/pedido.dto'
import Pedido from '#models/pedido'
import db from '@adonisjs/lucid/services/db'

const pedidoSchema = createValidator.object({
  usuario_id: createValidator.number().required(),
  produtos: createValidator
    .array()
    .members(
      createValidator.object({
        produto_id: createValidator.number().required(),
        quantidade: createValidator.number().min(1).required(),
        preco_unitario: createValidator.number().min(0).required(),
      })
    )
    .minLength(1)
    .required(),
  forma_pagamento: createValidator
    .string()
    .trim()
    .maxLength(50)
    .oneOf(['cartao', 'pix', 'boleto'])
    .required(),
  observacoes: createValidator.string().trim().maxLength(500).optional(),
})

const updatePedidoSchema = createValidator.object({
  status: createValidator
    .string()
    .trim()
    .oneOf(['pendente', 'aprovado', 'cancelado', 'entregue'])
    .required(),
})

export class PedidoService {
  async create(dados: PedidoDTO) {
    // Valida os dados
    const dadosValidados = await validator.validate({
      schema: pedidoSchema,
      data: dados,
    })

    // Calcula o valor total do pedido
    const valorTotal = dadosValidados.produtos.reduce(
      (total: number, item: PedidoProdutoDTO) => total + item.preco_unitario * item.quantidade,
      0
    )

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

      // Cria os itens do pedido
      await pedido.related('produtos').createMany(dadosValidados.produtos, {
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
    const dadosValidados = await validator.validate({
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
}
