import { useState } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const SpotifyPreferencesPage = ({ navigation }) => {
  const [spotifyInfo, setSpotifyInfo] = useState({
    spotifyLink: ''
  });
  const [currentSlide] = useState(4);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!spotifyInfo.spotifyLink.trim()) {
      newErrors.spotifyLink = 'Spotify link is required';
    } else if (!isValidSpotifyLink(spotifyInfo.spotifyLink)) {
      newErrors.spotifyLink = 'Please enter a valid Spotify profile link';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidSpotifyLink = (link) => {
    const spotifyRegex = /^(https?:\/\/)?(open\.spotify\.com\/user\/|spotify:user:)/i;
    return spotifyRegex.test(link);
  };

  const handleInputChange = (value) => {
    setSpotifyInfo({ spotifyLink: value });
    
    if (errors.spotifyLink) {
      setErrors({ spotifyLink: '' });
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      
      navigation.navigate('CompletionPage');
    }
  };

  const openSpotifyGuide = () => {
    Linking.openURL('https://support.spotify.com/us/article/share-music/');
  };

  const handlePasteExample = () => {
    setSpotifyInfo({ spotifyLink: 'https://open.spotify.com/user/' });
    setErrors({ spotifyLink: '' });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Music Preferences</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.spotifyBox}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Connect Spotify</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/undraw_music_3vas.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Share your Spotify profile to help us understand your music taste and create personalized therapy playlists.
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Spotify Profile Link</Text>
            <TextInput
              style={[
                styles.input,
                errors.spotifyLink && styles.inputError
              ]}
              value={spotifyInfo.spotifyLink}
              onChangeText={handleInputChange}
              placeholder="https://open.spotify.com/user/yourusername"
              placeholderTextColor="#a0a0a0"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.spotifyLink && <Text style={styles.errorText}>{errors.spotifyLink}</Text>}
          </View>

          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Don't know how to find your Spotify link?
            </Text>
            <TouchableOpacity style={styles.helpLink} onPress={openSpotifyGuide}>
              <Text style={styles.helpLinkText}>View guide ↗</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.exampleButton} onPress={handlePasteExample}>
            <Text style={styles.exampleButtonText}>Use example format</Text>
          </TouchableOpacity>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Why connect Spotify?</Text>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitDot}>•</Text>
              <Text style={styles.benefitText}>Personalized music therapy sessions</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitDot}>•</Text>
              <Text style={styles.benefitText}>Mood-based playlist recommendations</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitDot}>•</Text>
              <Text style={styles.benefitText}>Better understanding of your preferences</Text>
            </View>
          </View>
        </View>

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

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5faf7',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    backgroundColor: '#f0f8f3',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backArrow: {
    fontSize: 20,
    color: '#38a169',
    fontWeight: 'bold',
  },
  title: {
    color: '#2d5a3d',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  spotifyBox: {
    backgroundColor: '#fefefe',
    borderWidth: 1.5,
    borderColor: '#e2f0e8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#c8e6d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  boxHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  boxTitle: {
    color: '#2d5a3d',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  image: {
    width: 140,
    height: 100,
  },
  descriptionContainer: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f7fcf9',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#38a169',
  },
  description: {
    color: '#2d5a3d',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#2d5a3d',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2f0e8',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#555',
    shadowColor: '#e2f0e8',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: '#38a169',
    backgroundColor: '#f7fcf9',
  },
  errorText: {
    color: '#38a169',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '500',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  helpText: {
    color: '#718096',
    fontSize: 12,
    flex: 1,
  },
  helpLink: {
    padding: 4,
  },
  helpLinkText: {
    color: '#38a169',
    fontSize: 12,
    fontWeight: '500',
  },
  exampleButton: {
    backgroundColor: '#e2f0e8',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  exampleButtonText: {
    color: '#2d5a3d',
    fontSize: 12,
    fontWeight: '500',
  },
  benefitsContainer: {
    marginTop: 8,
  },
  benefitsTitle: {
    color: '#2d5a3d',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  benefitDot: {
    color: '#38a169',
    fontSize: 14,
    marginRight: 8,
    marginTop: 1,
  },
  benefitText: {
    color: '#718096',
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8,
    marginTop: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e2f0e8',
  },
  dotActive: {
    backgroundColor: '#38a169',
  },
  carouselText: {
    textAlign: 'center',
    color: '#2d5a3d',
    marginBottom: 24,
    fontWeight: '500',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#38a169',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#c8e6d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SpotifyPreferencesPage;