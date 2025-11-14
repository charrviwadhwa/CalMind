// app/employees-dash.jsx
import { Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function EmployeesDash() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF7F0" }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 , paddingTop: 50}}>
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
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#1F2937" }}>Nandita</Text>
              <Text style={{ color: "#D97706", marginTop: 4, fontSize: 14 }}>Aspiring Developer</Text>
            </View>
          </View>

          {/* Stats Row */}
          

         

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