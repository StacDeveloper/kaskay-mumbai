import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import ArticleCard from "../components/ArticleCard"
import axios from "axios"
import type { Article } from "../types/types"


const API_URL = "http://localhost:3000"

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
            setArticles(res.data.data || [])
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
    const rest: Article[] = filtered.filter((art) => !art.isFeatured)


    return (
        <View className="flex-1 bg-gray-100" >
            <View className="bg-white px-4 pt-12 pb-3" >
                <View className="flex-row justify-between items-center" >
                    <View>
                        <Text className="text-orange-500 text-2xl font-bold" > कसकाय </Text>
                        < Text className="text-gray-400 text-xs" > मुंबई • आजच्या बातम्या </Text>
                    </View>
                    <TouchableOpacity className="w-9 h-9 rounded-full bg-orange-100 items-center"></TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 -mx-1">
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => SetactiveCategory(cat)}
                            className={`mr-2 px-4 py-1.5 rounded-full ${activeCategory === cat ? "bg-orange-500" : "bg-gray-100"}`}
                        >
                            <Text className={`text-xs font-medium ${activeCategory === cat ? "text-white" : "text-gray-500"}`}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator color={"#f97316"} size={"large"} />
                </View>
            ) : (
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { Setrefreshing(true); fetchArticles() }} colors={["#f97316"]} />}
                >
                    <View className="h-4" />
                    {featured && (
                        <ArticleCard
                            article={featured}
                            featured
                            onPress={() => router.push(`/article/${featured.id}`)}
                        />
                    )}
                    {rest.length > 0 && (
                        <View className="px-4 gap-3">
                            {Array.from({ length: Math.ceil(rest.length / 2) }, (_, i) => (
                                <View
                                    key={i}
                                    className="flex-row gap-3"
                                >
                                    {rest.slice(i * 2, i * 2 + 2).map(article => (
                                        <ArticleCard
                                            key={article.id}
                                            article={article}
                                            onPress={() => router.push(`/article/${article.id}`)}
                                        />
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                    <View className="h-6" />
                </ScrollView>
            )}
        </View>
    )
}