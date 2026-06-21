import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ArrowLeftRight } from 'lucide-react-native';

export const RailwayHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.ribbonClip} pointerEvents="none">
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>1ST CLASS</Text>
        </View>
      </View>

      <View style={styles.headerTextBlock}>
        <Text style={styles.headerSubtitle}>भारतीय रेल्वे</Text>
        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>संगीत तिकीट</Text>
          <ArrowLeftRight size={14} color="#555555" style={styles.arrowLeftRight} />
          <Text style={styles.headerRoute}>ठाणे ते मुंबई सेंट्रल</Text>
        </View>
      </View>

      <Icon name="navigation" size={26} color="#D6336C" style={styles.trainIcon} />
    </View>
  );
};

export const RailwayFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <Icon name="map-pin" size={16} color="#D6336C" />
      <Text style={styles.footerText}>कसकाय मुंबई</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#D6336C',
    overflow: 'hidden',
    position: 'relative',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  headerTextBlock: {
    flexShrink: 1,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },

  arrowLeftRight: {
    marginHorizontal: 2,
  },

  headerSubtitle: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#D6336C',
    marginBottom: 2,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B2B2B',
  },

  headerRoute: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555555',
    letterSpacing: 0.5,
  },

  trainIcon: {
    transform: [{ rotate: '90deg' }],
  },

  // Diagonal "1ST CLASS" corner ribbon
  ribbonClip: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 90,
    height: 90,
    overflow: 'hidden',
  },

  ribbon: {
    position: 'absolute',
    top: 14,
    right: -28,
    width: 110,
    backgroundColor: '#D6336C',
    transform: [{ rotate: '45deg' }],
    paddingVertical: 3,
    alignItems: 'center',
  },

  ribbonText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  footerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#D6336C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D6336C',
    letterSpacing: 1,
  },
});