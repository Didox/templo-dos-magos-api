/**
 * @swagger
 * tags:
 *   - name: Pedidos
 *     description: Tudo relacionado aos pedidos realizados no sistema
 */
import { HttpContext } from '@adonisjs/core/http'
import { PedidoService } from '#services/pedido_service'

export default class PedidosController {
  constructor(protected pedidoService = new PedidoService()) {}

  /**
   * @swagger
   * tags:
   *  - Pedidos
   * summary: Lista todos os pedidos
   * responses:
   *   200:
   *     description: Lista de pedidos retornada com sucesso
   */
  async index({ response }: HttpContext) {
    const pedidos = await this.pedidoService.findAll()
    return response.json(pedidos)
  }

  /**
   * @swagger
   * tags:
   *  - Pedidos
   * summary: Retorna um pedido por ID
   * parameters:
   *   - name: id
   *     in: path
   *     required: true
   *     schema:
   *       type: string
   * responses:
   *   200:
   *     description: Pedido encontrado
   *   404:
   *     description: Pedido não encontrado
   */
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

  /**
   * @swagger
   * tags:
   *  - Pedidos
   * summary: Cria um novo pedido
   * requestBody:
   *   required: true
   *   content:
   *     application/json:
   *       schema:
   *         type: object
   *         properties:
   *           usuario_id:
   *             type: string
   *           produtos:
   *             type: array
   *             items:
   *               type: object
   *               properties:
   *                 produto_id:
   *                   type: string
   *                 quantidade:
   *                   type: integer
   *           forma_pagamento:
   *             type: string
   *           observacoes:
   *             type: string
   * responses:
   *   201:
   *     description: Pedido criado com sucesso
   *   400:
   *     description: Erro ao criar pedido
   */
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

  /**
   * @swagger
   * tags:
   *  - Pedidos
   * summary: Atualiza o status de um pedido
   * parameters:
   *   - name: id
   *     in: path
   *     required: true
   *     schema:
   *       type: string
   * requestBody:
   *   required: true
   *   content:
   *     application/json:
   *       schema:
   *         type: object
   *         properties:
   *           status:
   *             type: string
   * responses:
   *   200:
   *     description: Pedido atualizado com sucesso
   *   400:
   *     description: Mudança de status não permitida
   *   404:
   *     description: Pedido não encontrado
   */
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
