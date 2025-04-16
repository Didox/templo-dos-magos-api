import vine from '@vinejs/vine'
import hash from '@adonisjs/core/services/hash'
import { LoginDTO, TokenDTO } from '#dtos/auth_dto.js'
import Usuario from '#models/usuario.js'

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

    const accessToken = await Usuario.accessTokens.create(usuario)
    if (!accessToken.value) {
      throw new Error('Erro ao gerar token de acesso')
    }

    return {
      token: accessToken.value.toString(),
      type: 'Bearer',
    }
  }

  async me(userId: number) {
    const usuario = await Usuario.findOrFail(userId)
    return usuario
  }
}
