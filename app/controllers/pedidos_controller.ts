import { HttpContext } from '@adonisjs/core/http'
import { PedidoService } from '#services/pedido_service'

export default class PedidosController {
  constructor(protected pedidoService = new PedidoService()) {}

  async index({ response, request }: HttpContext) {
    const usuarioId = request.qs().usuario_id

    if (!usuarioId) {
      // Se não foi fornecido usuario_id, retorna todos os pedidos
      const pedidos = await this.pedidoService.findAll()
      return response.json(pedidos)
    }

    // Se foi fornecido usuario_id, filtra por usuário
    const pedidos = await this.pedidoService.findByUserId(usuarioId)
    return response.json(pedidos)
  }

  async show({ params, response }: HttpContext) {
    try {
      const pedido = await this.pedidoService.findById(params.id)
      return response.json(pedido)
    } catch (error) {
      return response.status(404).json({
        message: 'Pedido não encontrado',
      })
    }
  }

  async create({ request, response }: HttpContext) {
    try {
      const dados = request.only(['usuario_id', 'produtos', 'forma_pagamento', 'observacoes'])
      const pedido = await this.pedidoService.create(dados)
      return response.status(201).json(pedido)
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao criar pedido',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const dados = request.only(['status'])
      const pedido = await this.pedidoService.update(params.id, dados)
      return response.json(pedido)
    } catch (error) {
      if (error.message === 'Mudança de status não permitida') {
        return response.status(400).json({
          message: error.message,
        })
      }
      return response.status(404).json({
        message: 'Pedido não encontrado',
      })
    }
  }
}
