import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { TokenService } from '#services/token_service'

/**
 * Middleware de autenticação para proteger rotas
 * e gerenciar o acesso de usuários autenticados
 */
export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    let token = ctx.request.header('Authorization')
    token = token?.replace('Bearer ', '')

    if (!token) {
      return ctx.response.status(401).json({
        error: 'Não autorizado',
        message: 'Token de autenticação não fornecido',
      })
    }

    try {
      new TokenService().verifyToken(token)
      return next()
    } catch (error) {
      return ctx.response.status(401).json({
        error: 'Não autorizado',
        message: 'Token de autenticação inválido',
      })
    }
  }
}
