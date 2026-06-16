import { Request, Response } from "express"
import { db } from "../db"
import { articles } from "../db/schema"
import { desc, eq } from "drizzle-orm"

export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const article = await db.select().from(articles).orderBy(desc(articles.publishedAt))
        res.status(200).json({ success: true, data: article })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const getArticleById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }
        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide id to find article" })
        }
        const article = await db.select().from(articles).where(eq(articles.id, id))
        if (!article || !article.length) {
            return res.status(404).json({ success: false, message: "Article not found" })
        }
        return res.status(200).json({ success: false, data: article })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const createArticle = async (req: Request, res: Response) => {
    try {
        const createArticle = await db.insert(articles).values(req.body).returning()
        res.status(201).json({ success: true, data: createArticle[0] })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}