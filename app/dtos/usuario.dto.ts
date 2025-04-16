export type UsuarioDTO = {
  nome: string
  sobrenome: string
  documento: string
  cep: string
  endereco: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  email: string
  senha: string
}

export type UpdateUsuarioDTO = Partial<Omit<UsuarioDTO, 'senha'>>

export type UpdateSenhaDTO = {
  senha: string
}