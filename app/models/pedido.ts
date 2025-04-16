import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Usuario from './usuario.js'
import PedidoProduto from './pedido_produto.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuario_id: number

  @column()
  declare valor_total: number

  @column()
  declare status: string

  @column()
  declare forma_pagamento: string

  @column()
  declare observacoes: string | null

  @column.dateTime({ autoCreate: true })
  declare criado_em: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare atualizado_em: DateTime

  @belongsTo(() => Usuario, {
    foreignKey: 'usuario_id',
  })
  declare usuario: BelongsTo<typeof Usuario>

  @hasMany(() => PedidoProduto)
  declare produtos: HasMany<typeof PedidoProduto>
}
