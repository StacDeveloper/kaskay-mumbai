import {
    View, Text, Image, TouchableOpacity,
    Dimensions, StatusBar, Animated, Easing
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { colors, spacing, radius } from "../../constants/theme"
import { Undo2 } from "lucide-react-native"
import Punches from "../../components/PerformationRow"
import MusicPunches from "../../components/PropsforMusic"
import TrainWindowArtwork from "../../components/TrainWindowArt"
const { width, height } = Dimensions.get("window")

export default function SongScreen() {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0.35)

    // Vinyl rotation animation
    const spinAnim = useRef(new Animated.Value(0)).current
    const spinRef = useRef<Animated.CompositeAnimation | null>(null)

    const startSpin = () => {
        spinRef.current = Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        )
        spinRef.current.start()
    }

    const stopSpin = () => {
        spinRef.current?.stop()
    }

    useEffect(() => {
        if (isPlaying) startSpin()
        else stopSpin()
    }, [isPlaying])

    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    })

    return (
        <View style={{ flex: 1, backgroundColor: "rgb(58, 23, 18)" }}>
            <StatusBar barStyle="light-content" backgroundColor={"rgb(58, 23, 18)"} />

            {/* ── MAROON HEADER ── */}
            <View style={{
                backgroundColor: "rgb(58, 23, 18)",
                paddingTop: 52,
                paddingBottom: 14,
                paddingHorizontal: spacing.md,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        width: 36, height: 36, borderRadius: 18,
                        backgroundColor: "rgba(255,255,255,0.15)",
                        alignItems: "center", justifyContent: "center",
                    }}>
                    <Undo2 color={colors.white} size={18} />
                </TouchableOpacity>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "black", fontSize: 10, letterSpacing: 2, fontWeight: "700" }}>
                        ★ NOW PLAYING ★
                    </Text>
                    <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 2 }}>
                        सुरेल मराठी गाणी
                    </Text>
                </View>

                <TouchableOpacity style={{
                    width: 36, height: 36, borderRadius: 18,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    alignItems: "center", justifyContent: "center",
                }}>
                    <Text style={{ fontSize: 16 }}>🔀</Text>
                </TouchableOpacity>
            </View>

            {/* ── ARTIST IMAGE — Vinyl style ── */}
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: spacing.xl,
                backgroundColor: "rgb(58, 23, 18)",
            }}>

                {/* Outer glow ring */}
                <View
                    style={{
                        backgroundColor: colors.parchment,
                        padding: 5,
                        borderRadius: 5,

                    }}>
                    <View style={{
                        width: 311,
                        height: 311,
                        borderRadius: (width * 0.68) / 2,
                        backgroundColor: "#5C1515",
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: "#00000",
                        shadowOpacity: 0.5,
                        shadowRadius: 20,
                        elevation: 12,
                    }}>
                        <Punches position={"bottom"}/>
                        <Punches position={"left"}/>
                        <Punches position={"right"}/>
                        <Punches position={"top"}/>
                        {/* Spinning vinyl/artist image */}
                        <Animated.View style={{
                            width: 320,
                            height: 315,
                            transform: [{ rotate: spin }],
                            borderWidth: 5,
                            borderColor: "rgb(250,240,220)",
                            overflow: "hidden",

                            backgroundColor: colors.parchment,
                        }}>
                            <Image
                                source={{ uri: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg" }}
                                style={{ width: "100%", height: "100%" }}
                                resizeMode="cover"
                            />

                            {/* Center vinyl hole */}
                        </Animated.View>
                    </View>
                </View>
            </View>

            {/* ── TICKET STYLE CONTROLS ── */}
            <View style={{ marginHorizontal: spacing.md, marginTop: -spacing.md, right: 10, left: 1, width: 400 }}>


                <View style={{
                    backgroundColor: colors.parchmentCard,
                    borderColor: "black",
                    borderRadius: 30,
                    borderWidth: 3,
                    padding: spacing.md,
                    marginTop: 30
                }}>

                    {/* Song title + artist */}
                    <View style={{ alignItems: "center", marginBottom: spacing.md, marginTop: 10 }}>
                        {/* Decorative line */}
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.sm, width: 350 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                            <Text style={{ color: colors.textMuted, fontSize: 10 }}>🎵</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
                        </View>

                        <Text style={{
                            color: colors.textDark,
                            fontSize: 22,
                            fontWeight: "900",
                            textAlign: "center",
                            lineHeight: 30,
                        }}>
                            एका दाजीबा
                        </Text>
                        <Text style={{
                            color: colors.textMid,
                            fontSize: 13,
                            marginTop: 4,
                            textAlign: "center",
                        }}>
                            जगदीश खेबुडकर • मराठी चित्रपटगीत
                        </Text>

                        {/* KKM stamp row */}
                        <View style={{
                            flexDirection: "row", alignItems: "center",
                            gap: 6, marginTop: spacing.sm,
                        }}>
                            <View style={{
                                backgroundColor: colors.maroon,
                                paddingHorizontal: 8, paddingVertical: 3,
                                borderRadius: radius.full,
                            }}>
                                <Text style={{ color: colors.white, fontSize: 9, fontWeight: "700", letterSpacing: 1 }}>
                                    KKM LIVE
                                </Text>
                            </View>
                            <Text style={{ color: colors.textMuted, fontSize: 9 }}>ESTD. 🚂 2023</Text>
                        </View>
                    </View>

                    {/* Progress bar */}
                    <View style={{ marginBottom: spacing.xs }}>
                        <View style={{
                            height: 4,
                            left: 50,
                            width: 300,
                            backgroundColor: colors.border,
                            borderRadius: 2,
                        }}>
                            <View style={{
                                width: `${progress * 100}%`,
                                height: "100%",
                                backgroundColor: colors.saffron,
                                borderRadius: 2,
                            }} />
                            {/* Scrubber dot */}
                            <View style={{
                                position: "absolute",
                                width: 12, height: 12,
                                borderRadius: 6,
                                backgroundColor: colors.saffron,
                                top: -4,
                                left: `${progress * 100}%`,
                                marginLeft: -6,
                                borderWidth: 2,
                                borderColor: colors.white,
                                elevation: 3,
                            }} />
                        </View>

                        {/* Time */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                            <Text style={{ color: colors.textMuted, fontSize: 10, right: -40, }}>1:36</Text>
                            <Text style={{ color: colors.textMuted, fontSize: 10, left: -40 }}>4:42</Text>
                        </View>
                    </View>

                    {/* Controls */}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 28,
                        marginTop: 5,
                    }}>
                        {/* Previous */}
                        <TouchableOpacity style={{
                            width: 44, height: 44, borderRadius: 22,
                            backgroundColor: colors.parchmentDark,
                            alignItems: "center", justifyContent: "center",
                            borderWidth: 1, borderColor: colors.border,
                        }}>
                            <Text style={{ fontSize: 20, color: colors.textMid }}>⏮</Text>
                        </TouchableOpacity>

                        {/* Play/Pause — big button */}
                        <TouchableOpacity
                            onPress={() => setIsPlaying(!isPlaying)}
                            style={{
                                width: 50, height: 50, borderRadius: 34,
                                backgroundColor: colors.maroon,
                                alignItems: "center", justifyContent: "center",
                                borderWidth: 3, borderColor: "#C8A45D",
                                shadowColor: colors.maroon,
                                shadowOpacity: 0.5,
                                shadowRadius: 10,
                                elevation: 8,
                            }}>
                            <Text style={{ fontSize: 28, color: colors.white }}>
                                {isPlaying ? "⏸" : "▶"}
                            </Text>
                        </TouchableOpacity>

                        {/* Next */}
                        <TouchableOpacity style={{
                            width: 44, height: 44, borderRadius: 22,
                            backgroundColor: colors.parchmentDark,
                            alignItems: "center", justifyContent: "center",
                            borderWidth: 1, borderColor: colors.border,
                        }}>
                            <Text style={{ fontSize: 20, color: colors.textMid }}>⏭</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Extra controls row */}
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: spacing.md,
                        paddingTop: spacing.sm,
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                        width: 400
                    }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 18, color: colors.textMuted, left: 60 }}>❤️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 18, color: colors.textMuted, left: 20 }}>🔁</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 18, color: colors.textMuted, right: 20 }}>📤</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 18, color: colors.textMuted, right: 60 }}>⬇️</Text>
                        </TouchableOpacity>
                    </View>

                </View>



                {/* KKM bottom stamp */}
                <View style={{ alignItems: "center", paddingTop: spacing.md }}>
                    <Text style={{ color: colors.textMuted, fontSize: 9, letterSpacing: 2 }}>
                        ★ KASAKAY MUMBAI ★
                    </Text>
                    <Text style={{ color: colors.textMuted, fontSize: 8, marginTop: 3 }}>
                        आपलं शहर. आपली माणसं.
                    </Text>
                </View>

            </View>
        </View>
    )
    // return (
    //     <TrainWindowArtwork
    //         source={{ uri: "" }}
    //         isPlaying={isPlaying}
    //         size={300}
    //     />
    // )
}