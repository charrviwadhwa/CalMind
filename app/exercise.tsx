import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, 
  StatusBar, Image, Vibration, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

// --- Colors & Styling ---
const COLORS = {
  workStart: '#B6E2A1',
  workEnd: '#9ED2A3',
  restStart: '#A7C7E7',
  restEnd: '#C2E0F9',
  pauseStart: '#E0E4E7',
  pauseEnd: '#F0F5F9',
  textDark: '#333',
  textLight: '#fff',
  accent: '#4A8BBF',
};

const TOTAL_SETS = 8;
const WORK_DURATION = 20;
const REST_DURATION = 10;

type Phase = 'WORK' | 'REST' | 'PAUSE' | 'COMPLETED';

export default function AestheticIntervalTimer() {
  const [phase, setPhase] = useState<Phase>('PAUSE');
  const [timeRemaining, setTimeRemaining] = useState(WORK_DURATION);
  const [currentSet, setCurrentSet] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Timer Logic ---
  useEffect(() => {
    if (phase === 'PAUSE' || phase === 'COMPLETED') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          Vibration.vibrate(400);
          if (phase === 'WORK') {
            setPhase('REST');
            return REST_DURATION;
          } else {
            if (currentSet < TOTAL_SETS) {
              setCurrentSet(prevSet => prevSet + 1);
              setPhase('WORK');
              return WORK_DURATION;
            } else {
              setPhase('COMPLETED');
              if (intervalRef.current) clearInterval(intervalRef.current);
              return 0;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase, currentSet]);

  // --- Helpers ---
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  const getGradient = () => {
    switch (phase) {
      case 'WORK': return [COLORS.workStart, COLORS.workEnd];
      case 'REST': return [COLORS.restStart, COLORS.restEnd];
      default: return [COLORS.pauseStart, COLORS.pauseEnd];
    }
  };

  const getMotivationalText = () => {
    switch (phase) {
      case 'WORK': return "Stay focused — your effort counts 💪";
      case 'REST': return "Breathe... recharge for the next set 🌿";
      case 'PAUSE': return "Ready to begin your session?";
      case 'COMPLETED': return "Amazing! You’ve finished your workout 🎉";
    }
  };

  const handlePlayPause = () => {
    if (phase === 'COMPLETED') {
      setPhase('WORK');
      setCurrentSet(1);
      setTimeRemaining(WORK_DURATION);
    } else if (phase === 'PAUSE') {
      setPhase('WORK');
      setTimeRemaining(WORK_DURATION);
    } else {
      setPhase('PAUSE');
    }
  };

  const handleSkip = () => {
    if (phase === 'WORK') {
      setPhase('REST');
      setTimeRemaining(REST_DURATION);
    } else if (phase === 'REST') {
      if (currentSet < TOTAL_SETS) {
        setCurrentSet(prev => prev + 1);
        setPhase('WORK');
        setTimeRemaining(WORK_DURATION);
      } else setPhase('COMPLETED');
    }
  };

  const isRunning = phase === 'WORK' || phase === 'REST';

  return (
    <LinearGradient colors={getGradient()} style={styles.gradient}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back-outline" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Interval Timer</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Timer Section */}
        <View style={styles.timerContainer}>
          {phase === 'COMPLETED' ? (
            <>
              <Ionicons name="checkmark-circle-outline" size={100} color="#333" />
              <Text style={styles.completedText}>Workout Complete!</Text>
              <Text style={styles.motivationalText}>{getMotivationalText()}</Text>
            </>
          ) : (
            <>
              <Text style={styles.phaseText}>
                {phase === 'WORK' ? `WORK ${currentSet}/${TOTAL_SETS}` :
                 phase === 'REST' ? `REST ${currentSet}/${TOTAL_SETS}` : 'PAUSED'}
              </Text>
              <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
              <Text style={styles.motivationalText}>{getMotivationalText()}</Text>
            </>
          )}
        </View>

        {/* Illustration */}
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6803/6803672.png' }} 
          style={styles.illustration}
        />

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="refresh-outline" size={28} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playPauseBtn} onPress={handlePlayPause}>
            <Ionicons 
              name={isRunning ? 'pause' : 'play'} 
              size={40} 
              color="#fff" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} onPress={handleSkip}>
            <Ionicons name="play-skip-forward-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  timerText: {
    fontSize: 90,
    fontWeight: 'bold',
    color: '#333',
  },
  motivationalText: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  completedText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  illustration: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBtn: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    width: 65,
    height: 65,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseBtn: {
    backgroundColor: COLORS.accent,
    width: 95,
    height: 95,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
});
