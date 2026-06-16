import { pgTable, uuid, text, boolean, integer, timestamp } from "drizzle-orm/pg-core"

export const articles = pgTable("articles", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    body: text("summary"),
    author: text("author"),
    source: text("source").default("Kasakay"),
    sourceUrl: text("source_url").notNull(),
    category: text("category").notNull(),
    tags: text("tags").array(),
    imageUrl: text("image_url"),
    isBreaking: boolean("is_breaking").default(false),
    isFeatured: boolean("is_featured").default(false),
    readTimeMins: timestamp("read_time_mins").defaultNow(),
    publishedAt: timestamp("publishedAt").defaultNow(),
    createdAt: timestamp("updated_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name"),
    phone: text("phone").unique(),
    email: text("email").unique(),
    pushToken: text("push_token"),
    createdAt: timestamp("created_at").defaultNow()
})

export const userPreference = pgTable("user_preferences", {
    userId: uuid("user_id").references(() => users.id),
    category: text("category").notNull()
})

export const bookMarks = pgTable("bookmarks", {
    userId: uuid("user_id").references(() => users.id),
    articles: uuid("articles_id").references(() => articles.id),
    savedAt: timestamp("saved_at").defaultNow()
})