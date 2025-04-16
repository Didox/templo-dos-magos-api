import { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import { UsuarioService } from '#services/usuario_service'

export default class UsuariosController {
  constructor(protected usuarioService = new UsuarioService()) {}

  async index({ response }: HttpContext) {
    const usuarios = await Usuario.all()
    return response.json(usuarios)
  }

  async show({ params, response }: HttpContext) {
    try {
      const usuario = await Usuario.findOrFail(params.id)
      return response.json(usuario)
    } catch (error) {
      return response.status(404).json({
        message: 'Usuário não encontrado',
      })
    }
  }

  async create({ request, response }: HttpContext) {
    try {
      const dados = request.only([
        'nome',
        'sobrenome',
        'documento',
        'cep',
        'endereco',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado',
        'email',
        'senha',
      ])

      const usuario = await this.usuarioService.create(dados)
      return response.status(201).json(usuario)
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao criar usuário',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const dados = request.only([
        'nome',
        'sobrenome',
        'documento',
        'cep',
        'endereco',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado',
        'email',
      ])

      const usuario = await this.usuarioService.update(params.id, dados)
      return response.json(usuario)
    } catch (error) {
      return response.status(404).json({
        message: 'Usuário não encontrado',
      })
    }
  }

  async updateSenha({ params, request, response }: HttpContext) {
    try {
      const { senha } = request.only(['senha'])
      const usuario = await this.usuarioService.updateSenha(params.id, { senha })
      return response.json(usuario)
    } catch (error) {
      return response.status(404).json({
        message: 'Usuário não encontrado',
      })
    }
  }
}
