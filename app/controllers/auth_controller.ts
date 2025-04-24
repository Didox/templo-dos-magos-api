import { HttpContext } from '@adonisjs/core/http'
import { AuthService } from '#services/auth_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthController {
  constructor(protected authService: AuthService) {}

  async login({ request, response }: HttpContext) {
    const { email, senha } = request.body()
    const result = await this.authService.login({ email, senha })
    return response.json(result)
  }
}
