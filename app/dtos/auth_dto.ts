export interface LoginDTO {
  email: string
  senha: string
}

export interface TokenDTO {
  type: string
  token: string
  expires_at?: string
}
