import { FontAwesome6 } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useMemo } from 'react';

export default function IconGallery() {
  const icons = useMemo(() => shuffleArray([
    { name: 'angry', label: 'Rage Demon' },
    { name: 'grin-stars', label: 'Starry Smile' },
    { name: 'grin-tongue-squint', label: 'Cheeky Grin' },
    { name: 'flushed', label: 'Flustered Face' },
    { name: 'kiss-beam', label: 'Beaming Kiss' },
    { name: 'dizzy', label: 'Dizzy Spell' },
    { name: 'kiss', label: 'Sweet Kiss' },
    { name: 'grin-wink', label: 'Winking Charm' },
    { name: 'grin-alt', label: 'Classic Smirk' },
    { name: 'frown-open', label: 'Open Disdain' },
  ]), []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🌀 Emotion Icons Deck</Text>

      <View style={styles.iconGrid}>
        {icons.map((icon, idx) => (
          <View key={idx} style={styles.iconCard}>
            <FontAwesome6 name={icon.name} size={42} color="#fff" />
            <Text style={styles.iconText}>{icon.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Helper: Fisher-Yates Shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const CARD_WIDTH = (Dimensions.get('window').width - 64) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1b2a',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e0e1dd',
    textAlign: 'center',
    marginVertical: 24,
    letterSpacing: 1,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconCard: {
    width: CARD_WIDTH,
    backgroundColor: '#1b263b',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  iconText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#a9bcd0',
    textAlign: 'center',
  },
});
