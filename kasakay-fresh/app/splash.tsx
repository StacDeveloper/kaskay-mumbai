import { View, Text, Image, Animated, Easing, StyleSheet } from "react-native"
import { useEffect, useRef } from "react"
import { colors } from "../constants/theme"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"

const SplashScreen = () => {
    const router = useRouter()
    const logoScale = useRef(new Animated.Value(1)).current
    const logoX = useRef(new Animated.Value(0)).current
    const logoY = useRef(new Animated.Value(0)).current
    const logosize = useRef(new Animated.Value(160)).current
    const bgopacity = useRef(new Animated.Value(1)).current
    const taglineopacity = useRef(new Animated.Value(1)).current

    useEffect(() => {
        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(logoScale, {
                    toValue: 0.35,
                    duration: 700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false
                }),
                Animated.timing(logoX, {
                    toValue: -130,
                    duration: 700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false
                }),
                Animated.timing(logoY, {
                    toValue: -280,
                    duration: 700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false
                }),
                Animated.timing(taglineopacity, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: false
                }),
                Animated.timing(bgopacity, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: false
                })
            ]).start(() => {
                router.replace("/home")
            })
        }, 2000);
        return () => clearTimeout(timer)
    })

    return (
        <View style={{ flex: 1, backgroundColor: colors.saffron }}>
            <StatusBar style="light" />
            {/* Fading Saffron overlay */}
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: colors.saffron,
                    opacity: bgopacity
                }}
            />
            {/* Centered Content */}
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Animated.View style={{ transform: [{ scale: logoScale }, { translateX: logoX }, { translateY: logoY }], alignItems: "center" }}>
                    <Image
                        source={require("../assets/logo2.webp")}
                        style={{ width: 760, height: 600, borderRadius: 80 }}
                        resizeMode="contain"
                    />
                </Animated.View>
                {/* Tagline */}
                <Animated.Text
                style={{
                    opacity:taglineopacity,
                    color:colors.white,
                    fontSize:16,
                    marginTop:24,
                    fontWeight:"600",
                    letterSpacing:0.5
                }}
                >
                    आपलं शहर. आपली माणसं.
                </Animated.Text>
            </View>
        </View>
    )

}
export default SplashScreen