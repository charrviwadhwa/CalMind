// components/FloatingNavBar.jsx
import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const FloatingNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedTab, setExpandedTab] = useState('home');

  // Determine color theme based on current page
  const getThemeColors = () => {
    if (pathname.includes('meet')) {
      return {
        primary: '#10B981', // Green for Meet page
        primaryLight: 'rgba(16, 185, 129, 0.1)',
        text: '#10B981'
      };
    } else if (pathname.includes('sessions') || pathname.includes('avana-appointment')) {
      return {
        primary: '#EA580C', // Orange for Sessions
        primaryLight: 'rgba(234, 88, 12, 0.1)',
        text: '#EA580C'
      };
    } else if (pathname.includes('suggestion')) {
      return {
        primary: '#FFB74D', // Orange for Suggestion page
        primaryLight: 'rgba(255, 183, 77, 0.1)',
        text: '#FFB74D'
      };
    } else {
      return {
        primary: '#EC4899', // Pink for Home
        primaryLight: 'rgba(236, 72, 153, 0.1)',
        text: '#EC4899'
      };
    }
  };

  const themeColors = getThemeColors();

  const navItems = [
    { key: 'home', icon: 'home', label: 'Home', route: '/home' },
    { key: 'sessions', icon: 'calendar-today', label: 'Sessions', route: '/sessions' },
    { key: 'forums', icon: 'forum', label: 'Forums', route: '/forums' },
    { key: 'profile', icon: 'account-circle', label: 'Profile', route: '/profile' },
    { key: 'settings', icon: 'settings', label: 'Settings', route: '/settings' },
  ];

  const handleTabPress = (tabKey, route) => {
    if (expandedTab === tabKey) {
      router.push(route);
    } else {
      setExpandedTab(tabKey);
      router.push(route);
    }
  };

  const getActiveTab = () => {
    if (pathname.includes('home')) return 'home';
    if (pathname.includes('sessions')) return 'sessions';
    if (pathname.includes('forums')) return 'forums';
    if (pathname.includes('profile')) return 'profile';
    if (pathname.includes('settings')) return 'settings';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <View style={styles.navigationBar}>
      {navItems.map((item) => (
        <Pressable
          key={item.key}
          style={[
            styles.navButton,
            activeTab === item.key && { ...styles.navButtonActive, backgroundColor: themeColors.primaryLight },
            expandedTab === item.key && { ...styles.navButtonExpanded, backgroundColor: themeColors.primaryLight }
          ]}
          onPress={() => handleTabPress(item.key, item.route)}
        >
          <MaterialIcons 
            name={item.icon} 
            size={22} 
            color={activeTab === item.key ? themeColors.text : '#6B7280'} 
          />
          {expandedTab === item.key && (
            <Text style={[
              styles.navButtonText,
              activeTab === item.key && { ...styles.navButtonTextActive, color: themeColors.text }
            ]}>
              {item.label}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    zIndex: 1000,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 8,
    minWidth: 50,
  },
  navButtonActive: {
    // backgroundColor applied dynamically
  },
  navButtonExpanded: {
    // Background applied dynamically
  },
  navButtonText: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: '500',
  },
  navButtonTextActive: {
    // Color applied dynamically
    fontWeight: '600',
  },
});

export default FloatingNavBar;