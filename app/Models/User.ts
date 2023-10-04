import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  
  
  
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public cpf: string

  @column()
  public nascimento: DateTime
  
  @column()
  public telefone: string
  
  @column()
  public avatar: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
