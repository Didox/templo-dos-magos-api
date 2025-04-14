// config/auth.ts
import { defineConfig } from '@adonisjs/auth'
import { placeholderGuard } from '../app/guards/placeholder_guard.js'

export default defineConfig({
  default: 'placeholder',
  guards: {
    placeholder: () => placeholderGuard(),
  },
})
