import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
  return (
    <LinearGradient colors={['#E8EEFF', '#F6F8FF']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Top logo */}
           <View style={styles.logoRow}>
            <Image
              source={require('../assets/images/logo.png')} // ← your small logo here
              style={styles.smallLogo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>mindcare</Text>
          </View>

          {/* Center illustration */}
          <View style={styles.middleSection}>
            <Image
              source={require('../assets/images/yoga1.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
            <Text style={styles.title}>Your mental health matters</Text>
            <Text style={styles.subtitle}>Start your journey with us</Text>
          </View>

          {/* Bottom button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Let’s start now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    minHeight: Platform.OS === 'web' ? '100vh' : height,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  smallLogo: {
    width: 48,
    height: 48,
    marginRight: 4, // small space between logo and text
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  middleSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  illustration: {
    width: 260,
    height: 260,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});