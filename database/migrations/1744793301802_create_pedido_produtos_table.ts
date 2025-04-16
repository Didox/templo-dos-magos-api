import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedido_produtos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('pedido_id')
        .unsigned()
        .references('id')
        .inTable('pedidos')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('produto_id')
        .unsigned()
        .references('id')
        .inTable('produtos')
        .onDelete('RESTRICT')
        .notNullable()
      table.integer('quantidade').notNullable()
      table.decimal('preco_unitario', 10, 2).notNullable()
      table.decimal('subtotal', 10, 2).notNullable()
      table.timestamp('criado_em').defaultTo(this.now())
      table.timestamp('atualizado_em').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
