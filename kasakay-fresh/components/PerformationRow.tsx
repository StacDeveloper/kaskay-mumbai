import { View } from "react-native"
import { colors } from "../constants/theme"

type PunchesProps = {
  position: "top" | "bottom" | "left" | "right"
}

function Punches({ position }: PunchesProps) {
  const isHorizontal =
    position === "top" || position === "bottom"

  return (
    <View
      style={{
        position: "absolute",

        ...(position === "top" && {
          top: -5,
          left: 12,
          right: 12,
          flexDirection: "row",
        }),

        ...(position === "bottom" && {
          bottom: -5,
          left: 12,
          right: 12,
          flexDirection: "row",
        }),

        ...(position === "left" && {
          left: -5,
          top: 12,
          bottom: 12,
        }),

        ...(position === "right" && {
          right: -5,
          top: 12,
          bottom: 12,
        }),

        justifyContent: "space-between",
        zIndex: 10,
      }}
    >
      {Array.from({
        length: isHorizontal ? 12 : 8,
      }).map((_, i) => (
        <View
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.parchment,
          }}
        />
      ))}
    </View>
  )
}
export default Punches