export interface LoginDTO {
  email: string
  senha: string
}

export interface TokenDTO {
  type: string
  token: string
  expires_at?: string
  usuario: {
    id: number
    nome: string
    email: string
  }
}
