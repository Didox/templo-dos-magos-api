export interface UsuarioDTO {
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

export interface UpdateUsuarioDTO {
  nome?: string
  sobrenome?: string
  documento?: string
  cep?: string
  endereco?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
}

export interface UpdateSenhaDTO {
  senha: string
}
