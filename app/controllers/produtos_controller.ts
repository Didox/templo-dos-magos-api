import { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produto'

export default class ProdutosController {
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const categoriaId = request.input('categoria')

      if (limit > 30) {
        return response.status(400).json({
          message: 'O limite máximo de produtos por página é 30',
        })
      }

      const query = Produto.query().preload('categoria')

      if (categoriaId) {
        query.where('categoria_id', categoriaId)
      }

      const produtos = await query.paginate(page, limit)

      return response.json(produtos)
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao buscar produtos',
      })
    }
  }

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
