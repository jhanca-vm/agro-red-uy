import { date, float, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import users from './users'

export default mysqlTable('services', {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 150 }).notNull(),
  description: varchar({ length: 500 }).notNull(),
  category: varchar({ length: 50 }).notNull(),
  price: varchar({ length: 50 }).notNull(),
  start: date().notNull(),
  end: date().notNull(),
  latitude: float().notNull(),
  longitude: float().notNull(),
  user_id: int()
    .references(() => users.id)
    .notNull()
})
