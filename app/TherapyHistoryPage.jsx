import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const TherapyHistoryPage = ({ navigation }) => {
  const [therapyHistory, setTherapyHistory] = useState({
    hasPastTherapy: '',
    details: ''
  });
  const [currentSlide] = useState(3);
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!therapyHistory.hasPastTherapy) {
      newErrors.hasPastTherapy = 'Please select an option';
    }
    
    if (therapyHistory.hasPastTherapy === 'Yes' && !therapyHistory.details.trim()) {
      newErrors.details = 'Please provide details about your therapy history';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectOption = (option) => {
    setTherapyHistory(prev => ({
      ...prev,
      hasPastTherapy: option,
      details: option === 'No' ? '' : prev.details
    }));
    setShowDropdown(false);
    setErrors(prev => ({ ...prev, hasPastTherapy: '' }));
  };

  const handleDetailsChange = (text) => {
    setTherapyHistory(prev => ({
      ...prev,
      details: text
    }));
    
    if (errors.details) {
      setErrors(prev => ({ ...prev, details: '' }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      
      navigation.navigate('SpotifyPreferencesPage');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Therapy History</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.therapyBox}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Past Therapy Experience</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/undraw_online-meeting_qe61.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Have you had therapy before?</Text>
            <TouchableOpacity 
              style={[
                styles.dropdown,
                errors.hasPastTherapy && styles.inputError
              ]}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={[
                styles.dropdownText,
                !therapyHistory.hasPastTherapy && styles.placeholderText
              ]}>
                {therapyHistory.hasPastTherapy || 'Select an option'}
              </Text>
              <Text style={styles.dropdownArrow}>{showDropdown ? '↑' : '↓'}</Text>
            </TouchableOpacity>
            {errors.hasPastTherapy && <Text style={styles.errorText}>{errors.hasPastTherapy}</Text>}
            
            {showDropdown && (
              <View style={styles.dropdownOptions}>
                <TouchableOpacity 
                  style={styles.option}
                  onPress={() => handleSelectOption('Yes')}
                >
                  <Text style={styles.optionText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.option}
                  onPress={() => handleSelectOption('No')}
                >
                  <Text style={styles.optionText}>No</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {therapyHistory.hasPastTherapy === 'Yes' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tell us about your therapy experience</Text>
              <TextInput
                style={[
                  styles.textArea,
                  errors.details && styles.inputError
                ]}
                value={therapyHistory.details}
                onChangeText={handleDetailsChange}
                placeholder="Please share details about your previous therapy sessions, duration, what worked well, etc."
                placeholderTextColor="#a0a0a0"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {errors.details && <Text style={styles.errorText}>{errors.details}</Text>}
            </View>
          )}
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
    backgroundColor: '#f5f7fa',
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
    backgroundColor: '#f0f4f8',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backArrow: {
    fontSize: 20,
    color: '#4a6fa5',
    fontWeight: 'bold',
  },
  title: {
    color: '#4a5568',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  therapyBox: {
    backgroundColor: '#fefefe',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#cbd5e0',
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
    color: '#4a5568',
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
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#4a5568',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 4,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#e2e8f0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownText: {
    color: '#4a5568',
    fontSize: 14,
  },
  placeholderText: {
    color: '#a0a0a0',
  },
  dropdownArrow: {
    color: '#4a6fa5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownOptions: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc',
  },
  optionText: {
    color: '#4a5568',
    fontSize: 14,
  },
  textArea: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#555',
    minHeight: 100,
    textAlignVertical: 'top',
    shadowColor: '#e2e8f0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: '#4a6fa5',
    backgroundColor: '#f7fafc',
  },
  errorText: {
    color: '#4a6fa5',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '500',
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
    backgroundColor: '#e2e8f0',
  },
  dotActive: {
    backgroundColor: '#4a6fa5',
  },
  carouselText: {
    textAlign: 'center',
    color: '#4a5568',
    marginBottom: 24,
    fontWeight: '500',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#4a6fa5',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#cbd5e0',
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

export default TherapyHistoryPage;