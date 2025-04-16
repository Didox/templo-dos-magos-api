import { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'

export default class UsuariosController {
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

    try {
      const usuario = await Usuario.create(dados)
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
      const usuario = await Usuario.findOrFail(params.id)
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
        'email'
      ])

      await usuario.merge(dados).save()
      return response.json(usuario)
    } catch (error) {
      return response.status(404).json({
        message: 'Usuário não encontrado',
      })
    }
  }
}