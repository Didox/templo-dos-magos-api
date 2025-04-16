import { HttpContext } from '@adonisjs/core/http'
import { AuthService } from '#services/auth_service'
import Usuario from '#models/usuario'

export default class AuthController {
  constructor(protected authService = new AuthService()) {}

  async login({ request, response }: HttpContext) {
    try {
      const dados = request.only(['email', 'senha'])
      const token = await this.authService.login(dados)
      return response.json(token)
    } catch (error) {
      return response.status(401).json({
        message: 'Credenciais inválidas',
      })
    }
  }

  async me({ auth, response }: HttpContext) {
    try {
      const userId = (auth.user as Usuario)?.id
      if (!userId) {
        throw new Error('Não autorizado')
      }

      const usuario = await this.authService.me(userId)
      return response.json(usuario)
    } catch (error) {
      return response.status(401).json({
        message: 'Não autorizado',
      })
    }
  }
} 