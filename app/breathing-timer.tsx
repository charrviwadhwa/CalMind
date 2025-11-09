import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const PRIMARY_COLOR = '#89AC65'; // Green (Breathe In)
const OUT_COLOR = '#D28549'; // Orange (Breathe Out)
const PAUSE_COLOR = '#3B3632'; // Dark Brown (Paused)
const TIMER_DURATION = 600; // 9:27
const WINDOW_WIDTH = Dimensions.get('window').width;

const PHASE_CONFIG = {
  IN: { text: 'Breathe In...', color: PRIMARY_COLOR, duration: 4 },
  HOLD_IN: { text: 'Hold', color: PRIMARY_COLOR, duration: 2 },
  OUT: { text: 'Breathe Out...', color: OUT_COLOR, duration: 6 },
  HOLD_OUT: { text: 'Rest', color: OUT_COLOR, duration: 2 },
  PAUSE: { text: 'Paused', color: PAUSE_COLOR, duration: 0 },
};

export default function BreathingTimer() {
  const [currentPhase, setCurrentPhase] = useState('PAUSE');
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(TIMER_DURATION);
  const [phaseTimer, setPhaseTimer] = useState(0);
  const intervalRef = useRef(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  // --- Initialize Audio ---
  useEffect(() => {
    const initAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        });
      } catch (err) {
        console.warn('Audio mode error:', err);
      }
    };
    initAudio();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // --- Breathing Animation ---
  const triggerBreathingAnimation = (phase) => {
    let toValue = 1;
    let opacityValue = 0.3;
    let duration = 4000;

    if (phase === 'IN') {
      toValue = 1.3;
      opacityValue = 0.6;
      duration = 4000;
    } else if (phase === 'OUT') {
      toValue = 1;
      opacityValue = 0.3;
      duration = 6000;
    }

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue,
        duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: opacityValue,
        duration: duration / 2,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  // --- Timer Logic ---
  useEffect(() => {
    if (currentPhase === 'PAUSE' || totalTimeRemaining <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (totalTimeRemaining <= 0) {
        setTotalTimeRemaining(0);
        setCurrentPhase('PAUSE');
      }
      return;
    }

    const config = PHASE_CONFIG[currentPhase];
    triggerBreathingAnimation(currentPhase);

    setPhaseTimer(config.duration);
    intervalRef.current = setInterval(() => {
      setPhaseTimer((prev) => {
        if (prev <= 1) {
          const order = ['IN', 'HOLD_IN', 'OUT', 'HOLD_OUT'];
          const nextPhase =
            order[(order.indexOf(currentPhase) + 1) % order.length];
          setCurrentPhase(nextPhase);
          triggerBreathingAnimation(nextPhase);
          return PHASE_CONFIG[nextPhase].duration;
        }
        return prev - 1;
      });
      setTotalTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentPhase]);

  const toggleTimer = () => {
    if (currentPhase === 'PAUSE') {
      setCurrentPhase('IN');
      setPhaseTimer(PHASE_CONFIG['IN'].duration);
    } else {
      setCurrentPhase('PAUSE');
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const color = PHASE_CONFIG[currentPhase].color;
  const text = PHASE_CONFIG[currentPhase].text;
  const isRunning = currentPhase !== 'PAUSE';

  return (
    <View style={[styles.screenContainer, { backgroundColor: color }]}>
      <StatusBar
        barStyle={color === PAUSE_COLOR ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons
              name="chevron-back-outline"
              size={28}
              color={color === PAUSE_COLOR ? '#fff' : '#333'}
            />
          </TouchableOpacity>

          <View style={styles.soundContainer}>
            <Ionicons
              name="headset-outline"
              size={20}
              color={color === PAUSE_COLOR ? '#fff' : '#333'}
            />
            <Text
              style={[
                styles.soundText,
                { color: color === PAUSE_COLOR ? '#fff' : '#333' },
              ]}
            >
              Chirping Birds
            </Text>
          </View>
        </View>

        {/* Breathing Circles */}
        <View style={styles.centerContainer}>
          {[0.8, 1, 1.2].map((multiplier, i) => (
            <Animated.View
              key={i}
              style={[
                styles.breathingCircle,
                {
                  opacity: fadeAnim.interpolate({
                    inputRange: [0.3, 0.6],
                    outputRange: [0.2, 0.5],
                  }),
                  transform: [
                    {
                      scale: scaleAnim.interpolate({
                        inputRange: [1, 1.3],
                        outputRange: [multiplier, multiplier * 1.3],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}

          <Text
            style={[
              styles.instructionText,
              { color: color === PAUSE_COLOR ? '#fff' : '#333' },
            ]}
          >
            {text}
          </Text>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text
            style={[
              styles.timeText,
              { color: color === PAUSE_COLOR ? '#fff' : '#333' },
            ]}
          >
            {formatTime(totalTimeRemaining)}
          </Text>
          <TouchableOpacity style={styles.playButton} onPress={toggleTimer}>
            <Ionicons
              name={isRunning ? 'pause' : 'play'}
              size={40}
              color={color}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    minHeight:height,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
  },
  soundText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  instructionText: {
    fontSize: 42,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 60,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  timeText: {
    fontSize: 36,
    fontWeight: '400',
    marginBottom: 40,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
});
