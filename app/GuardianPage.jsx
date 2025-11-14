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

const GuardianPage = ({ navigation }) => {
  const [guardians, setGuardians] = useState([]);
  const [currentGuardian, setCurrentGuardian] = useState({
    name: '',
    phoneNumber: '',
    relationship: ''
  });
  const [currentSlide] = useState(2);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentGuardian.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!currentGuardian.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(currentGuardian.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!currentGuardian.relationship.trim()) {
      newErrors.relationship = 'Relationship is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setCurrentGuardian(prev => ({
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

  const handleAddGuardian = () => {
    if (validateForm()) {
      setGuardians(prev => [...prev, { ...currentGuardian, id: Date.now() }]);
      setCurrentGuardian({
        name: '',
        phoneNumber: '',
        relationship: ''
      });
      setErrors({});
      
    }
  };

  const handleRemoveGuardian = (id) => {
    setGuardians(prev => prev.filter(guardian => guardian.id !== id));
  };

  const handleNext = () => {
    if (guardians.length > 0) {
      
      navigation.navigate('TherapyHistoryPage');
    }
  };

  const isNextDisabled = guardians.length === 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Guardian Information</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.guardianBox}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Add Guardian</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddGuardian}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/undraw_true-friends_1h3v.png')}
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
              value={currentGuardian.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Enter guardian's full name"
              placeholderTextColor="#999"
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
              value={currentGuardian.phoneNumber}
              onChangeText={(text) => handleInputChange('phoneNumber', text)}
              placeholder="Enter phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Relationship</Text>
            <TextInput
              style={[
                styles.input,
                errors.relationship && styles.inputError
              ]}
              value={currentGuardian.relationship}
              onChangeText={(text) => handleInputChange('relationship', text)}
              placeholder="e.g., Parent, Grandparent, etc."
              placeholderTextColor="#999"
            />
            {errors.relationship && <Text style={styles.errorText}>{errors.relationship}</Text>}
          </View>
        </View>

        {guardians.length > 0 && (
          <View style={styles.addedGuardians}>
            <Text style={styles.addedTitle}>Added Guardians</Text>
            {guardians.map((guardian, index) => (
              <View key={guardian.id} style={styles.guardianItem}>
                <View style={styles.guardianInfo}>
                  <Text style={styles.guardianName}>{guardian.name}</Text>
                  <Text style={styles.guardianDetails}>
                    {guardian.relationship} • {guardian.phoneNumber}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveGuardian(guardian.id)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

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
          style={[
            styles.nextButton,
            isNextDisabled && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={isNextDisabled}
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
    backgroundColor: '#f5e6d3',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    padding: 10,
    marginRight: 15,
  },
  backArrow: {
    fontSize: 24,
    color: '#8b7355',
    fontWeight: 'bold',
  },
  title: {
    color: '#6b5b45',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  guardianBox: {
    backgroundColor: '#fffaf0',
    borderWidth: 2,
    borderColor: '#e8d9c5',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  boxTitle: {
    color: '#6b5b45',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#8b7355',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  image: {
    width: 120,
    height: 80,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#6b5b45',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e8d9c5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 5,
  },
  addedGuardians: {
    marginBottom: 25,
    backgroundColor: '#fffaf0',
    borderWidth: 2,
    borderColor: '#e8d9c5',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addedTitle: {
    color: '#6b5b45',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  guardianItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8d9c5',
  },
  guardianInfo: {
    flex: 1,
  },
  guardianName: {
    color: '#6b5b45',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  guardianDetails: {
    color: '#8b7355',
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
    marginLeft: 10,
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#d32f2f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e8d9c5',
  },
  dotActive: {
    backgroundColor: '#8b7355',
  },
  carouselText: {
    textAlign: 'center',
    color: '#6b5b45',
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#8b7355',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  nextButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GuardianPage;