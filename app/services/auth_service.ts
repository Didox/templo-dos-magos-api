import { createValidator } from '@adonisjs/validator/validator'
import { validator } from '@adonisjs/validator'
import hash from '@adonisjs/core/services/hash'
import { LoginDTO, TokenDTO } from '#dtos/auth.dto'
import Usuario from '#models/usuario'

const loginSchema = createValidator.object({
  email: createValidator.string().trim().email().required(),
  senha: createValidator.string().required(),
})

export class AuthService {
  async login(dados: LoginDTO): Promise<TokenDTO> {
    // Valida os dados
    const dadosValidados = await validator.validate({
      schema: loginSchema,
      data: dados,
    })

    // Busca o usuário pelo email
    const usuario = await Usuario.query().where('email', dadosValidados.email).firstOrFail()

    // Verifica a senha
    const senhaCorreta = await hash.verify(usuario.senha, dadosValidados.senha)
    if (!senhaCorreta) {
      throw new Error('Credenciais inválidas')
    }

    // Use o sistema de tokens de acesso em vez do JWT
    const token = await Usuario.accessTokens.create(usuario)

    // Retorna o token com informações de expiração
    return {
      type: 'bearer',
      token: token.value!.release(),
      expires_at: token.expiresAt?.toISOString(),
    }
  }

  async me(userId: number) {
    const usuario = await Usuario.findOrFail(userId)
    return usuario
  }
}
