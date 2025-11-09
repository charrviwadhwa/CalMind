// app/about.jsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

// --- Configuration ---
const SELECTION_COLOR = '#0047AB'; // Dark Blue for selection border

// Path: ../assets/images/
const icons = {
  'Breathing exercises': require('../assets/images/icons8-cloud-16.png'),
  'Journaling': require('../assets/images/icons8-pencil-100.png'),
  'Meditation': require('../assets/images/icons8-meditation-64.png'),
  'Mood tracking': require('../assets/images/icons8-happy-48.png'),
  'Self-love': require('../assets/images/icons8-heart-100.png'),
  'Gratitude practices': require('../assets/images/icons8-gratitude-64.png'),
  'Physical activities': require('../assets/images/icons8-yoga-50.png'),
  'Better sleep': require('../assets/images/icons8-sleep-100.png'),
  'No preference': require('../assets/images/icons8-shield-100.png'),
};

// Function to darken a hex color
const darkenColor = (hex, percent) => {
  let num = parseInt(hex.slice(1), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = (num >> 8 & 0x00FF) - amt,
      B = (num & 0x0000FF) - amt;
  return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
};

const options = [
  { id: 'breathing', label: 'Breathing exercises', color: '#EAF6F3' },
  { id: 'journaling', label: 'Journaling', color: '#FFF8EB' },
  { id: 'meditation', label: 'Meditation', color: '#E3F6EC' },
  { id: 'mood', label: 'Mood tracking', color: '#F1EFF8' },
  { id: 'selflove', label: 'Self-love', color: '#F8E9E9' },
  { id: 'gratitude', label: 'Gratitude practices', color: '#FFFDE9' },
  { id: 'physical', label: 'Physical activities', color: '#EAF6F3' },
  { id: 'sleep', label: 'Better sleep', color: '#C4E0F9' },
  { id: 'nopref', label: 'No preference', color: '#FFEEDF' },
];

const About = () => {
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const router = useRouter();

  const toggleBlock = (id) => {
    // MODIFICATION: Removed the conditional navigation logic for 'breathing' block.
    // The breathing block now toggles selection like all other blocks.

    setSelectedBlocks(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(blockId => blockId !== id)
        : [...prevSelected, id]
    );
  };

  const nextButtonScale = useSharedValue(1);

  const nextButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nextButtonScale.value }],
  }));

  const handleNextPress = () => {
    nextButtonScale.value = withTiming(0.95, { duration: 100 });
    setTimeout(() => {
      nextButtonScale.value = withTiming(1, { duration: 100 });
    }, 100);
    console.log("Selected:", selectedBlocks);
    // TODO: proceed with your flow (e.g., save selections, navigate)
    
    // Example: Navigate to the breathing page if it's the only one selected
    // if (selectedBlocks.length === 1 && selectedBlocks[0] === 'breathing') {
    //   router.push('/breathing'); 
    // }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.phoneContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <View style={styles.gridHeader}>
          <Text style={styles.gridTitle}>Which of the following are you interested in practicing?</Text>
          <Text style={styles.gridSubtitle}>Choose all that apply</Text>
        </View>

        <View style={styles.grid}>
          {options.map((item) => {
            const isSelected = selectedBlocks.includes(item.id);
            const darkerBorderColor = darkenColor(item.color, 20);

            const scale = useSharedValue(1);
            const blockAnimatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

            const handlePressIn = () => {
              scale.value = withTiming(0.95, { duration: 100, easing: Easing.inOut(Easing.ease) });
            };

            const handlePressOut = () => {
              scale.value = withTiming(1, { duration: 100, easing: Easing.inOut(Easing.ease) });
              toggleBlock(item.id);
            };

            const isSleepBlock = item.label === 'Better sleep';

            return (
              <Animated.View key={item.id} style={[styles.blockWrapper, blockAnimatedStyle]}>
                <TouchableOpacity
                  style={[
                    styles.block,
                    { backgroundColor: item.color, borderColor: darkerBorderColor },
                    isSelected && styles.blockSelected,
                  ]}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  activeOpacity={1}
                >
                  <Image
                    source={icons[item.label]}
                    style={[styles.icon, isSleepBlock && isSelected && styles.sleepIconSelected]}
                    resizeMode="contain"
                  />
                  <Text style={styles.blockText}>{item.label}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <TouchableOpacity onPress={handleNextPress} activeOpacity={1}>
          <Animated.View style={[styles.nextButton, nextButtonAnimatedStyle]}>
            <Text style={styles.nextButtonText}>next</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Responsive sizes
const { width } = Dimensions.get('window');
const padding = 20;
const gap = 10;
const blockWidth = (width - padding * 2 - gap * 2) / 3;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  phoneContainer: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: padding, paddingTop: 40 },
  backButton: { alignSelf: 'flex-start', marginBottom: 10 },
  gridHeader: { marginBottom: 20, alignItems: 'center' },
  gridTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  gridSubtitle: { fontSize: 14, color: 'gray', textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: gap },
  blockWrapper: { width: blockWidth, marginBottom: gap },
  block: {
    width: '100%',
    height: blockWidth + 10,
    borderRadius: 15,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
  },
  blockSelected: {
    borderWidth: 4,
    borderColor: SELECTION_COLOR,
    shadowColor: SELECTION_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  icon: { width: 35, height: 35 },
  sleepIconSelected: { tintColor: SELECTION_COLOR },
  blockText: { fontSize: 12, fontWeight: '600', lineHeight: 16, color: '#333', textAlign: 'center' },
  nextButton: { backgroundColor: 'black', borderRadius: 15, paddingVertical: 15, marginTop: 30, alignItems: 'center', paddingHorizontal: 40 },
  nextButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' },
});

export default About;