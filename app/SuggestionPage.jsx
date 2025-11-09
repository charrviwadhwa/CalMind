import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Dimensions, StyleSheet, Image, Animated, Linking } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Orange pastel color palette
const colors = {
  primary: '#FFB74D', // Soft orange
  primaryLight: '#FFE0B2', // Light orange
  primaryDark: '#F57C00', // Darker orange
  secondary: '#FFCC80', // Complementary orange
  background: '#FFF8F0', // Warm white with orange tint
  card: '#FFFFFF',
  text: '#5D4037', // Warm brown text
  textLight: '#8D6E63',
  accent: '#FF9800', // Bright orange for highlights
  success: '#4CAF50',
  bubble: 'rgba(255, 183, 77, 0.2)', // Orange bubbles
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

// --- Sub-Components ---

// Animated Bubble background component with orange theme
const AnimatedBubbleBackground = () => {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;
  const anim4 = useRef(new Animated.Value(0)).current;
  const anim5 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateBubbles = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(anim1, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(anim1, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim2, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(anim2, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim3, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(anim3, {
            toValue: 0,
            duration: 3500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim4, {
            toValue: 1,
            duration: 4500,
            useNativeDriver: true,
          }),
          Animated.timing(anim4, {
            toValue: 0,
            duration: 4500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim5, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(anim5, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animateBubbles());
    };

    animateBubbles();
  }, []);

  return (
    <View style={styles.bubbleContainer}>
      <Animated.View style={[styles.bubble, styles.bubble1, {
        transform: [{
          translateY: anim1.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -20]
          })
        }]
      }]} />
      <Animated.View style={[styles.bubble, styles.bubble2, {
        transform: [{
          translateY: anim2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 15]
          })
        }]
      }]} />
      <Animated.View style={[styles.bubble, styles.bubble3, {
        transform: [{
          translateY: anim3.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -25]
          })
        }]
      }]} />
      <Animated.View style={[styles.bubble, styles.bubble4, {
        transform: [{
          translateY: anim4.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 10]
          })
        }]
      }]} />
      <Animated.View style={[styles.bubble, styles.bubble5, {
        transform: [{
          translateY: anim5.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -15]
          })
        }]
      }]} />
    </View>
  );
};

// Session Report Card Component
const SessionReportCard = ({ onViewReport }) => (
  <View style={styles.reportCard}>
    <View style={styles.reportHeader}>
      <View style={styles.reportIconContainer}>
        <MaterialIcons name="description" size={24} color={colors.primaryDark} />
      </View>
      <View style={styles.reportTextContainer}>
        <Text style={styles.reportTitle}>Your Session Report is Ready!</Text>
        <Text style={styles.reportDescription}>
          View insights and recommendations from your AI therapy session
        </Text>
      </View>
    </View>
    <Pressable style={styles.viewReportButton} onPress={onViewReport}>
      <Text style={styles.viewReportButtonText}>View Report</Text>
      <MaterialIcons name="arrow-forward" size={18} color="white" />
    </Pressable>
  </View>
);

// Therapist Suggestion Card Component
const TherapistSuggestionCard = ({ onBookAppointment }) => (
  <View style={styles.therapistCard}>
    <View style={styles.therapistHeader}>
      <View style={styles.therapistIconContainer}>
        <MaterialCommunityIcons name="doctor" size={24} color={colors.primaryDark} />
      </View>
      <View style={styles.therapistTextContainer}>
        <Text style={styles.therapistTitle}>Talk to a Therapist</Text>
        <Text style={styles.therapistDescription}>
          Based on your session, we recommend speaking with a professional
        </Text>
      </View>
    </View>
    
    <View style={styles.therapistBenefits}>
      <View style={styles.benefitItem}>
        <MaterialIcons name="check-circle" size={16} color={colors.success} />
        <Text style={styles.benefitText}>Personalized guidance</Text>
      </View>
      <View style={styles.benefitItem}>
        <MaterialIcons name="check-circle" size={16} color={colors.success} />
        <Text style={styles.benefitText}>Professional support</Text>
      </View>
      <View style={styles.benefitItem}>
        <MaterialIcons name="check-circle" size={16} color={colors.success} />
        <Text style={styles.benefitText}>Continuous care</Text>
      </View>
    </View>
    
    <Pressable style={styles.bookButton} onPress={onBookAppointment}>
      <MaterialIcons name="event-available" size={20} color="white" />
      <Text style={styles.bookButtonText}>Book Appointment</Text>
    </Pressable>
  </View>
);

// Floating Navigation Bar with Orange Theme
const NavigationBar = ({ activeTab, onTabPress }) => {
  const [expandedTab, setExpandedTab] = useState(activeTab);

  const navItems = [
    { key: 'home', icon: 'home', label: 'Home' },
    { key: 'sessions', icon: 'calendar-today', label: 'Sessions' },
    { key: 'forums', icon: 'forum', label: 'Forums' },
    { key: 'profile', icon: 'account-circle', label: 'Profile' },
    { key: 'settings', icon: 'settings', label: 'Settings' },
  ];

  const handleTabPress = (tabKey) => {
    if (expandedTab === tabKey) {
      onTabPress(tabKey);
    } else {
      setExpandedTab(tabKey);
      onTabPress(tabKey);
    }
  };

  return (
    <View style={styles.navigationBar}>
      {navItems.map((item) => (
        <Pressable
          key={item.key}
          style={[
            styles.navButton,
            activeTab === item.key && styles.navButtonActive,
            expandedTab === item.key && styles.navButtonExpanded
          ]}
          onPress={() => handleTabPress(item.key)}
        >
          <MaterialIcons 
            name={item.icon} 
            size={22} 
            color={activeTab === item.key ? colors.primaryDark : colors.textLight} 
          />
          {expandedTab === item.key && (
            <Text style={[
              styles.navButtonText,
              activeTab === item.key && styles.navButtonTextActive
            ]}>
              {item.label}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
};

// Quotes Carousel Component
const QuotesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  
  const quotes = [
    { id: 1, text: "Healing takes time, and asking for help is a courageous step.", author: "- Unknown" },
    { id: 2, text: "Your mental health is a priority. Your happiness is essential.", author: "- Unknown" },
    { id: 3, text: "Talking about your feelings is the first step to understanding them.", author: "- Unknown" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % quotes.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * (width - 80),
        animated: true
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffsetX / (width - 80));
          setCurrentIndex(index);
        }}
      >
        {quotes.map((quote, index) => (
          <View key={quote.id} style={styles.quoteSlide}>
            <Text style={styles.quoteText}>"{quote.text}"</Text>
            <Text style={styles.quoteAuthor}>{quote.author}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.carouselDots}>
        {quotes.map((_, index) => (
          <View
            key={index}
            style={[
              styles.carouselDot,
              index === currentIndex && styles.carouselDotActive
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// --- Main Suggestion Component ---
const SuggestionPage = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const userName = 'Nandita';

  const handleViewReport = () => {
    // Navigate to report screen or show modal
    alert('Session report would open here with detailed insights and recommendations');
  };

  const handleBookAppointment = () => {
    // Open booking flow or external link
    alert('Booking flow would open here to schedule with a therapist');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        contentContainerStyle={{ 
          paddingBottom: 100,
          minHeight: height
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <AnimatedBubbleBackground />
          
          {/* Nav/Status Bar */}
          <View style={styles.navBar}>
            <Pressable style={styles.navButton}>
              <MaterialIcons name="arrow-back" size={20} color={colors.text} />
            </Pressable>
            <Text style={styles.navTitle}>          Session Summary             </Text>
            <Pressable style={styles.navButton}>
              <MaterialIcons name="more-vert" size={20} color={colors.text} />
            </Pressable>
          </View>

          {/* Greeting */}
          <Text style={styles.subtitle}>SESSION COMPLETED</Text>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Great session, {userName}! </Text>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={28} color={colors.primaryDark} />
          </View>

          <Text style={styles.feelingText}>
            Your AI therapy session has been analyzed. Here are your next steps:
          </Text>
        </View>

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {/* Session Report Card */}
          <SessionReportCard onViewReport={handleViewReport} />

          {/* Therapist Suggestion Card */}
          <TherapistSuggestionCard onBookAppointment={handleBookAppointment} />

          {/* Additional Resources */}
          <View style={styles.resourcesSection}>
            <Text style={styles.sectionTitle}>Additional Resources</Text>
            <View style={styles.resourceCards}>
              <View style={styles.resourceCard}>
                <MaterialCommunityIcons name="book-open-variant" size={24} color={colors.primaryDark} />
                <Text style={styles.resourceTitle}>Self-help Articles</Text>
                <Text style={styles.resourceDesc}>Read curated content</Text>
              </View>
              <View style={styles.resourceCard}>
                <MaterialCommunityIcons name="meditation" size={24} color={colors.primaryDark} />
                <Text style={styles.resourceTitle}>Guided Exercises</Text>
                <Text style={styles.resourceDesc}>Practice techniques</Text>
              </View>
            </View>
          </View>

          {/* Inspirational Quotes */}
          <QuotesCarousel />
        </View>
      </ScrollView>
      
      {/* Floating Navigation Bar */}
      <NavigationBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  // Bubble Background Styles
  bubbleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: colors.bubble,
    borderRadius: 50,
  },
  bubble1: { width: 80, height: 80, top: 50, left: 20 },
  bubble2: { width: 60, height: 60, top: 120, right: 30 },
  bubble3: { width: 100, height: 100, bottom: 80, left: 40 },
  bubble4: { width: 70, height: 70, bottom: 40, right: 50 },
  bubble5: { width: 50, height: 50, top: 200, right: 20 },

  // Header Styles
  header: {
    padding: 36,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: colors.primaryLight,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: 1,
    marginBottom: 8,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    lineHeight: 34,
  },
  feelingText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textLight,
    marginTop: 8,
    lineHeight: 22,
  },

  // Main Content Styles
  mainContent: {
    padding: 20,
  },

  // Session Report Card Styles
  reportCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  reportHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  reportIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  reportTextContainer: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  reportDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  viewReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  viewReportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Therapist Suggestion Card Styles
  therapistCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  therapistHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  therapistIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  therapistTextContainer: {
    flex: 1,
  },
  therapistTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  therapistDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  therapistBenefits: {
    marginBottom: 20,
    paddingLeft: 4,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryDark,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 10,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  // Resources Section
  resourcesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  resourceCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resourceCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    width: (width - 60) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  resourceDesc: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },

  // Carousel Styles
  carouselContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    padding: 20,
    height: 140,
  },
  quoteSlide: {
    width: width - 80,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 15,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    fontWeight: '500',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  carouselDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
    marginHorizontal: 3,
  },
  carouselDotActive: {
    backgroundColor: colors.primaryDark,
    width: 20,
  },

  // Navigation Bar Styles
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
    borderColor: colors.primaryLight,
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
    backgroundColor: colors.primaryLight,
  },
  navButtonExpanded: {
    backgroundColor: colors.primaryLight,
  },
  navButtonText: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: '500',
  },
  navButtonTextActive: {
    color: colors.primaryDark,
    fontWeight: '600',
  },
});

export default SuggestionPage;