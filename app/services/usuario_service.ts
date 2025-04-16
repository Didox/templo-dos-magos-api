import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import { validator } from '@adonisjs/validator'
import { createValidator } from '@adonisjs/validator/validator'
import { UsuarioDTO, UpdateUsuarioDTO, UpdateSenhaDTO } from '#dtos/usuario.dto'

const usuarioSchema = createValidator.object({
  nome: createValidator.string().trim().min(2).max(100).required(),
  sobrenome: createValidator.string().trim().min(2).max(100).required(),
  documento: createValidator.string().trim().min(11).max(14).required(),
  cep: createValidator.string().trim().min(8).max(9).required(),
  endereco: createValidator.string().trim().min(5).max(200).required(),
  numero: createValidator.string().trim().max(100).required(),
  complemento: createValidator.string().trim().max(255).optional(),
  bairro: createValidator.string().trim().min(2).max(200).required(),
  cidade: createValidator.string().trim().min(2).max(100).required(),
  estado: createValidator.string().trim().length(2).required(),
  email: createValidator.string().trim().email().required(),
  senha: createValidator.string().trim().min(6).required(),
})

export class UsuarioService {
  async create(dados: UsuarioDTO) {
    // Valida os dados
    const dadosValidados = await validator.validate({
      schema: usuarioSchema,
      data: dados,
    })

    // Verifica se já existe usuário com mesmo email ou documento
    const usuarioExistente = await Usuario.query()
      .where('email', dadosValidados.email)
      .orWhere('documento', dadosValidados.documento)
      .first()

    if (usuarioExistente) {
      throw new Error('Já existe um usuário com este email ou documento')
    }

    // Criptografa a senha
    dadosValidados.senha = await hash.make(dadosValidados.senha)

    // Cria o usuário
    const usuario = await Usuario.create(dadosValidados)
    return usuario
  }

  async update(id: number, dados: UpdateUsuarioDTO) {
    const usuario = await Usuario.findOrFail(id)

    // Valida os dados parcialmente (exclui campos não enviados)
    const schema = createValidator.object({
      nome: createValidator.string().trim().min(2).max(100).optional(),
      sobrenome: createValidator.string().trim().min(2).max(100).optional(),
      documento: createValidator.string().trim().min(11).max(14).optional(),
      cep: createValidator.string().trim().min(8).max(9).optional(),
      endereco: createValidator.string().trim().min(5).max(200).optional(),
      numero: createValidator.string().trim().max(100).optional(),
      complemento: createValidator.string().trim().max(255).optional(),
      bairro: createValidator.string().trim().min(2).max(200).optional(),
      cidade: createValidator.string().trim().min(2).max(100).optional(),
      estado: createValidator.string().trim().length(2).optional(),
      email: createValidator.string().trim().email().optional(),
    })

    const dadosValidados = await validator.validate({
      schema,
      data: dados,
    })

    // Verifica email/documento apenas se estiverem sendo atualizados
    if (dadosValidados.email || dadosValidados.documento) {
      const usuarioExistente = await Usuario.query()
        .where('id', '!=', id)
        .where((query) => {
          if (dadosValidados.email) {
            query.orWhere('email', dadosValidados.email)
          }
          if (dadosValidados.documento) {
            query.orWhere('documento', dadosValidados.documento)
          }
        })
        .first()

      if (usuarioExistente) {
        throw new Error('Email ou documento já está em uso por outro usuário')
      }
    }

    // Atualiza o usuário
    await usuario.merge(dadosValidados).save()
    return usuario
  }

  async updateSenha(id: number, { senha }: UpdateSenhaDTO) {
    const usuario = await Usuario.findOrFail(id)

    // Valida a nova senha
    const schema = createValidator.object({
      senha: createValidator.string().trim().min(6).required(),
    })

    await validator.validate({
      schema,
      data: { senha },
    })

    // Criptografa e atualiza a senha
    usuario.senha = await hash.make(senha)
    await usuario.save()
    return usuario
  }
}