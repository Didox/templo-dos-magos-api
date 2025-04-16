import router from '@adonisjs/core/services/router'

// Rota Home
router.get('/', '#controllers/home_controller.index')

// Rotas de produtos
router.group(() => {
    router.get('/', '#controllers/produtos_controller.index').as('produtos.index')
    router.get('/:id', '#controllers/produtos_controller.show')
}).prefix('/produtos')

// Rotas de categorias
router.group(() => {
    router.get('/', '#controllers/categorias_controller.index').as('categorias.index')
    router.get('/:id', '#controllers/categorias_controller.show')
}).prefix('/categorias')

// Rotas de usuários
router.group(() => {
    router.get('/', '#controllers/usuarios_controller.index').as('usuarios.index')
    router.get('/:id', '#controllers/usuarios_controller.show')
    router.post('/', '#controllers/usuarios_controller.create')
    router.put('/:id', '#controllers/usuarios_controller.update')
    router.patch('/:id/senha', '#controllers/usuarios_controller.updateSenha')
}).prefix('/usuarios')

// Rotas de pedidos
router.group(() => {
    router.get('/', '#controllers/pedidos_controller.index').as('pedidos.index')
    router.get('/:id', '#controllers/pedidos_controller.show')
    router.post('/', '#controllers/pedidos_controller.create')
    router.put('/:id', '#controllers/pedidos_controller.update')
}).prefix('/pedidos')
