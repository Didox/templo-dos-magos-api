// config/auth.ts
import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'

export default defineConfig({
  default: 'access_tokens',
  guards: {
    access_tokens: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/usuario'),
      }),
    }),
  },
})
