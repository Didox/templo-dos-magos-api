import jwt from 'jsonwebtoken'
import type Usuario from '#models/usuario'
import { DateTime } from 'luxon'

export class TokenService {
  private readonly secretKey: string = process.env.JWT_SECRET!

  generateToken(usuario: Usuario, dias: number): { value: string; expiresAt: string } {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
    }

    const token = jwt.sign(payload, this.secretKey, {
      expiresIn: `${dias}d`,
    })

    return {
      value: token,
      expiresAt: DateTime.now().plus({ days: dias }).toISO(),
    }
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.secretKey)
    } catch (error) {
      throw new Error('Token inválido')
    }
  }
}
