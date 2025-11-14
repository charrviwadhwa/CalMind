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

const UserPage = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phoneNumber: '',
    dob: ''
  });
  const [currentSlide] = useState(1);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!userInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!userInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(userInfo.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!userInfo.dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dobDate = new Date(userInfo.dob);
      const today = new Date();
      if (dobDate >= today) {
        newErrors.dob = 'Date of birth must be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      
      navigation.navigate('GuardianPage');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>User Information</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.userBox}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Personal Details</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/undraw_fall_zh0m.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                errors.name && styles.inputError
              ]}
              value={userInfo.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Enter your full name"
              placeholderTextColor="#a0a0a0"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[
                styles.input,
                errors.phoneNumber && styles.inputError
              ]}
              value={userInfo.phoneNumber}
              onChangeText={(text) => handleInputChange('phoneNumber', text)}
              placeholder="Enter your phone number"
              placeholderTextColor="#a0a0a0"
              keyboardType="phone-pad"
            />
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={[
                styles.input,
                errors.dob && styles.inputError
              ]}
              value={userInfo.dob}
              onChangeText={(text) => handleInputChange('dob', text)}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#a0a0a0"
            />
            {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
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
    backgroundColor: '#faf5f7',
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
    backgroundColor: '#f8f0f3',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backArrow: {
    fontSize: 20,
    color: '#c44569',
    fontWeight: 'bold',
  },
  title: {
    color: '#786a6f',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  userBox: {
    backgroundColor: '#fefefe',
    borderWidth: 1.5,
    borderColor: '#e8dce0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#d4b8c1',
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
    color: '#786a6f',
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
    color: '#786a6f',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e8dce0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#555',
    shadowColor: '#e8dce0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: '#c44569',
    backgroundColor: '#fdf6f8',
  },
  errorText: {
    color: '#c44569',
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
    backgroundColor: '#e8dce0',
  },
  dotActive: {
    backgroundColor: '#c44569',
  },
  carouselText: {
    textAlign: 'center',
    color: '#786a6f',
    marginBottom: 24,
    fontWeight: '500',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#c44569',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#d4b8c1',
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

export default UserPage;