import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export default mysqlTable('users', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 150 }).notNull(),
  lastname: varchar({ length: 150 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  password_hash: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 50 }).notNull()
})
