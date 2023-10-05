import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Publication from 'App/Models/Publication'
import { computed } from '@adonisjs/lucid/build/src/Orm/Decorators'

export default class PublicationImage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public publicationId: number

  @belongsTo(() => Publication)
  public publication: BelongsTo<typeof Publication>

  @column()
  public path: string

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public size: number

  //computed url
  @computed()
  public get url() {
    return `${process.env.APP_URL}/uploads/${this.path}`
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
