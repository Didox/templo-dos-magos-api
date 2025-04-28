import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'
import { UsuarioDTO, UpdateUsuarioDTO, UpdateSenhaDTO } from '#dtos/usuario_dto.js'
import vine from '@vinejs/vine'

const usuarioSchema = vine.object({
  nome: vine.string().trim(),
  sobrenome: vine.string().trim(),
  documento: vine.string().trim(),
  cep: vine.string().trim(),
  endereco: vine.string().trim(),
  numero: vine.string().trim(),
  complemento: vine.string().trim().optional(),
  bairro: vine.string().trim(),
  cidade: vine.string().trim(),
  estado: vine.string().trim(),
  email: vine.string().trim().email(),
  senha: vine.string(),
})

const updateUsuarioSchema = vine.object({
  nome: vine.string().trim().optional(),
  sobrenome: vine.string().trim().optional(),
  documento: vine.string().trim().optional(),
  cep: vine.string().trim().optional(),
  endereco: vine.string().trim().optional(),
  numero: vine.string().trim().optional(),
  complemento: vine.string().trim().optional(),
  bairro: vine.string().trim().optional(),
  cidade: vine.string().trim().optional(),
  estado: vine.string().trim().optional(),
  email: vine.string().trim().email().optional(),
})

const updateSenhaSchema = vine.object({
  senha: vine.string(),
  senha_atual: vine.string(),
  senha_confirmacao: vine.string(),
})

export class UsuarioService {
  async create(dados: UsuarioDTO) {
    // Valida os dados
    const dadosValidados = await vine.validate({
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
    const dadosValidados = await vine.validate({
      schema: updateUsuarioSchema,
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

  async updateSenha(id: number, dados: UpdateSenhaDTO) {
    const usuario = await Usuario.findOrFail(id)

    // Valida a nova senha
    const dadosValidados = await vine.validate({
      schema: updateSenhaSchema,
      data: dados,
    })

    // Validação das senhas
    if (dados.senha !== dados.senha_confirmacao) {
      throw new Error('A senha e a confirmação de senha não coincidem')
    }

    // Verificar se a senha atual está correta
    const senhaCorreta = await hash.verify(usuario.senha, dados.senha_atual)
    if (!senhaCorreta) {
      throw new Error('A senha atual está incorreta')
    }

    // Criptografa e atualiza a senha
    usuario.senha = await hash.make(dadosValidados.senha)
    await usuario.save()
    return usuario
  }
}
