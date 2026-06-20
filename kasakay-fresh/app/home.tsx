import {
    View, Text, ScrollView, TouchableOpacity,
    TextInput, ActivityIndicator, RefreshControl,
    Dimensions, Image, StatusBar
} from "react-native"
import { useState, useEffect } from "react"
import { useRouter } from "expo-router"
import axios from "axios"
import { colors, spacing, radius } from "../constants/theme"
import VintageCard from "../components/VintageCard"
import { Mic, CircleX } from "lucide-react-native"
import MusicCard from "../components/MusicCard"


const { width } = Dimensions.get("window")
const API_URL = "http://localhost:3000"
const TABS = ["FEED", "NEWS", "UPDATES"]

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

export default function HomeScreen() {
    const router = useRouter()
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState("FEED")
    const [search, setSearch] = useState("")
    const [musicPlaying, setMusicPlaying] = useState(false)
    const [showMusic, setShowMusic] = useState(true)

    const fetchArticles = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/articles/getAllArticles`)
            const newArr = [...res.data.data, ...res.data.data]
            setArticles(newArr ?? [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => { fetchArticles() }, [])

    return (

        <View
            style={{
                flex: 1,
                backgroundColor: colors.parchment
            }}
        >
            {/* Train outer frame */}
            <View
                style={{
                    backgroundColor: "#3A1712",
                    borderRadius: 28,
                    padding: 8,
                    borderWidth: 2,
                    borderColor: "#C8A45D",
                    shadowColor: "#000",
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    elevation: 8,
                }}
            >

                {/* Window glass */}
                <View
                    style={{
                        backgroundColor: "rgb(87,11,0,1)",
                        borderRadius: 22,
                        padding: 10,
                    }}
                >

                    {/* Top train bar */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 10,
                        }}
                    >

                        {/* Logo like train emblem */}
                        <View
                            style={{
                                width: 52,
                                height: 52,
                                borderRadius: 26,
                                backgroundColor: "#EFE1C1",
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 2,
                                borderColor: "#8A5A2B",
                            }}
                        >
                            <Image
                                source={require("../assets/logo2.webp")}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20
                                }}
                            />
                        </View>


                        {/* Window search */}
                        <View
                            style={{
                                flex: 1,
                                height: 44,
                                backgroundColor: "#F5E6C8",
                                borderRadius: 22,
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 14,
                                borderWidth: 1,
                                borderColor: "#8A5A2B",
                            }}
                        >

                            <Text style={{ fontSize: 15 }}>
                                🔍
                            </Text>


                            <TextInput
                                value={search}
                                onChangeText={setSearch}
                                placeholder="शोधा मुंबई, लोक आणि गाणी..."
                                placeholderTextColor="#5B4636"
                                style={{
                                    flex: 1,
                                    color: "#000",
                                    fontSize: 13,
                                    marginLeft: 8
                                }}
                            />


                            <Mic
                                size={18}
                                color="#5B4636"
                            />

                        </View>

                    </View>


                    {/* Train window divider */}
                    <View
                        style={{
                            height: 2,
                            backgroundColor: "#8A5A2B",
                            marginBottom: 6
                        }}
                    />


                    {/* Tabs like railway indicators */}
                    <View style={{ flexDirection: "row" }}>

                        {TABS.map(tab => (

                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    paddingVertical: 9,
                                    backgroundColor:
                                        activeTab === tab
                                            ? "#8A5A2B"
                                            : "transparent",

                                    borderRadius: 18,
                                    marginHorizontal: 3,
                                }}
                            >

                                <Text
                                    style={{
                                        color:
                                            activeTab === tab
                                                ? "#FFF1C8"
                                                : "#5B4636",

                                        fontWeight: "800",
                                        fontSize: 12,
                                        letterSpacing: 1,
                                    }}
                                >
                                    {tab}
                                </Text>


                            </TouchableOpacity>

                        ))}

                    </View>


                </View>

            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    backgroundColor: colors.parchment,
                    gap: 10
                }}
            >
                <CircleX size={20} color={"#8A5A2B"} />

                {/* left strips */}
                <View
                    style={{
                        flexDirection: "row",
                        gap: 3
                    }}
                >
                    <View style={{ width: 18, height: 3, backgroundColor: "#8A5A2B" }} />
                    <View style={{ width: 18, height: 3, backgroundColor: "#8A5A2B" }} />
                    <View style={{ width: 18, height: 3, backgroundColor: "#8A5A2B" }} />
                </View>



                <Text
                    style={{
                        color: "#9B1C1C",
                        fontSize: 16,
                        fontWeight: "900",
                        letterSpacing: 2
                    }}
                >
                    मध्य रेल्वे
                </Text>



                {/* right strips */}
                <View
                    style={{
                        flexDirection: "row",
                        gap: 3
                    }}
                >
                    <View style={{ width: 18, height: 3, backgroundColor: "#8A5A2B" }} />
                    <View style={{ width: 18, height: 3, backgroundColor: "#8A5A2B" }} />
                    <View style={{ width: 18, height: 3, backgroundColor: "#8A5A2B" }} />
                </View>
                <CircleX size={20} color={"#8A5A2B"} />

            </View>


            <View
                style={{
                    flex: 1,
                }}
            >

                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.maroon}
                />


                {/* 🚂 TRAIN WINDOW HEADER */}




                {/* 📰 ARTICLE FEED */}
                {
                    loading ? (

                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <ActivityIndicator
                                color={colors.maroon}
                            />
                        </View>

                    ) : (

                        <ScrollView
                            style={{
                                flex: 1
                            }}
                            showsVerticalScrollIndicator={false}

                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => {
                                        setRefreshing(true)
                                        fetchArticles()
                                    }}
                                />
                            }
                        >

                            <View style={{ height: 4 }} />


                            {
                                articles.map(article => (

                                    <VintageCard
                                        key={article.id}
                                        article={article}

                                        onPress={() =>
                                            router.push(
                                                `/article/${article.id}`
                                            )
                                        }
                                    />

                                ))
                            }


                            <View style={{ height: spacing.xl }} />

                        </ScrollView>

                    )
                }
                {showMusic && (
                    <MusicCard
                        isPlaying={musicPlaying}
                        onToggle={() => setMusicPlaying(!musicPlaying)}
                        onClose={() => setShowMusic(false)}
                    />
                )}
            </View>
        </View>
    )
}