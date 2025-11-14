import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

// --- Mock Data ---

// Updated with mood names for each smiley
const smileyData = [
  { id: 1, label: 'Worried', source: require('../assets/images/smiles/smile1.png') },
  { id: 2, label: 'Cool', source: require('../assets/images/smiles/smile2.png') },
  { id: 3, label: 'Fun', source: require('../assets/images/smiles/smile3.png') },
  { id: 4, label: 'Love', source: require('../assets/images/smiles/smile4.png') },
  { id: 5, label: 'Sad', source: require('../assets/images/smiles/smile5.png') },
  { id: 6, label: 'Surprised', source: require('../assets/images/smiles/smile6.png') },
  { id: 7, label: 'Moody', source: require('../assets/images/smiles/smile7.png') },
  { id: 8, label: 'Chill', source: require('../assets/images/smiles/smile8.png') },
  { id: 9, label: 'Done for the day', source: require('../assets/images/smiles/smile9.png') },
  { id: 10, label: 'Bored', source: require('../assets/images/smiles/smile10.png') },
  { id: 11, label: 'Enjoying', source: require('../assets/images/smiles/smile11.png') },
  { id: 12, label: 'Fantastic', source: require('../assets/images/smiles/smile12.png') },
  { id: 13, label: 'No idea', source: require('../assets/images/smiles/smile13.png') },
  { id: 14, label: 'Worried', source: require('../assets/images/smiles/smile14.png') },
  { id: 15, label: 'Money minded', source: require('../assets/images/smiles/smile15.png') },
  { id: 16, label: 'Lovely', source: require('../assets/images/smiles/smile16.png') },
];

// 9 blocks data with routes
const blockData = [
  { id: 'breathing', label: 'Breathing exercises', color: '#EAF6F3', icon: require('../assets/images/icons8-cloud-16.png'), route: "BreathingTimer" },
  { id: 'journaling', label: 'Journaling', color: '#FFF8EB', icon: require('../assets/images/icons8-pencil-100.png'), route: "Journaling" },
  { id: 'meditation', label: 'Meditation', color: '#E3F6EC', icon: require('../assets/images/icons8-meditation-64.png'), route: "Meditation" },
  { id: 'mood', label: 'Mood tracking', color: '#F1EFF8', icon: require('../assets/images/icons8-happy-48.png') },
  { id: 'selflove', label: 'Self-love', color: '#F8E9E9', icon: require('../assets/images/icons8-heart-100.png')},
  { id: 'gratitude', label: 'Gratitude practices', color: '#FFFDE9', icon: require('../assets/images/icons8-gratitude-64.png') },
  { id: 'physical', label: 'Physical activities', color: '#EAF6F3', icon: require('../assets/images/icons8-yoga-50.png')},
  { id: 'sleep', label: 'Better sleep', color: '#C4E0F9', icon: require('../assets/images/icons8-sleep-100.png') },
  { id: 'nopref', label: 'No preference', color: '#FFEEDF', icon: require('../assets/images/icons8-shield-100.png')},
];

// Quotes for carousel
const quotes = [
  { id: 1, text: "Small daily improvements are the key to staggering long-term results.", author: "- Robin Sharma" },
  { id: 2, text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: "- Unknown" },
  { id: 3, text: "The greatest wealth is health. Take care of your mind and body.", author: "- Virgil" },
  { id: 4, text: "You don't have to be great to start, but you have to start to be great.", author: "- Zig Ziglar" },
  { id: 5, text: "Self-care is how you take your power back. Be kind to your mind.", author: "- Lalah Delia" },
];

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

// Animated Bubble background component
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

// Component for smiley buttons in horizontal scroll
const SmileyButton = ({ smiley, isSelected, onPress }) => {
  return (
    <View style={styles.smileyContainer}>
      <Pressable
        onPress={onPress}
        style={[
          styles.smileyButton,
          isSelected && styles.smileyButtonSelected
        ]}
      >
        <Image 
          source={smiley.source} 
          style={styles.smileyImage} 
        />
      </Pressable>
      <Text style={[
        styles.smileyLabel,
        isSelected && styles.smileyLabelSelected
      ]}>
        {smiley.label}
      </Text>
    </View>
  );
};

// Component for the blocks grid - WITH NAVIGATION
const BlockItem = ({ item, isSelected, onPress }) => {
  const darkerBorderColor = darkenColor(item.color, 20);

  return (
    <Pressable
      style={[
        styles.block,
        { 
          backgroundColor: item.color, 
          borderWidth: isSelected ? 4 : 2,
          borderColor: isSelected ? '#0047AB' : darkerBorderColor,
        }
      ]}
      onPress={onPress}  // <--- Make sure this is used directly
    >
      <View style={styles.blockContent}>
        <View style={styles.blockTextContent}>
          <Text style={styles.blockText}>{item.label}</Text>
        </View>
        <Image
          source={item.icon}
          style={[styles.blockIcon]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.arrowCircle}>
        <MaterialIcons name="arrow-forward" size={16} color="white" style={styles.arrowIcon} />
      </View>
    </Pressable>
  );
};


// Progress component
const ProgressSection = ({ progress }) => (
  <View style={styles.progressSection}>
    <View style={styles.progressHeader}>
      <Text style={styles.progressTitle}>Your Progress</Text>
      <Text style={styles.progressPercentage}>{progress}%</Text>
    </View>
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%` }
          ]}
        />
      </View>
    </View>
  </View>
);

// Quotes Carousel Component
const QuotesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

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

// Stats Section with horizontal scroll
const StatsSection = () => (
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    style={styles.statsScrollContainer}
    contentContainerStyle={styles.statsScrollContent}
  >
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>5</Text>
      <Text style={styles.statLabel}>Sessions</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>3</Text>
      <Text style={styles.statLabel}>Goals Met</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>7</Text>
      <Text style={styles.statLabel}>Days Streak</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>12</Text>
      <Text style={styles.statLabel}>Mindful Minutes</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>85%</Text>
      <Text style={styles.statLabel}>Consistency</Text>
    </View>
  </ScrollView>
);

// --- Main Home Component ---
const Home = () => {
  const navigation = useNavigation();
  const [selectedSmiley, setSelectedSmiley] = useState(3); // Default to Fun
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const userName = 'Nandita';
  const progress = 92;

  const toggleBlock = (id) => {
    setSelectedBlocks(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(blockId => blockId !== id)
        : [...prevSelected, id]
    );
  };

  const selectedSmileyData = smileyData.find(smiley => smiley.id === selectedSmiley);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <ScrollView 
        contentContainerStyle={{ 
          paddingBottom: 120, // Increased for floating navbar
          minHeight: height
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <AnimatedBubbleBackground />
          
          {/* Greeting with selected emoji */}
          <Text style={styles.subtitle}>YOUR DAILY GROWTH</Text>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello, {userName} </Text>
            {selectedSmileyData && (
              <Image 
                source={selectedSmileyData.source} 
                style={styles.selectedEmoji} 
              />
            )}
          </View>

          <Text style={styles.feelingText}>How are you feeling today?</Text>

          {/* Smiley Selector with Horizontal Scroll */}
          <Text style={styles.smileySelectorTitle}>Select your mood</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.smileyScrollContainer}
          >
            {smileyData.map((smiley) => (
              <SmileyButton
                key={smiley.id}
                smiley={smiley}
                isSelected={selectedSmiley === smiley.id}
                onPress={() => setSelectedSmiley(smiley.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          {/* Progress Section */}
          <ProgressSection progress={progress} />

          {/* Blocks Header */}
          <Text style={styles.blocksTitle}>What would you like to practice?</Text>

          {/* Blocks Grid - WITH NAVIGATION */}
          <View style={styles.blocksGrid}>
            {blockData.map((item) => (
              <BlockItem
                key={item.id}
                item={item}
                isSelected={selectedBlocks.includes(item.id)}
                onPress={() => {
                  toggleBlock(item.id);
                  if (item.route) {
                    navigation.navigate(item.route);
                  }
                }}
              />
            ))}
          </View>

          {/* Stats Section with horizontal scroll */}
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>This Week</Text>
            <StatsSection />
          </View>

          {/* Quotes Carousel */}
          <QuotesCarousel />
        </View>
      </ScrollView>
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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
    paddingTop: 50,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: "#FBE4E3",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
    letterSpacing: 1,
    marginBottom: 8,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2937",
    lineHeight: 38,
  },
  selectedEmoji: {
    width: 36,
    height: 36,
    marginLeft: 8,
    borderRadius: 100,
  },
  feelingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 24,
  },

  // Smiley Styles
  smileySelectorTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  smileyScrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  smileyContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 70,
  },
  smileyButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  smileyButtonSelected: {
    borderColor: '#EC4899',
    shadowColor: '#EC4899',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ scale: 1.1 }],
  },
  smileyImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain'
  },
  smileyLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
    height: 28,
  },
  smileyLabelSelected: {
    color: '#EC4899',
    fontWeight: '600',
  },

  // Main Content Styles
  mainContent: {
    padding: 20,
  },

  // Progress Section Styles
  progressSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: '800',
    color: '#EC4899',
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    width: '70%',
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#EC4899",
    borderRadius: 3,
  },

  // Carousel Styles
  carouselContainer: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    borderRadius: 16,
    marginTop: 20,
    padding: 16,
    height: 120,
  },
  quoteSlide: {
    width: width - 80,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  carouselDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dbd1d9ff',
    marginHorizontal: 3,
  },
  carouselDotActive: {
    backgroundColor: '#EC4899',
    width: 20,
  },

  // Blocks Section
  blocksTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 16,
  },
  blocksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  block: {
    width: (width - 52) / 2,
    height: 140,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',
  },
  blockContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
  blockTextContent: {
    flex: 1,
    marginRight: 8,
  },
  blockText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#333',
    textAlign: 'left',
  },
  blockIcon: {
    width: 50,
    height: 50,
  },
  arrowCircle: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    transform: [{ rotate: '45deg' }],
  },

  // Stats Section
  statsSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
  },
  statsScrollContainer: {
    marginHorizontal: -5,
  },
  statsScrollContent: {
    paddingHorizontal: 5,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#EC4899',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Home;