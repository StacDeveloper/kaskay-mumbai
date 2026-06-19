import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import type { Article } from "../../types/types"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import axios from "axios"
import * as speech from "expo-speech"

const API_URL = "http://localhost:3000"

const ArticleDetail = () => {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [speak, setSpeak] = useState<boolean>(false)

    const handlegoBack = () => {
        if (router.canGoBack()) {
            router.back()
        }
        router.replace("/")
    }

    const handleSpeak = () => {
        if (speak) {
            setSpeak(false)
            return
        }
        setSpeak(true)
        speech.speak(article?.body!, {
            language: "mr-IN",
            onDone: () => setSpeak(false),
            onError: () => setSpeak(false)
        })
    }

    const fetchParticularArticle = async (id: string) => {
        setLoading(true)
        try {
            const findarticle = await axios.get(`${API_URL}/api/articles/${id}`)
            setArticle(findarticle.data.data[0])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    console.log(article)
    useEffect(() => {
        fetchParticularArticle(id as string)
    }, [id])

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator color="#f97316" size="large" />
            </View>
        )
    }
    if (!article) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-gray-400">बातमी सापडली नाही</Text>
            </View>
        )
    }
    return (
        <View className="flex-1 bg-white">
            <TouchableOpacity
                onPress={handlegoBack}
                className="absolute top-12 left-4 w-9 z-10 h-9 bg-white rounded-full items-center shadow "
            >
                <Text className="text-gray-700 text-lg">←</Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                {article.imageUrl && (
                    <Image
                        source={{ uri: article.imageUrl }}
                        className="w-full h-56"
                        resizeMode="cover"
                    />
                )}
                <View className="px-5 pt-5 pb-10">
                    <View className="bg-orange-100 sefl-start px-3 py-1 rounded-full mb-3">
                        <Text className="text-orange-500 text-xs font-medium">{article.category}</Text>
                    </View>
                    <Text className="text-gray-900 text-xl font-bold leading-8">
                        {article.title}
                    </Text>
                    {article.subtitle && (
                        <Text className="text-gray-500 text-sm mt-2 leading-6">{article.subtitle}</Text>
                    )}

                    <View className="flex-row items-center mt-4 pb-4 border-b border-gray-100 gap-2">
                        <Text className="text-gray-400 text-xs">{article.author}</Text>
                        <Text className="text-gray-300 text-xs">•</Text>
                        <Text className="text-gray-400 text-xs">{article.readTimeMins} मि. वाचन</Text>
                        <Text className="text-gray-300 text-xs">•</Text>
                        <Text className="text-gray-400 text-xs">{new Date(article.publishedAt).toLocaleDateString("mr-IN")}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleSpeak}
                        className="flex-row items-center gap-2 mt-4 mb-5 bg-orange-50 self-start px-4 py-2 rounded-full">
                        <Text className="text-orange-500 text-sm">{speak ? "🔇" : "🔊 हा लेख ऐका"}</Text>
                    </TouchableOpacity>

                    {article.body && article.body.split("\n\n").map((para, i) => (
                        <Text
                            key={i}
                            className="text-gray-800 text-base leading-7 mb-4"
                        >
                            {para}
                        </Text>
                    ))}

                    {article.tags && article.tags.length > 0 && (
                        <View className="flex-row flex-wrap gap-2 mt-4">
                            {article.tags.map((tag) => (
                                <View
                                    key={tag}
                                    className="bg-gray-100 px-3 py-1 rounded-full"
                                >
                                    <Text className="text-gray-500 text-xs">#{tag}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                </View>
            </ScrollView>
        </View>
    )

}
export default ArticleDetail
