import { View, Text, Image, TouchableOpacity } from "react-native"
import type { Article } from "../types/types"

interface Props {
    article: Article;
    onPress: () => void
    featured?: boolean;
}

export default function ArticleCard({ article, onPress, featured = false }: Props) {
    if (featured) {
        return (
            <TouchableOpacity onPress={onPress} className="mx-4 mb-4 bg-white rounded-2xl overflow-hidden">
                <View className="h-48 bg-gray-200">
                    {article.imageUrl && (
                        <Image source={{ uri: article.imageUrl }} className="w-full h-full" resizeMode="cover" />
                    )}
                    <View className="absolute top-3 left-3 bg-orange-500 px-3 py-1 rounded-full">
                        <Text className="text-white text-xs font-medium">{article.category}</Text>
                    </View>
                </View>
                <View className="p-4">
                    <Text className="text-gray-900 text-base font-bold leading-6">{article.title}</Text>
                    {article.summary && (
                        <Text className="text-gray-500 text-sm mt-1 leading-5" numberOfLines={2}>{article.summary}</Text>
                    )}
                    <View className="flex-row items-center mt-3 gap-3">
                        <Text className="text-gray-400 text-xs">{article.author}</Text>
                        <Text className="text-gray-300 text-xs">•</Text>
                        <Text className="text-gray-400 text-xs">{article.readTimeMins}  मि. वाचन</Text>
                        <Text className="text-gray-300 text-xs">•</Text>
                        <Text className="text-orange-500 text-xs">🔊</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity onPress={onPress} className="bg-white rounded-2xl overflow-hidden flex-1">
            <View className="h-28 bg-gray-200">
                {
                    article.imageUrl && (
                        <Image source={{ uri: article.imageUrl }} className="w-full h-full" resizeMode="cover" />
                    )
                }
                <View className="absolute top-2 left-2 bg-blue-500 px-2 py-0.5 rounded-full">
                    <Text className="text-white text-xs">{article.category}</Text>
                </View>
            </View>
            <View className="p-3">
                <Text className="text-gray-900 text-sm font-bold leading-5" numberOfLines={2}>{article.title}</Text>
                <Text className="text-gray-400 text-sm mt-2">{article.readTimeMins} मि. वाचन</Text>
            </View>

        </TouchableOpacity>
    )
}