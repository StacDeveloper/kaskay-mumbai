import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native"
import { colors, spacing, radius } from "../constants/theme"

interface Props {
    isPlaying: boolean
    onToggle: () => void
    onClose: () => void
    songName?: string
    artistName?: string
    albumArt?: string
    progress?: number
}


const MusicCard = ({ isPlaying, onToggle, onClose, songName = "एका दाजीबा - लोकप्रिय", artistName = "सुरेल गाणी - मराठी चित्रपटगीत",
    albumArt,
    progress = 0.35 }: Props) => {
    return (
        <View style={{
            marginHorizontal: spacing.md,
            marginBottom: spacing.sm,
            borderRadius: radius.md,
            overflow: "hidden",
            borderWidth: 1.5,
            borderColor: "#C8A45D",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            flexDirection: "row",
        }}>

            {/* LEFT — Album art section */}
            <View style={{
                width: 88,
                backgroundColor: "#2C1A0E",
                alignItems: "center",
                justifyContent: "center",
                padding: spacing.sm,
                gap: 4,
            }}>
                {/* Star decoration */}
                <Text style={{ color: colors.saffron, fontSize: 9, letterSpacing: 2 }}>★ NOW PLAYING ★</Text>

                {/* Album art */}
                <View style={{
                    width: 56, height: 56,
                    borderRadius: radius.sm,
                    backgroundColor: colors.saffron,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: "#C8A45D",
                    overflow: "hidden",
                }}>
                    {albumArt ? (
                        <Image source={{ uri: albumArt }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                    ) : (
                        <Text style={{ fontSize: 24 }}>🎵</Text>
                    )}
                </View>

                <Text style={{
                    color: colors.saffronLight,
                    fontSize: 7,
                    fontWeight: "700",
                    letterSpacing: 1,
                    textAlign: "center",
                }}>सुरेल गाणी</Text>
                <Text style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 6,
                    textAlign: "center",
                }}>मराठी चित्रपटगीत</Text>
            </View>

            {/* CENTER — Song info + controls */}
            <View style={{
                flex: 1,
                backgroundColor: "#F5E6C8",
                padding: spacing.sm,
                justifyContent: "space-between",
            }}>
                {/* Song name */}
                <View>
                    <Text style={{
                        color: colors.textDark,
                        fontSize: 13,
                        fontWeight: "800",
                        lineHeight: 18,
                    }} numberOfLines={1}>
                        {songName}
                    </Text>
                    <Text style={{
                        color: colors.textMid,
                        fontSize: 10,
                        marginTop: 2,
                    }} numberOfLines={1}>
                        {artistName}
                    </Text>
                </View>

                {/* Progress bar */}
                <View style={{
                    height: 3,
                    backgroundColor: colors.border,
                    borderRadius: 2,
                    marginVertical: 6,
                }}>
                    <View style={{
                        width: `${progress * 100}%`,
                        height: "100%",
                        backgroundColor: colors.saffron,
                        borderRadius: 2,
                    }} />
                </View>

                {/* Time */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                    <Text style={{ color: colors.textMuted, fontSize: 9 }}>1:36</Text>
                    <Text style={{ color: colors.textMuted, fontSize: 9 }}>4:42</Text>
                </View>

                {/* Controls */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 16 }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 16, color: colors.textMid }}>⏮</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onToggle}
                        style={{
                            width: 36, height: 36,
                            borderRadius: 18,
                            backgroundColor: colors.saffron,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: colors.saffron,
                            shadowOpacity: 0.4,
                            shadowRadius: 4,
                            elevation: 3,
                        }}>
                        <Text style={{ fontSize: 16, color: colors.white }}>
                            {isPlaying ? "⏸" : "▶"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={{ fontSize: 16, color: colors.textMid }}>⏭</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={{ fontSize: 14, color: colors.textMuted }}>🔀</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* RIGHT — KKM ticket stamp */}
            <View style={{
                width: 52,
                backgroundColor: "#2C1A0E",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: spacing.sm,
                borderLeftWidth: 1,
                borderLeftColor: "#C8A45D",
                borderStyle: "dashed",
            }}>
                {/* Close button */}
                <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
                    <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>✕</Text>
                </TouchableOpacity>

                {/* KKM stamp */}
                <View style={{ alignItems: "center", gap: 2 }}>
                    <Text style={{ color: colors.saffron, fontSize: 11, fontWeight: "900" }}>KKM</Text>
                    <View style={{
                        backgroundColor: "#9B1C1C",
                        paddingHorizontal: 4, paddingVertical: 2,
                        borderRadius: 3,
                    }}>
                        <Text style={{ color: colors.white, fontSize: 7, fontWeight: "700" }}>LIVE</Text>
                    </View>
                    <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 6, textAlign: "center" }}>ESTD.</Text>
                    <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 6 }}>🚂 2023</Text>
                </View>

                {/* Bottom text */}
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 5, textAlign: "center", letterSpacing: 0.5 }}>
                        कसा काय{"\n"}मुंबई
                    </Text>
                </View>
            </View>

        </View>
    )
}

export default MusicCard