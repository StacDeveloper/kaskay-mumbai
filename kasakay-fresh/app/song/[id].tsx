import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RailwayFooter, RailwayHeader } from "../../components/RailwayHeaderFooter"
import PinkStripesBackground from '../../components/PinkStrips';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;
const HOLE_SIZE = 14;
const HOLE_RADIUS = HOLE_SIZE / 2;

// Number of punch holes along each edge
const HORIZONTAL_HOLES = 10;
const VERTICAL_HOLES = 6;

const Punches = () => {
  const topBottomHoles = Array.from({ length: HORIZONTAL_HOLES });
  const leftRightHoles = Array.from({ length: VERTICAL_HOLES });

  return (
    <>
      {/* Top edge */}
      <View style={[styles.punchRow, { top: -HOLE_RADIUS }]} pointerEvents="none">
        {topBottomHoles.map((_, i) => (
          <View key={`t-${i}`} style={styles.hole} />
        ))}
      </View>

      {/* Bottom edge */}
      <View style={[styles.punchRow, { bottom: -HOLE_RADIUS }]} pointerEvents="none">
        {topBottomHoles.map((_, i) => (
          <View key={`b-${i}`} style={styles.hole} />
        ))}
      </View>

      {/* Left edge */}
      <View style={[styles.punchCol, { left: -HOLE_RADIUS }]} pointerEvents="none">
        {leftRightHoles.map((_, i) => (
          <View key={`l-${i}`} style={styles.hole} />
        ))}
      </View>

      {/* Right edge */}
      <View style={[styles.punchCol, { right: -HOLE_RADIUS }]} pointerEvents="none">
        {leftRightHoles.map((_, i) => (
          <View key={`r-${i}`} style={styles.hole} />
        ))}
      </View>
    </>
  );
};

const PinkStripeBand = ({
  count = 30,
  stripeWidth = 14,
  gap = 10,
  height = 110,
  skew = '20deg',
  direction = 'right',
  color = '#D4537E',

}) => {
  const stripes = Array.from({ length: count }, (_, i) => i);

  return (
    <View style={[styles.band, { height }]}>
      {stripes.map((i) => (
        <View
          key={i}
          style={{
            width: stripeWidth,
            height: 100, // overshoot so skew doesn't clip corners
            backgroundColor: color,
            marginRight: gap,
            transform: [
              { skewX: direction === 'right' ? skew : `-${skew}` },
            ],
          }}
        />
      ))}
    </View>
  );
};

const RunningTrain = ({ duration = 6000, position = "right" }) => {
  const TRAIN_WIDTH = 220;
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const start = position === "right" ? -TRAIN_WIDTH : SCREEN_WIDTH;
  const end = position === "right" ? SCREEN_WIDTH : -TRAIN_WIDTH;
  const translateX = useRef(new Animated.Value(start)).current;
  useEffect(() => {
    const animate = () => {
      translateX.setValue(start);
      Animated.timing(translateX, {
        toValue: end,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate()); // loop
    };
    animate();
  }, []);

  return (
    <View style={styles.track}>
      <View style={styles.line} />
      <Animated.View
        style={[styles.train, { transform: [{ translateX }] }]}
      >
        {/* engine */}
        <View style={styles.engine} />
        {/* coaches — mapped, same pattern as your stripes */}
        {[0, 1].map((i) => (
          <View key={i} style={styles.coach} />
        ))}
      </Animated.View>
    </View>
  );
};

export default function MusicScreen() {
  ;
  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          position: "relative",
          top: -70,
          right: 2
        }}
      >
        <PinkStripeBand
          direction='left'
        />
      </View>
      <RunningTrain position='left' duration={6000} />
      <RailwayHeader />
      {/* ARTIST IMAGE TICKET CARD */}
      <View style={styles.ticketCard}>
        <PinkStripesBackground />
        <Punches />
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=800',
            }}
            style={styles.artistImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.ticketLabel}>ADMIT ONE — ARTIST PASS</Text>
      </View>

      {/* PLAYER TICKET CARD */}
      <View style={[styles.ticketCard, styles.playerCard]}>
        <Punches />

        <View style={styles.playerRow}>
          {/* LEFT 75% — controls + timeline */}
          <View style={styles.controlsSection}>
            <View style={styles.timelineRow}>
              <Text style={styles.timeText}>1:24</Text>
              <View style={styles.timelineTrack}>
                <View style={styles.timelineProgress} />
              </View>
              <Text style={styles.timeText}>3:40</Text>
            </View>

            <View style={styles.controlsRow}>
              <TouchableOpacity activeOpacity={0.7}>
                <Icon name="skip-back" size={22} color="#3E2C23" />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.playButton}>
                <Icon name="play" size={20} color="#F3E9D2" />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7}>
                <Icon name="skip-forward" size={22} color="#3E2C23" />
              </TouchableOpacity>
            </View>
          </View>

          {/* RIGHT 25% — song info, brown background */}
          <View style={styles.infoSection}>
            <Text style={styles.songTitle} numberOfLines={1}>
              Kesariya
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              Arijit Singh
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          position: "relative",
          top: 100,
        }}>
        <RunningTrain position='right' duration={6000} />
        <RailwayFooter />
        <PinkStripeBand
          direction='right'
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(246,245,246,1)',
    justifyContent: 'center',
    position: "relative"
  },

  ticketCard: {
    width: CARD_WIDTH,
    backgroundColor: 'rgba(199,93,236,1)',
    borderRadius: 14,
    marginBottom: 18,
    marginHorizontal: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    // shadow - iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    // shadow - Android
    elevation: 12,
    position: 'relative',
    overflow: 'visible',
  },

  playerCard: {
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  imageWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#3E2C23',
  },

  artistImage: {
    width: '100%',
    height: '100%',
  },

  ticketLabel: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    letterSpacing: 2,
    color: '#6B4A2E',
    fontWeight: '600',
  },

  playerRow: {
    flexDirection: 'row',
    width: '100%',
  },

  controlsSection: {
    flex: 75,
    justifyContent: 'center',
    paddingRight: 10,
  },

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  timeText: {
    fontSize: 11,
    color: '#6B4A2E',
    width: 32,
  },

  timelineTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#CDB98F',
    borderRadius: 2,
    marginHorizontal: 6,
    overflow: 'hidden',
  },

  timelineProgress: {
    width: '40%',
    height: 4,
    backgroundColor: '#3E2C23',
    borderRadius: 2,
  },

  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  playButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#3E2C23',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoSection: {
    flex: 25,
    backgroundColor: '#6B4A2E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  songTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F3E9D2',
    marginBottom: 4,
    textAlign: 'center',
  },

  artistName: {
    fontSize: 9,
    color: '#DCC9A3',
    textAlign: 'center',
  },

  // Punch hole styles
  punchRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 10,
  },

  punchCol: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    zIndex: 10,
  },

  hole: {
    width: HOLE_SIZE,
    height: HOLE_SIZE,
    borderRadius: HOLE_RADIUS,
    backgroundColor: 'white',
  },
  band: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
  },
  track: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  line: {
    height: 2,
    backgroundColor: '#B4B2A9',
    width: '100%',
    position: 'absolute',
    bottom: 8,
  },
  train: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
  },
  engine: {
    width: 50,
    height: 26,
    backgroundColor: '#D4537E',
    borderRadius: 4,
    marginRight: 4,
  },
  coach: {
    width: 60,
    height: 20,
    backgroundColor: '#ED93B1',
    borderRadius: 3,
    marginRight: 4,
  },
});
