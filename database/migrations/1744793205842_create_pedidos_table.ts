import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedidos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('usuario_id')
        .unsigned()
        .references('id')
        .inTable('usuarios')
        .onDelete('CASCADE')
        .notNullable()
      table.decimal('valor_total', 10, 2).notNullable()
      table.string('status', 20).notNullable().defaultTo('pendente')
      table.string('forma_pagamento', 50).notNullable()
      table.string('observacoes', 500)
      table.timestamp('criado_em').defaultTo(this.now())
      table.timestamp('atualizado_em').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
