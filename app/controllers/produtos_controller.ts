/**
 * @swagger
 * tags:
 *   - name: Produtos
 *     description: Tudo relacionado aos produtos disponíveis
 */
import { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produto'

export default class ProdutosController {
  /**
   * @swagger
   * tags:
   *   - Produtos
   * summary: Lista os produtos com paginação e filtros
   * parameters:
   *   - name: page
   *     in: query
   *     description: Número da página para paginação
   *     required: false
   *     schema:
   *       type: integer
   *       default: 1
   *   - name: limit
   *     in: query
   *     description: Quantidade de produtos por página (máximo 30)
   *     required: false
   *     schema:
   *       type: integer
   *       default: 10
   *   - name: categoria
   *     in: query
   *     description: ID da categoria para filtrar
   *     required: false
   *     schema:
   *       type: string
   *   - name: nome
   *     in: query
   *     description: Nome do produto para busca parcial
   *     required: false
   *     schema:
   *       type: string
   * responses:
   *   200:
   *     description: Lista paginada de produtos
   *   400:
   *     description: Limite maior que o permitido
   *   500:
   *     description: Erro ao buscar produtos
   */
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const categoriaId = request.input('categoria')
      const nome = request.input('nome')

      if (limit > 30) {
        return response.status(400).json({
          message: 'O limite máximo de produtos por página é 30',
        })
      }

      const query = Produto.query().preload('categoria')

      if (categoriaId) {
        query.where('categoria_id', categoriaId)
      }

      if (nome) {
        query.where('nome', 'like', `%${nome}%`)
      }

      const produtos = await query.paginate(page, limit)

      return response.json(produtos)
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao buscar produtos',
      })
    }
  }

  /**
   * @swagger
   * tags:
   *   - Produtos
   * summary: Detalha um produto específico por ID
   * parameters:
   *   - name: id
   *     in: path
   *     description: ID do produto
   *     required: true
   *     schema:
   *       type: string
   * responses:
   *   200:
   *     description: Produto encontrado com sucesso
   *   404:
   *     description: Produto não encontrado
   */
  async show({ params, response }: HttpContext) {
    try {
      const produto = await Produto.query()
        .where('id', params.id)
        .preload('categoria')
        .firstOrFail()
      return response.json(produto)
    } catch (error) {
      return response.status(404).json({
        message: 'Produto não encontrado',
      })
    }
  }
}
