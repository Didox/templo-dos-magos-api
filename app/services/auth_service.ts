import vine from '@vinejs/vine'
import hash from '@adonisjs/core/services/hash'
import { LoginDTO, TokenDTO } from '#dtos/auth_dto.js'
import Usuario from '#models/usuario'
import { TokenService } from '#services/token_service'

const loginSchema = vine.object({
  email: vine.string().email().trim(),
  senha: vine.string().minLength(6),
})

export class AuthService {
  async login(dados: LoginDTO): Promise<TokenDTO> {
    const payload = await vine.validate({
      schema: loginSchema,
      data: dados,
    })

    const usuario = await Usuario.findBy('email', payload.email)
    if (!usuario) {
      throw new Error('Credenciais inválidas')
    }

    const senhaValida = await hash.verify(usuario.senha, payload.senha)
    if (!senhaValida) {
      throw new Error('Credenciais inválidas')
    }

    const dias = 7
    const token = await new TokenService().generateToken(usuario, dias)

    return {
      type: 'Bearer',
      token: token.value,
      expires_at: token.expiresAt,
    }
  }

  async me(userId: number) {
    const usuario = await Usuario.findOrFail(userId)
    return usuario
  }
}
