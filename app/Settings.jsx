// SettingsScreen.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
  Modal,
  ScrollView,
  Platform
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

// Define colors
const colors = {
  primary: '#E91E63',
  background: '#F8F9FA',
  text: '#333333',
  white: '#FFFFFF',
};

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  // Click handlers for other settings
  const handlePress = (item) => {
    Alert.alert(`${item} clicked`);
  };

  // Smilies for rating
  const smilies = ["😞", "😐", "🙂", "😊", "😁"];
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            // Add your logout logic here
            console.log("User logged out");
          }
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Notification */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => handlePress("Notification")}
        >
          <Ionicons name="notifications-outline" size={22} color={colors.primary} />
          <Text style={styles.label}>Notification</Text>
          <Switch
            trackColor={{ false: "#d3d3d3", true: "#FFB3D9" }}
            thumbColor={isEnabled ? colors.primary : "#696969"}
            onValueChange={() => setIsEnabled((prev) => !prev)}
            value={isEnabled}
          />
        </TouchableOpacity>

        {/* Dark Mode */}
        <View style={styles.row}>
          <Ionicons name="moon-outline" size={22} color={colors.primary} />
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#d3d3d3", true: "#FFB3D9" }}
            thumbColor={darkModeEnabled ? colors.primary : "#696969"}
            onValueChange={() => setDarkModeEnabled((prev) => !prev)}
            value={darkModeEnabled}
          />
        </View>

        {/* Rate App */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setRatingVisible(true)}
        >
          <Ionicons name="star-outline" size={22} color={colors.primary} />
          <Text style={styles.label}>Rate App</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Share App */}
        <TouchableOpacity style={styles.row} onPress={() => handlePress("Share App")}>
          <Ionicons name="share-social-outline" size={22} color={colors.primary} />
          <Text style={styles.label}>Share App</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity style={styles.row} onPress={() => handlePress("Privacy Policy")}>
          <Ionicons name="lock-closed-outline" size={22} color={colors.primary} />
          <Text style={styles.label}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Terms */}
        <TouchableOpacity style={styles.row} onPress={() => handlePress("Terms and Conditions")}>
          <Ionicons name="document-text-outline" size={22} color={colors.primary} />
          <Text style={styles.label}>Terms and Conditions</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Cookies Policy */}
        <TouchableOpacity style={styles.row} onPress={() => handlePress("Cookies Policy")}>
          <Ionicons name="document-outline" size={22} color={colors.primary} />
          <Text style={styles.label}>Cookies Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Contact */}
        <TouchableOpacity style={styles.row} onPress={() => handlePress("Contact")}>
          <Ionicons name="mail-outline" size={22} color={colors.primary} />
          <Text style={styles.label}>Contact</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Feedback */}
        <TouchableOpacity style={styles.row} onPress={() => handlePress("Feedback")}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color={colors.primary} />
          <Text style={styles.label}>Feedback</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.row}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="red" /> 
          <Text style={[styles.label, styles.logoutLabel]}>Logout</Text>
        </TouchableOpacity>

        {/* Add bottom padding to account for floating navbar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Rating Dialog */}
      <Modal
        transparent={true}
        visible={ratingVisible}
        animationType="fade"
        onRequestClose={() => setRatingVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.dialogBox}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setRatingVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.dialogTitle}>Rate Our App</Text>

            {/* Smilies */}
            <View style={styles.smiliesRow}>
              {smilies.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.smileyContainer,
                    selectedRating === index + 1 && styles.selectedSmiley,
                  ]}
                  onPress={() => setSelectedRating(index + 1)}
                >
                  <Text style={styles.smiley}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Buttons */}
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setRatingVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => {
                  if (selectedRating) {
                    Alert.alert("Thank you!", `You rated ${selectedRating}/5`);
                    setRatingVisible(false);
                    setSelectedRating(null);
                  } else {
                    Alert.alert("Please select a rating");
                  }
                }}
              >
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: 10,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: colors.text,
  },
  bottomPadding: {
    height: 120, // Increased to account for floating navbar
  },
  // Rating dialog styles
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  smiliesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 25,
  },
  smileyContainer: {
    padding: 8,
    borderRadius: 8,
  },
  selectedSmiley: {
    backgroundColor: "#FFB3D9",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  smiley: {
    fontSize: 28,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#555",
    fontSize: 16,
  },
  submitBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutLabel: {
    color: "red",
    fontWeight: "600",
  },
});

export default SettingsScreen;