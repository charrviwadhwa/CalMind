// app/meet.jsx
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Meet = () => {
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [showSessions, setShowSessions] = useState(false);
  
  // Timer effect
  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleMicToggle = () => {
    setIsMicMuted(!isMicMuted);
  };

  const handleEndCall = () => {
    router.back();
  };

  const handleChat = () => {
    console.log('Open chat interface');
  };

  const handleSessions = () => {
    setShowSessions(!showSessions);
  };

  // Session types with green theme - Circular blocks
  const sessionTypes = [
    { id: 'breathing', label: 'Breathing', color: '#DCFCE7' },
    { id: 'meditation', label: 'Meditation', color: '#D1FAE5' },
    { id: 'mindfulness', label: 'Mindfulness', color: '#A7F3D0' },
    { id: 'relaxation', label: 'Relaxation', color: '#6EE7B7' },
    { id: 'therapy', label: 'Therapy', color: '#34D399' },
    { id: 'yoga', label: 'Yoga', color: '#10B981' },
  ];

  const [selectedSession, setSelectedSession] = useState('meditation');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header - Clean and minimal with green accents */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#10B981" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>CalMind Session</Text>
            <Text style={styles.sessionType}>Active Session</Text>
          </View>
          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={14} color="#10B981" />
            <Text style={styles.durationText}>{formatTime(sessionTime)}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={[styles.videoContainer, { paddingBottom: 100 }]}>
          {/* Subtle Green Background */}
          <View style={styles.backgroundPattern} />
          
          {/* AI Agent Box */}
          <View style={styles.agentContainer}>
            <View style={styles.agentBox}>
              <View style={styles.agentAvatar}>
                <View style={styles.agentIconContainer}>
                  <Ionicons name="sparkles" size={32} color="#10B981" />
                </View>
                <View style={styles.statusIndicator}>
                  <View style={[styles.statusDot, { backgroundColor: isPaused ? '#F59E0B' : '#10B981' }]} />
                </View>
              </View>
              <Text style={styles.agentName}>Mindful AI</Text>
              <Text style={styles.agentStatus}>
                {isPaused ? 'Session Paused' : 'Active & Listening'}
              </Text>
            </View>
          </View>

          {/* User Box */}
          <View style={styles.userContainer}>
            <View style={styles.userBox}>
              <View style={styles.userAvatar}>
                <View style={styles.userIconContainer}>
                  <Ionicons name="person" size={32} color="#6B7280" />
                </View>
                <View style={styles.statusIndicator}>
                  <View style={[
                    styles.statusDot, 
                    { backgroundColor: isMicMuted ? '#EF4444' : '#10B981' }
                  ]} />
                </View>
              </View>
              <Text style={styles.userName}>You</Text>
              <Text style={styles.userStatus}>
                {isMicMuted ? 'Mic Off' : 'Ready'}
              </Text>
            </View>
          </View>
        </View>

        {/* Sessions Grid - Appears when sessions button is clicked */}
        {showSessions && (
          <View style={styles.sessionsGrid}>
            <Text style={styles.sessionsTitle}>Choose Session Type</Text>
            <View style={styles.sessionsContainer}>
              {sessionTypes.map((session) => (
                <TouchableOpacity
                  key={session.id}
                  style={[
                    styles.sessionBlock,
                    { backgroundColor: session.color },
                    selectedSession === session.id && styles.sessionBlockSelected
                  ]}
                  onPress={() => {
                    setSelectedSession(session.id);
                    setShowSessions(false);
                  }}
                >
                  <Text style={[
                    styles.sessionBlockText,
                    selectedSession === session.id && styles.sessionBlockTextSelected
                  ]}>
                    {session.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Control Buttons - Compact and clean */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={[styles.controlButton, styles.chatButton]}
            onPress={handleChat}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#10B981" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, styles.sessionsButton]}
            onPress={handleSessions}
          >
            <Ionicons name="apps" size={20} color="#10B981" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, styles.pauseButton]}
            onPress={handlePause}
          >
            <Ionicons 
              name={isPaused ? "play" : "pause"} 
              size={20} 
              color="#F59E0B" 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, styles.micButton, isMicMuted && styles.micButtonMuted]}
            onPress={handleMicToggle}
          >
            <Ionicons 
              name={isMicMuted ? "mic-off" : "mic"} 
              size={20} 
              color={isMicMuted ? "#fff" : "#10B981"} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, styles.endButton]}
            onPress={handleEndCall}
          >
            <Ionicons name="call" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  backButton: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  sessionType: {
    fontSize: 12,
    color: '#10B981',
    marginTop: 2,
    fontWeight: '600',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  durationText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F0FDF4',
  },
  agentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  userContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  agentBox: {
    width: width * 0.9,
    height: width * 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.15)',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    padding: 20,
  },
  userBox: {
    width: width * 0.9,
    height: width * 0.7,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(156, 163, 175, 0.15)',
    shadowColor: '#9CA3AF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 6,
    padding: 16,
  },
  agentAvatar: {
    alignItems: 'center',
    marginBottom: 16,
  },
  userAvatar: {
    alignItems: 'center',
    marginBottom: 16,
  },
  agentIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    marginBottom: 12,
  },
  userIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(156, 163, 175, 0.2)',
    marginBottom: 12,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  agentName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 6,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  agentStatus: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  userStatus: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  // Sessions Grid - Circular Blocks
  sessionsGrid: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#D1FAE5',
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
  },
  sessionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },
  sessionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  sessionBlock: {
    width: (width - 64) / 3, // 3 columns for circular layout
    height: (width - 64) / 3,
    borderRadius: (width - 64) / 6, // Perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionBlockSelected: {
    borderColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1.05 }],
  },
  sessionBlockText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#065F46',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  sessionBlockTextSelected: {
    color: '#065F46',
    fontWeight: '700',
  },
  // Control Buttons
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#D1FAE5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  sessionsButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  pauseButton: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  micButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  micButtonMuted: {
    backgroundColor: '#EF4444',
  },
  endButton: {
    backgroundColor: '#EF4444',
  },
});

export default Meet; 