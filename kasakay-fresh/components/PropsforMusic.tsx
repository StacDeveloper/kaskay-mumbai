import { Dimensions, View } from "react-native"
import { colors } from "../constants/theme"

interface Props {
    position: "top" | "bottom" | "left" | "right"
}

export default function MusicPunches({ position }: Props) {
    const { width, height } = Dimensions.get("window")

    if (position === "top" || position === "bottom") {
        const count = Math.floor((width - 32) / 12)
        return (
            <View style={{
                flexDirection: "row",
                backgroundColor: "#C8A45D",
                height: 12,
                overflow: "hidden",
                alignItems: "center",
            }}>
                <View style={{
                    width: 12, height: 12, borderRadius: 6,
                    backgroundColor: colors.parchment,
                    marginLeft: -6,
                }} />
                {Array.from({ length: count }).map((_, i) => (
                    <View key={i} style={{
                        width: 8, height: 8, borderRadius: 4,
                        backgroundColor: "rgb(58, 23, 18)",
                        marginHorizontal: 2,
                    }} />
                ))}
                <View style={{
                    width: 12, height: 12, borderRadius: 6,
                    backgroundColor: colors.parchment,
                    marginRight: -6,
                }} />
            </View>
        )
    }

    // Left or right vertical punches — not needed for now
    return null
}