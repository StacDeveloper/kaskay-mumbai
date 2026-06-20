import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native"

import { Mic } from "lucide-react-native"
import { colors } from "../constants/theme"

type Props = {
  search: string
  setSearch: (v: string) => void
  activeTab: string
  setActiveTab: (v: string) => void
}

const TABS = ["FEED", "NEWS", "UPDATES"]

export default function TrainHeader({
  search,
  setSearch,
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <View
      style={{
        backgroundColor: colors.maroon,
        paddingTop: 50,
        paddingHorizontal: 12,
        paddingBottom: 10,
      }}
    >

      {/* Outer train frame */}
      <View
        style={{
          backgroundColor: "#4A4A4A",
          borderRadius: 28,
          padding: 5,
          borderWidth: 2,
          borderColor: "#7A7A7A",
        }}
      >

        {/* Inner frame */}
        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 24,
            padding: 10,
          }}
        >

          {/* Destination Board */}
          <View
            style={{
              backgroundColor: "#D8C7A2",
              borderRadius: 18,
              padding: 10,
            }}
          >

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/logo2.webp")}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                }}
              />

              <View
                style={{
                  marginLeft: 10,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: "#9B1C1C",
                    fontSize: 18,
                    fontWeight: "900",
                  }}
                >
                  कसा काय मुंबई
                </Text>

                <Text
                  style={{
                    color: "#5B4636",
                    fontSize: 11,
                    letterSpacing: 2,
                  }}
                >
                  मध्य रेल्वे विशेष
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 20,
                }}
              >
                🚂
              </Text>
            </View>

            {/* Divider */}
            <View
              style={{
                height: 2,
                backgroundColor: "#8A5A2B",
                marginVertical: 10,
              }}
            />

            {/* Search */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFF5DD",
                borderRadius: 20,
                paddingHorizontal: 12,
                height: 42,
                borderWidth: 1,
                borderColor: "#8A5A2B",
              }}
            >
              <Text>🔍</Text>

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="शोधा मुंबई..."
                placeholderTextColor="#5B4636"
                underlineColorAndroid="transparent"
                style={{
                  flex: 1,
                  color: "#000",
                  marginLeft: 8,
                }}
              />

              <Mic
                size={18}
                color="#5B4636"
              />
            </View>

            {/* Tabs */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              {TABS.map(tab => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    marginHorizontal: 2,
                    paddingVertical: 8,
                    borderRadius: 15,
                    backgroundColor:
                      activeTab === tab
                        ? "#8A5A2B"
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "800",
                      color:
                        activeTab === tab
                          ? "#FFF5DD"
                          : "#5B4636",
                    }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

          </View>
        </View>
      </View>
    </View>
  )
}