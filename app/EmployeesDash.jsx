// app/employees-dash.jsx
import React from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';

export default function EmployeesDash() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF7F0" }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Welcome Header */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: "800", color: "#1F2937" }}>Welcome Back!</Text>
          <Text style={{ fontSize: 16, color: "#6B7280", marginTop: 4 }}>Your mental wellness journey matters</Text>
        </View>

        {/* Main Profile Card */}
        <View style={{
          backgroundColor: "white",
          borderRadius: 24,
          padding: 24,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 16,
          elevation: 6,
          marginBottom: 20,
        }}>
          {/* Avatar & Basic Info */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <View style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: "#FFEDD5", 
              alignItems: "center", 
              justifyContent: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/616/616408.png" }}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ marginLeft: 16, flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1F2937" }}>CalMind Wellness</Text>
              <Text style={{ color: "#D97706", marginTop: 4, fontSize: 14 }}>4.9 ★ (1200+ employee reviews)</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={{ 
            flexDirection: "row", 
            backgroundColor: "#FFF7ED", 
            borderRadius: 16, 
            padding: 16,
            marginBottom: 20 
          }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontWeight: "800", fontSize: 18, color: "#EA580C" }}>2 Years</Text>
              <Text style={{ color: "#9A3412", fontSize: 12 }}>Active Program</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center", borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#FDBA74" }}>
              <Text style={{ fontWeight: "800", fontSize: 18, color: "#EA580C" }}>Free</Text>
              <Text style={{ color: "#9A3412", fontSize: 12 }}>AI Check-ins</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontWeight: "800", fontSize: 18, color: "#EA580C" }}>180+</Text>
              <Text style={{ color: "#9A3412", fontSize: 12 }}>Sessions</Text>
            </View>
          </View>

          {/* About CalMind */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: "700", color: "#111827", marginBottom: 8, fontSize: 18 }}>About CalMind</Text>
            <Text style={{ color: "#4B5563", lineHeight: 22, fontSize: 14 }}>
              CalMind is specifically designed for employee mental wellness — providing a safe, confidential space 
              for you to prioritize your mental health. Our platform combines AI-powered support with professional 
              resources to help you navigate stress, build resilience, and maintain work-life balance.
            </Text>
          </View>

          {/* Avana AI Assistant Section */}
          <View style={{ 
            backgroundColor: "#FFFBEB", 
            borderRadius: 16, 
            padding: 18, 
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: "#F59E0B"
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <View style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                backgroundColor: "#FEF3C7", 
                alignItems: "center", 
                justifyContent: "center",
                marginRight: 12
              }}>
                <Text style={{ fontSize: 20 }}>🤖</Text>
              </View>
              <View>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>Meet Avana</Text>
                <Text style={{ color: "#92400E", fontSize: 12 }}>Your AI Wellness Companion</Text>
              </View>
            </View>
            <Text style={{ color: "#92400E", marginBottom: 16, fontSize: 14, lineHeight: 20 }}>
              Avana checks in on your mood, provides personalized exercises, and helps schedule sessions based on your emotional needs.
            </Text>
            <Pressable
              onPress={() => router.push("/avana-appointment")}
              style={{
                backgroundColor: "#F59E0B",
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                shadowColor: "#F59E0B",
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Schedule with Avana</Text>
            </Pressable>
          </View>

          {/* Quick Sessions */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: "700", marginBottom: 12, fontSize: 18 }}>Quick Sessions</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Pressable style={{
                backgroundColor: "#FFF4E6",
                flex: 1,
                marginRight: 8,
                padding: 16,
                borderRadius: 16,
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}>
                <MaterialCommunityIcons name="chat" size={26} color="#EA580C" />
                <Text style={{ marginTop: 8, fontWeight: "600", color: "#EA580C" }}>Chat Session</Text>
                <Text style={{ fontSize: 12, color: "#9A3412", marginTop: 4 }}>Instant support</Text>
              </Pressable>
              <Pressable style={{
                backgroundColor: "#FFF4E6",
                flex: 1,
                marginLeft: 8,
                padding: 16,
                borderRadius: 16,
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}>
                <MaterialIcons name="video-call" size={26} color="#EA580C" />
                <Text style={{ marginTop: 8, fontWeight: "600", color: "#EA580C" }}>Video Call</Text>
                <Text style={{ fontSize: 12, color: "#9A3412", marginTop: 4 }}>Face-to-face</Text>
              </Pressable>
            </View>
          </View>

          {/* Progress Reports */}
          <View style={{ 
            backgroundColor: "#F0F9FF", 
            borderRadius: 16, 
            padding: 18,
            borderLeftWidth: 4,
            borderLeftColor: "#0EA5E9"
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Feather name="bar-chart" size={24} color="#0EA5E9" />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>Wellness Reports</Text>
                <Text style={{ color: "#0C4A6E", fontSize: 12 }}>Track your progress</Text>
              </View>
            </View>
            <Text style={{ color: "#0C4A6E", marginBottom: 16, fontSize: 14, lineHeight: 20 }}>
              Monitor your mood trends, session history, and overall wellbeing score over time.
            </Text>
            <Pressable
              onPress={() => router.push("/reports")}
              style={{
                borderColor: "#0EA5E9",
                borderWidth: 1.5,
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: "center",
                backgroundColor: "rgba(14, 165, 233, 0.05)"
              }}
            >
              <Text style={{ color: "#0EA5E9", fontWeight: "700", fontSize: 15 }}>View My Reports</Text>
            </Pressable>
          </View>
        </View>

        {/* Upcoming Sessions Preview */}
        <View style={{
          backgroundColor: "white",
          borderRadius: 24,
          padding: 24,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 16,
          elevation: 6,
        }}>
          <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 16 }}>Upcoming Sessions</Text>
          
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <View style={{ 
              width: 50, 
              height: 50, 
              borderRadius: 25, 
              backgroundColor: "#DCFCE7", 
              alignItems: "center", 
              justifyContent: "center",
              marginRight: 12
            }}>
              <MaterialCommunityIcons name="calendar-check" size={24} color="#16A34A" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "600" }}>Weekly Check-in</Text>
              <Text style={{ color: "#6B7280", fontSize: 12 }}>Tomorrow, 10:00 AM</Text>
            </View>
            <View style={{ 
              backgroundColor: "#DCFCE7", 
              paddingHorizontal: 12, 
              paddingVertical: 6, 
              borderRadius: 12 
            }}>
              <Text style={{ color: "#16A34A", fontSize: 12, fontWeight: "600" }}>Scheduled</Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push("/sessions")}
            style={{
              borderColor: "#E5E7EB",
              borderWidth: 1,
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#6B7280", fontWeight: "600" }}>View All Sessions</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
      }}>
        <Link href="/employees-dash" asChild>
          <Pressable style={{ alignItems: "center", paddingHorizontal: 8 }}>
            <FontAwesome5 name="home" size={20} color="#EA580C" />
            <Text style={{ color: "#EA580C", fontSize: 12, marginTop: 4 }}>Home</Text>
          </Pressable>
        </Link>

        <Link href="/sessions" asChild>
          <Pressable style={{ alignItems: "center", paddingHorizontal: 8 }}>
            <MaterialIcons name="calendar-today" size={20} color="#6B7280" />
            <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>Sessions</Text>
          </Pressable>
        </Link>

        <Link href="/forums" asChild>
          <Pressable style={{ alignItems: "center", paddingHorizontal: 8 }}>
            <MaterialCommunityIcons name="forum" size={20} color="#6B7280" />
            <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>Forums</Text>
          </Pressable>
        </Link>

        <Link href="/profile" asChild>
          <Pressable style={{ alignItems: "center", paddingHorizontal: 8 }}>
            <MaterialCommunityIcons name="account-circle" size={20} color="#6B7280" />
            <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>Profile</Text>
          </Pressable>
        </Link>

        <Link href="/settings" asChild>
          <Pressable style={{ alignItems: "center", paddingHorizontal: 8 }}>
            <MaterialIcons name="settings" size={20} color="#6B7280" />
            <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>Settings</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}