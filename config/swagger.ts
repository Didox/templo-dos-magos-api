import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  info: {
    title: 'Mundo dos Magos API',
    version: '1.0.0',
    description: 'Documentação da API Mundo dos Magos',
    contact: {
      name: 'Torne-se um programador',
      url: 'https://www.torneseumprogramador.com.br/cursos/desafio_node',
    },
  },
  tagIndex: 2,
  snakeCase: true,
  debug: false,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
  securitySchemes: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  authMiddlewares: ['auth', 'auth:api'],
  defaultSecurityScheme: 'BearerAuth',
  persistAuthorization: true,
  showFullPath: false,
}
