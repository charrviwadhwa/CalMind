import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const CompletionPage = () => {
  const navigation = useNavigation();
  const [currentSlide] = React.useState(5);

  const handleFinish = () => {
    // Navigate to the main app
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.gifContainer}>
          <Image 
            source={require('../assets/images/couple-cuddle.gif')}
            style={styles.gif}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>Let the Journey</Text>
          <Text style={styles.subTitle}>Begin</Text>
          
          <View style={styles.separator} />
          
          <Text style={styles.description}>
            You're ready to travel smarter, softer,{'\n'}
            and smoother.
          </Text>
          
          <Text style={styles.inspirationalText}>
            Your path to wellness is paved with personalized care and mindful moments. Every step forward is a victory worth celebrating.
          </Text>
        </View>

        <View style={styles.carouselContainer}>
          <View style={styles.carouselDots}>
            {[1, 2, 3, 4, 5].map((dot) => (
              <View
                key={dot}
                style={[
                  styles.dot,
                  dot === currentSlide && styles.dotActive
                ]}
              />
            ))}
          </View>
          <Text style={styles.carouselText}>
            {currentSlide} / 5
          </Text>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleFinish}
        >
          <Text style={styles.nextButtonText}>Begin Journey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5ff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: height * 0.05,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  gifContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  gif: {
    width: width * 0.8,
    height: height * 0.3,
  },
  textContainer: {
    marginBottom: 30,
  },
  mainTitle: {
    color: '#4a4a4a',
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 1.5,
    textAlign: 'left',
    marginBottom: 5,
  },
  subTitle: {
    color: '#9370db',
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'left',
    marginBottom: 25,
  },
  separator: {
    width: 60,
    height: 2,
    backgroundColor: '#d8bfd8',
    marginBottom: 25,
    borderRadius: 1,
  },
  description: {
    color: '#666',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 26,
    textAlign: 'left',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  inspirationalText: {
    color: '#777',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 20,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d8bfd8',
  },
  dotActive: {
    backgroundColor: '#9370db',
  },
  carouselText: {
    color: '#9370db',
    fontSize: 12,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#9370db',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#9370db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default CompletionPage;