import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function MeditationScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const motivationalQuotes = [
    "✨ Breathe in peace, breathe out stress.",
    "🌿 You are exactly where you need to be.",
    "🌸 Calm mind brings inner strength.",
    "🌞 Start where you are, use what you have.",
    "💫 Be kind to your mind today.",
  ];

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync().catch(() => {});
    };
  }, [sound]);

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/images/meditation-music.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Meditation Stress</Text>
        <Text style={styles.title}>Relaxation</Text>
      </View>

      {/* Animated Girl */}
      <Image
        source={require('../assets/images/meditate.gif')}
        style={styles.image}
      />

      {/* Timer */}
      

      {/* Motivational Quotes Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          width={Dimensions.get('window').width}
          height={100}
          autoPlay
          autoPlayInterval={6000}
          loop
          data={motivationalQuotes}
          renderItem={({ item }) => (
            <Animated.View
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
              style={styles.quoteCard}
            >
              <Text style={styles.quote}>{item}</Text>
            </Animated.View>
          )}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="repeat" size={26} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={26} color="#777" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: height,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 100,
    backgroundColor: '#EFE7E6', // soft beige to match the girl GIF
  },
  header: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: height * 0.45,
    height: height * 0.45,
    resizeMode: 'contain',
    marginTop: 10,
  },
  timer: {
    fontSize: 18,
    color: '#444',
    marginTop: 10,
  },
  carouselContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  quoteCard: {
    
   
    padding: 15,

    width: 300,
    alignSelf: 'center',
  },
  quote: {
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '65%',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#5A7EFF',
    padding: 20,
    borderRadius: 50,
    shadowColor: '#5A7EFF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
});
