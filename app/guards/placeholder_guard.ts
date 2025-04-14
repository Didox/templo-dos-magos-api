// app/guards/placeholder_guard.ts
import { GuardContract } from '@adonisjs/auth/types'

/**
 * Este é um guard de placeholder que não implementa autenticação real.
 * A propriedade [GUARD_KNOWN_EVENTS] é necessária em tempo de execução,
 * mas não é reconhecida pelo TypeScript.
 */
export function placeholderGuard(): GuardContract<null> {
  // @ts-ignore - Ignorando o erro de tipagem para a propriedade [GUARD_KNOWN_EVENTS]
  return {
    driverName: 'placeholder',
    authenticate: async () => {
      throw new Error('Autenticação não implementada.')
    },
    check: async () => false,
    isAuthenticated: false,
    user: null,
    getUserOrFail: () => null,
    authenticationAttempted: false,
    authenticateAsClient: async () => {
      throw new Error('Autenticação como cliente não implementada.')
    },
    [Symbol.for('GUARD_KNOWN_EVENTS')]: [],
  }
}
