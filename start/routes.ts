import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import { middleware } from '#start/kernel'

// Swagger routes
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

// Rota Home
router.get('/', '#controllers/home_controller.index')

// Produtos
router
  .group(() => {
    router.get('/', '#controllers/produtos_controller.index').as('produtos.index')
    router.get('/:id', '#controllers/produtos_controller.show')
  })
  .prefix('/api/produtos')

// Categorias
router
  .group(() => {
    router.get('/', '#controllers/categorias_controller.index').as('categorias.index')
    router.get('/:id', '#controllers/categorias_controller.show')
  })
  .prefix('/api/categorias')

// Usuários
router
  .group(() => {
    router.get('/', '#controllers/usuarios_controller.index').as('usuarios.index')
    router.get('/perfil', '#controllers/usuarios_controller.perfil').as('usuarios.perfil')
    router.get('/:id', '#controllers/usuarios_controller.show')
    router.post('/', '#controllers/usuarios_controller.create')
    router.put('/:id', '#controllers/usuarios_controller.update')
    router.patch('/:id/senha', '#controllers/usuarios_controller.updateSenha')
  })
  .prefix('/api/usuarios')
  .use(middleware.auth())

// Pedidos
router
  .group(() => {
    router.get('/', '#controllers/pedidos_controller.index').as('pedidos.index')
    router.get('/:id', '#controllers/pedidos_controller.show')
    router.post('/', '#controllers/pedidos_controller.create')
    router.put('/:id', '#controllers/pedidos_controller.update')
  })
  .prefix('/api/pedidos')
  .use(middleware.auth())

// Auth
router
  .group(() => {
    router.post('/login', '#controllers/auth_controller.login')
    router.get('/me', '#controllers/auth_controller.me')
  })
  .prefix('/api/auth')
