import { HttpContext } from '@adonisjs/core/http'
import Pedido from '#models/pedido'

export default class PedidosController {
  async index({ response }: HttpContext) {
    const pedidos = await Pedido.query()
      .preload('usuario')
      .preload('produtos', (query) => {
        query.preload('produto')
      })
    return response.json(pedidos)
  }

  async show({ params, response }: HttpContext) {
    try {
      const pedido = await Pedido.query()
        .where('id', params.id)
        .preload('usuario')
        .preload('produtos', (query) => {
          query.preload('produto')
        })
        .firstOrFail()

      return response.json(pedido)
    } catch (error) {
      return response.status(404).json({
        message: 'Pedido não encontrado',
      })
    }
  }

  async create({ request, response }: HttpContext) {
    const dados = request.only(['usuario_id', 'produtos', 'forma_pagamento', 'observacoes'])

    try {
      // Calcula o valor total baseado nos produtos
      const valorTotal = dados.produtos.reduce((total: number, item: any) => {
        return total + item.preco_unitario * item.quantidade
      }, 0)

      const pedido = await Pedido.create({
        usuario_id: dados.usuario_id,
        valor_total: valorTotal,
        forma_pagamento: dados.forma_pagamento,
        observacoes: dados.observacoes,
        status: 'pendente',
      })

      // Cria os itens do pedido
      await pedido.related('produtos').createMany(dados.produtos)

      // Recarrega o pedido com os relacionamentos
      await pedido.refresh()
      await pedido.load('produtos', (query) => {
        query.preload('produto')
      })
      await pedido.load('usuario')

      return response.status(201).json(pedido)
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao criar pedido',
        error: error.message
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const pedido = await Pedido.findOrFail(params.id)
      const { status } = request.only(['status'])

      await pedido.merge({ status }).save()

      await pedido.load('produtos', (query) => {
        query.preload('produto')
      })
      await pedido.load('usuario')

      return response.json(pedido)
    } catch (error) {
      return response.status(404).json({
        message: 'Pedido não encontrado',
      })
    }
  }
} 