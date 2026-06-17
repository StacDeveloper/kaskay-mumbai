import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import ArticleCard from "./components/ArticleCard"
import axios from "axios"
import type { Article } from "./types/types"


const API_URL = process.env.EXPO_BASE_URL!

const categories = ["सर्व", "तंत्रज्ञान", "राजकारण", "खेळ", "मनोरंजन", "व्यापार"]

export default function HomeFunction() {
    const router = useRouter()
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, Setloading] = useState<boolean>(true)
    const [refreshing, Setrefreshing] = useState<boolean>(false)
    const [activeCategory, SetactiveCategory] = useState<string>("सर्व")


    const fetchArticles = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/articles/getAllArticles`)
            setArticles(res.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            Setloading(false)
            Setrefreshing(false)
        }

    }

    useEffect(() => {
        fetchArticles()
    }, [])

    const filtered = activeCategory === "सर्व" ? articles : articles.filter((art) => art.category === activeCategory)
    const featured = filtered.find((art) => art.isFeatured)
    const rest = filtered.find((art) => !art.isFeatured)

    return (
        
    )
}