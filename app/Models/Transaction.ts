import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public  subject: string
  @column()
  public amount: string
  /*@column()
  public direction: number*/
  @column()
  public user_id: number// how to define as foreign key
  @column()
  public balance: string
  /*@column.dateTime({ autoCreate: true })
  public createdAt: DateTime
*/
  /*@column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime*/
}
//create table transactions(id int primary key auto_increment ,subject varchar(100),amount varchar(100),direction int(11),user_id int , foreign key(user_id) references users (id)    ON DELETE CASCADE,balance varchar(100),`time_stamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP);
