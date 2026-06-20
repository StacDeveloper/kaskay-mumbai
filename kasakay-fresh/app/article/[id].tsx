import {
    View, Text, ScrollView, Image, TouchableOpacity,
    ActivityIndicator, Dimensions, Animated, NativeSyntheticEvent, NativeScrollEvent
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { colors, spacing, radius } from "../../constants/theme"
import Punches from "../../components/PerformationRow"
import { Undo2 } from "lucide-react-native"


const { width } = Dimensions.get("window")
const API_URL = "http://localhost:3000"

type Article = {
    id: string
    title: string
    subtitle: string | null
    body: string
    summary: string | null
    author: string | null
    category: string
    imageUrl: string | null
    readTimeMins: number | null
    publishedAt: string
    tags: string[] | null
    source: string | null
}

export default function ArticleDetail() {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState(true)
    const [goback, setGoback] = useState(false)


    const backButton = useRef(new Animated.Value(-80)).current


    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent
        const isNearEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 200

        if (isNearEnd && !goback) {
            setGoback(true)
            Animated.spring(backButton, {
                toValue: 30,
                useNativeDriver: false,
                friction: 6,
                tension: 80,
            }).start()
        }

        if (!isNearEnd && goback) {
            setGoback(false)
            Animated.spring(backButton, {
                toValue: -80,
                useNativeDriver: false,
                friction: 6,
            }).start()
        }
    }

    useEffect(() => {
        axios.get(`${API_URL}/api/articles/${id}`)
            .then(res => setArticle(res.data.data[0]))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.parchment }}>
            <ActivityIndicator color={colors.maroon} size="large" />
        </View>
    )

    if (!article) return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.parchment }}>
            <Text style={{ color: colors.textMid }}>बातमी सापडली नाही</Text>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>

            <Animated.View
                style={{
                    zIndex: 100,
                    position: "absolute",
                    bottom: 40,
                    left: backButton,
                    alignItems: "center",
                    justifyContent: "center",


                }}
            >
                <TouchableOpacity
                    style={{
                        zIndex: 100,
                        borderRadius: 20,
                        backgroundColor: colors.white,
                        position: "absolute", bottom: 20,
                        height: 50,
                        width: 50,
                        left: 20,
                        shadowColor: "#0000", shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5,
                        borderColor:colors.black
                    }}
                    onPress={() => router.replace("/home")}
                >

                    <Undo2 style={{ position: "absolute", top: 5, left: 5, right: 5, bottom: 5 }} color={colors.maroon} size={20} height={40} width={40} />
                </TouchableOpacity>
            </Animated.View>
            {/* ── MAROON HEADER ── */}
            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* ── HERO IMAGE ── */}
                    {article.imageUrl && (
                        <Image
                            source={{ uri: article.imageUrl }}
                            style={{ width: "100%", height: 220 }}
                            resizeMode="cover"
                        />
                    )}

                    {/* ── TICKET STYLE ARTICLE BODY ── */}
                    <View style={{ marginHorizontal: spacing.md, marginTop: spacing.md }}>

                        <Punches position="bottom" />

                        <View style={{
                            backgroundColor: colors.parchmentCard,
                            borderLeftWidth: 1.5,
                            borderRightWidth: 1.5,
                            borderColor: "#C8A45D",
                            padding: spacing.md,
                        }}>

                            {/* Category + meta row */}
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
                                <View style={{
                                    backgroundColor: colors.maroon,
                                    paddingHorizontal: 10, paddingVertical: 4,
                                    borderRadius: radius.full,
                                }}>
                                    <Text style={{ color: colors.white, fontSize: 11, fontWeight: "700" }}>
                                        🚂 {article.category}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Text style={{ color: colors.textMuted, fontSize: 11 }}>
                                        👁 {article.readTimeMins} मि.
                                    </Text>
                                    <Text style={{ color: colors.textMuted, fontSize: 11 }}>
                                        🕐 {new Date(article.publishedAt).toLocaleDateString("mr-IN")}
                                    </Text>
                                </View>
                            </View>

                            {/* Decorative divider */}
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.sm }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                                <Text style={{ color: colors.textMuted, fontSize: 10 }}>≡</Text>
                                <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                            </View>

                            {/* Title */}
                            <Text style={{
                                color: colors.textDark,
                                fontSize: 22,
                                fontWeight: "900",
                                lineHeight: 32,
                                marginBottom: spacing.xs,
                            }}>
                                {article.title}
                            </Text>

                            {/* Subtitle */}
                            {article.subtitle && (
                                <Text style={{
                                    color: colors.textMid,
                                    fontSize: 14,
                                    lineHeight: 22,
                                    marginBottom: spacing.sm,
                                    fontStyle: "italic",
                                }}>
                                    {article.subtitle}
                                </Text>
                            )}

                            {/* Author */}
                            <View style={{
                                flexDirection: "row", alignItems: "center",
                                gap: 6, marginBottom: spacing.md,
                                paddingBottom: spacing.sm,
                                borderBottomWidth: 1, borderBottomColor: colors.border,
                            }}>
                                <View style={{
                                    width: 28, height: 28, borderRadius: 14,
                                    backgroundColor: colors.maroon,
                                    alignItems: "center", justifyContent: "center",
                                }}>
                                    <Text style={{ color: colors.white, fontSize: 12 }}>✍</Text>
                                </View>
                                <Text style={{ color: colors.black, fontSize: 12, fontWeight: "800" }}>
                                    {article.author ?? "Kasakay Mumbai"}
                                </Text>
                            </View>

                            {/* Voice button */}
                            <TouchableOpacity style={{
                                flexDirection: "row", alignItems: "center", gap: 8,
                                backgroundColor: colors.maroon,
                                alignSelf: "flex-start",
                                paddingHorizontal: 16, paddingVertical: 8,
                                borderRadius: radius.full,
                                marginBottom: spacing.md,
                            }}>
                                <Text style={{ color: colors.white, fontSize: 13, fontWeight: "700" }}>
                                    🔊 हा लेख ऐका
                                </Text>
                            </TouchableOpacity>

                            {/* Summary box */}
                            {article.summary && (
                                <View style={{
                                    backgroundColor: colors.parchmentDark,
                                    borderLeftWidth: 3, borderLeftColor: colors.maroon,
                                    padding: spacing.sm,
                                    borderRadius: radius.sm,
                                    marginBottom: spacing.md,
                                }}>
                                    <Text style={{ color: colors.textMid, fontSize: 13, lineHeight: 20, fontStyle: "italic" }}>
                                        "{article.summary}"
                                    </Text>
                                </View>
                            )}

                            {/* Body paragraphs */}
                            {article.body.split("\n\n").map((para, i) => (
                                <Text key={i} style={{
                                    color: colors.textDark,
                                    fontSize: 15,
                                    lineHeight: 26,
                                    marginBottom: spacing.md,
                                    textAlign: "justify",
                                }}>
                                    {para}
                                </Text>
                            ))}

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                                <View>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.sm }}>
                                        <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                                        <Text style={{ color: colors.textMuted, fontSize: 10 }}>टॅग्स</Text>
                                        <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                                    </View>
                                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                                        {article.tags.map(tag => (
                                            <View key={tag} style={{
                                                backgroundColor: colors.parchmentDark,
                                                paddingHorizontal: 10, paddingVertical: 4,
                                                borderRadius: radius.full,
                                                borderWidth: 1, borderColor: colors.border,
                                            }}>
                                                <Text style={{ color: colors.textMid, fontSize: 11 }}>#{tag}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}

                        </View>

                        <Punches position="top" />

                    </View>

                    {/* KKM stamp at bottom */}
                    <View style={{ alignItems: "center", paddingVertical: spacing.lg }}>
                        <Text style={{ color: colors.white, fontSize: 10, letterSpacing: 2 }}>
                            ★ KASAKAY MUMBAI ★
                        </Text>
                        <Text style={{ color: colors.white, fontSize: 9, marginTop: 4 }}>
                            आपलं शहर. आपली माणसं.
                        </Text>
                    </View>

                    <View style={{ height: spacing.xl }} />
                </ScrollView>
            </ScrollView>
        </View>
    )
}