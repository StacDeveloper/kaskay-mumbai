import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import articleRoutes from "./routes/article"

dotenv.config()

const app = express()
const PORT: number = Number(process.env.PORT!) || 3000

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use("/api/articles", articleRoutes)
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})