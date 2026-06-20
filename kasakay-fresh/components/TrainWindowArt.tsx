// components/TrainWindowArtwork.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  Easing,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  source: ImageSourcePropType;
  isPlaying?: boolean;
  size?: number;
};

const PALETTE = {
  metal: '#7A7A7A',
  metalHi: '#A8A8A8',
  metalLo: '#4F4F4F',
  rubber: '#111111',
  cream: '#F1E5C8',
  maroon: '#6B1F1F',
  bolt: '#2A2A2A',
  boltHi: '#C9C9C9',
};

export default function TrainWindowArtwork({
  source,
  isPlaying = false,
  size = 280,
}: Props) {
  const spin = useRef(new Animated.Value(0)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isPlaying) {
      loopRef.current = Animated.loop(
        Animated.timing(spin, {
          toValue: 1,
          duration: 12000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      loopRef.current.start();
    } else {
      loopRef.current?.stop();
    }
    return () => loopRef.current?.stop();
  }, [isPlaying, spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Frame proportions
  const outer = size;
  const outerRadius = size * 0.22;
  const innerRadius = size * 0.18;
  const rubberInset = size * 0.06;
  const imageInset = size * 0.11;
  const imageRadius = size * 0.14;

  const Rivet = ({ top, left, right, bottom }: any) => (
    <View style={[styles.rivetWrap, { top, left, right, bottom }]}>
      <View style={styles.rivetOuter}>
        <View style={styles.rivetInner} />
        <View style={styles.rivetShine} />
      </View>
    </View>
  );

  return (
    <View style={styles.stage}>
      {/* Outer metallic frame */}
      <View
        style={[
          styles.metalFrame,
          {
            width: outer,
            height: outer,
            borderRadius: outerRadius,
          },
        ]}
      >
        {/* subtle brushed-metal top highlight */}
        <View
          style={[
            styles.metalHighlight,
            { borderTopLeftRadius: outerRadius, borderTopRightRadius: outerRadius },
          ]}
        />

        {/* Black rubber gasket */}
        <View
          style={[
            styles.rubberFrame,
            {
              top: rubberInset,
              left: rubberInset,
              right: rubberInset,
              bottom: rubberInset,
              borderRadius: innerRadius,
            },
          ]}
        >
          {/* Cream window mat */}
          <View
            style={[
              styles.creamMat,
              {
                top: imageInset - rubberInset,
                left: imageInset - rubberInset,
                right: imageInset - rubberInset,
                bottom: imageInset - rubberInset,
                borderRadius: imageRadius + 6,
              },
            ]}
          >
            {/* Maroon hairline */}
            <View
              style={[
                styles.maroonHairline,
                { borderRadius: imageRadius + 2 },
              ]}
            >
              {/* The rotating artwork */}
              <Animated.View
                style={{
                  flex: 1,
                  borderRadius: imageRadius,
                  overflow: 'hidden',
                  transform: [{ rotate }],
                }}
              >
                <Image
                  source={source}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Four corner rivets on the metallic frame */}
        <Rivet top={size * 0.05} left={size * 0.05} />
        <Rivet top={size * 0.05} right={size * 0.05} />
        <Rivet bottom={size * 0.05} left={size * 0.05} />
        <Rivet bottom={size * 0.05} right={size * 0.05} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  metalFrame: {
    backgroundColor: PALETTE.metal,
    borderWidth: 2,
    borderColor: PALETTE.metalLo,
    // soft drop shadow for weight
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    overflow: 'hidden',
  },
  metalHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: PALETTE.metalHi,
    opacity: 0.18,
  },
  rubberFrame: {
    position: 'absolute',
    backgroundColor: PALETTE.rubber,
    borderWidth: 1,
    borderColor: '#000',
    // inner shadow feel via two stacked borders
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  creamMat: {
    position: 'absolute',
    backgroundColor: PALETTE.cream,
    padding: 4,
  },
  maroonHairline: {
    flex: 1,
    borderWidth: 2,
    borderColor: PALETTE.maroon,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  rivetWrap: {
    position: 'absolute',
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rivetOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: PALETTE.metalLo,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1f1f1f',
  },
  rivetInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: PALETTE.bolt,
  },
  rivetShine: {
    position: 'absolute',
    top: 3,
    left: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: PALETTE.boltHi,
    opacity: 0.8,
  },
});
