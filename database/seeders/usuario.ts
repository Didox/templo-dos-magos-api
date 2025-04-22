import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Usuario from '#models/usuario'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    const senha = await hash.make('1234567890')

    const cep = '09931410'

    // Busca o endereço pelo CEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const endereco: any = await response.json()

    if (endereco.erro) {
      throw new Error('CEP não encontrado')
    }

    const usuario = {
      id: 1,
      nome: 'Danilo',
      email: 'danilo@teste.com',
      senha: senha,
      cep: cep,
      endereco: endereco.logradouro,
      numero: '400',
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf,
      complemento: null,
      documento: '1234567890',
      sobrenome: 'Aparecido',
    }

    await Usuario.updateOrCreate({ id: usuario.id }, usuario)
  }
}
