import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native"
import { colors, spacing, radius } from "../constants/theme"
import type { Article } from "../types/types"


const { width } = Dimensions.get("window")

type Props = {
    article: Article
    onPress: () => void
}

const VintageCard = ({ article, onPress }: Props) => {


    const timeAgo = (date: string) => {
        const diff = Math.floor((Date.now() - new Date(date).getTime()) / 60000)
        if (diff < 60) return `${diff} मिनिटांपूर्वी`
        if (diff < 1440) return `${Math.floor(diff / 60)} तासांपूर्वी`
        return `${Math.floor(diff / 1440)} दिवसांपूर्वी`
    }

    return (
        <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor:colors.parchmentCard,
            marginHorizontal:spacing.md,
            marginBottom:spacing.md,
            borderRadius:radius.md,
            borderWidth
        }}
        >

        </TouchableOpacity>
    )
}

export default VintageCard