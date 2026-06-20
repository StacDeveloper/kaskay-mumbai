import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native"

import { colors, spacing, radius } from "../constants/theme"
import { CalendarDays, Eye } from "lucide-react-native"


type Article = {
    id: string
    title: string
    summary: string | null
    author: string | null
    category: string
    imageUrl: string | null
    readTimeMins: number | null
    isFeatured: boolean
    publishedAt: string
}


type Props = {
    article: Article
    onPress: () => void
}


export default function VintageCard({ article, onPress }: Props) {

    const timeAgo = (date: string) => {
        const diff = Math.floor(
            (Date.now() - new Date(date).getTime()) / 60000
        )

        if (diff < 60) return `${diff} मिनिटांपूर्वी`
        if (diff < 1440) return `${Math.floor(diff / 60)} तासांपूर्वी`
        return `${Math.floor(diff / 1440)} दिवसांपूर्वी`
    }


    return (

        <View
            style={{
                backgroundColor: "#3A1712",
                marginHorizontal: 10,
                marginBottom: 16,
                padding: 7,

                borderRadius: 30,

                borderWidth: 2,
                borderColor: "#C8A45D",

                shadowColor: "#000",
                shadowOpacity: 0.35,
                shadowRadius: 8,
                elevation: 6,
            }}
        >


            {/* INNER WINDOW */}
            <TouchableOpacity
                onPress={onPress}

                style={{
                    backgroundColor: "#D8C7A2",
                    borderRadius: 24,
                    overflow: "hidden",
                }}
            >


                {/* Window glass */}

                {/* 🚂 TRAIN WINDOW IMAGE */}
                <View
                    style={{
                        margin: 10,

                        backgroundColor: "#777777", // outer metal frame
                        padding: 8,

                        borderRadius: 32,

                        borderWidth: 2,
                        borderColor: "#555555",
                    }}
                >

                    {/* inner black rubber seal */}
                    <View
                        style={{
                            height: 170,

                            backgroundColor: "#111111",

                            padding: 5,

                            borderRadius: 26,

                            overflow: "hidden",
                        }}
                    >

                        {/* glass/image */}
                        {
                            article.imageUrl &&
                            <Image
                                source={{
                                    uri: article.imageUrl
                                }}

                                style={{
                                    width: "100%",
                                    height: "100%",

                                    borderRadius: 22,
                                }}

                                resizeMode="cover"
                            />
                        }


                        {/* category sticker */}
                        <View
                            style={{
                                position: "absolute",

                                top: 12,
                                left: 12,

                                backgroundColor: "#8A5A2B",

                                paddingHorizontal: 12,
                                paddingVertical: 5,

                                borderRadius: 20,

                            }}
                        >

                            <Text
                                style={{
                                    color: "#FFF1C8",
                                    fontSize: 11,
                                    fontWeight: "800"
                                }}
                            >
                                🚂 {article.category}
                            </Text>

                        </View>


                    </View>

                </View>



                {/* CONTENT */}

                <View
                    style={{
                        padding: 15
                    }}
                >


                    {/* railway divider */}

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 10
                        }}
                    >

                        <View
                            style={{
                                flex: 1,
                                height: 2,
                                backgroundColor: "#8A5A2B"
                            }}
                        />


                        <Text
                            style={{
                                color: "#8A5A2B",
                                fontSize: 12
                            }}
                        >
                            ✦
                        </Text>


                        <View
                            style={{
                                flex: 1,
                                height: 2,
                                backgroundColor: "#8A5A2B"
                            }}
                        />

                    </View>



                    <Text
                        style={{
                            color: "#3A1712",
                            fontSize: 18,
                            fontWeight: "900",
                            lineHeight: 26
                        }}
                    >

                        {article.title}

                    </Text>



                    {
                        article.summary &&
                        <Text
                            numberOfLines={2}

                            style={{
                                color: "#5B4636",
                                fontSize: 13,
                                lineHeight: 20,
                                marginTop: 6
                            }}
                        >

                            {article.summary}

                        </Text>
                    }



                    {/* bottom train panel */}

                    <View
                        style={{
                            marginTop: 14,

                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >


                        <View
                            style={{
                                flexDirection: "row",
                                gap: 12
                            }}
                        >


                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4
                                }}
                            >

                                <CalendarDays
                                    size={12}
                                    color="#8A5A2B"
                                />

                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: "#5B4636"
                                    }}
                                >
                                    {timeAgo(article.publishedAt)}
                                </Text>

                            </View>



                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4
                                }}
                            >

                                <Eye
                                    size={12}
                                    color="#8A5A2B"
                                />

                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: "#5B4636"
                                    }}
                                >
                                    {article.readTimeMins} मि.
                                </Text>


                            </View>


                        </View>



                        {/* ticket */}

                        <View
                            style={{
                                backgroundColor: "#8A5A2B",
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 15
                            }}
                        >

                            <Text
                                style={{
                                    color: "#FFF1C8",
                                    fontSize: 11,
                                    fontWeight: "800"
                                }}
                            >
                                वाचा →
                            </Text>

                        </View>


                    </View>


                </View>


            </TouchableOpacity>


        </View>

    )
}



function Bolt({ position }: { position: any }) {

    return (

        <View
            style={{
                position: "absolute",

                width: 12,
                height: 12,

                borderRadius: 6,

                backgroundColor: "#C8A45D",

                borderWidth: 1,
                borderColor: "#3A1712",

                ...position
            }}
        />

    )
}