import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare sobrenome: string

  @column()
  declare documento: string

  @column()
  declare cep: string

  @column()
  declare endereco: string

  @column()
  declare numero: string

  @column()
  declare complemento: string | null

  @column()
  declare bairro: string

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare email: string

  @column()
  declare senha: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
