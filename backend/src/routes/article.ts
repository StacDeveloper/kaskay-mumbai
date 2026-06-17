import express, { Router } from "express"
import { createArticle, getAllArticles, getArticleById } from "../controllers/articles"

const articleRoutes: Router = express.Router()

articleRoutes.get("/getAllArticles", getAllArticles)
articleRoutes.get("/:id", getArticleById)
articleRoutes.post("/create-article", createArticle)


export default articleRoutes