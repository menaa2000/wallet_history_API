import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('subject').notNullable()
      table.integer('amount').notNullable()
      table.string('direction', 11).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('time_stamp', { useTz: true })
     // table.timestamp('updated_at', { useTz: true })*/
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
