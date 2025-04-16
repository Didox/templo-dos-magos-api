import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 100).notNullable()
      table.string('sobrenome', 100).notNullable()
      table.string('documento', 100).notNullable().unique()
      table.string('cep', 25).notNullable()
      table.string('endereco', 200).notNullable()
      table.string('numero', 100).notNullable()
      table.string('complemento', 255)
      table.string('bairro', 200).notNullable()
      table.string('cidade', 100).notNullable()
      table.string('estado', 2).notNullable()
      table.string('email', 150).notNullable().unique()
      table.string('senha', 255).notNullable()

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}