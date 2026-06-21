import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PinkStripesBackground = () => {
  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: 12 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.stripe,
            {
              right: -200 + index * 80,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  stripe: {
    position: 'absolute',
    width: width * 1.5,
    height: 40,
    backgroundColor: '#FF69B4',
    transform: [{ rotate: '-25deg' }],
    top: '50%',
  },
});

export default PinkStripesBackground;