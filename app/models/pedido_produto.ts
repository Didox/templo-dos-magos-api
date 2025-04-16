import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Pedido from './pedido.js'
import Produto from './produto.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PedidoProduto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pedido_id: number

  @column()
  declare produto_id: number

  @column()
  declare quantidade: number

  @column()
  declare preco_unitario: number

  @column()
  declare subtotal: number

  @column.dateTime({ autoCreate: true })
  declare criado_em: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare atualizado_em: DateTime

  @belongsTo(() => Pedido, {
    foreignKey: 'pedido_id',
  })
  declare pedido: BelongsTo<typeof Pedido>

  @belongsTo(() => Produto, {
    foreignKey: 'produto_id',
  })
  declare produto: BelongsTo<typeof Produto>
} 