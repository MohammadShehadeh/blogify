import type { SQL } from 'drizzle-orm';
import { relations, sql } from 'drizzle-orm';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { pgTable, uuid, text, timestamp, uniqueIndex, index } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex('emailUniqueIndex').on(lower(table.email)),
  })
);

export const posts = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    imageUrl: text('imageUrl').notNull(),
    content: text('content').notNull(),
    status: text('status', { enum: ['draft', 'published'] }).notNull(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  },
  (table) => ({
    userIdIndex: index('userIdIndex').on(table.userId),
  })
);

export const comments = pgTable(
  'comments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    postId: uuid('postId')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  },
  (table) => ({
    postIdIndex: index('postIdIndex').on(table.postId),
  })
);

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
  comments: many(comments),
}));

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  user: one(users, { fields: [comments.userId], references: [users.id] }),
}));

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}
