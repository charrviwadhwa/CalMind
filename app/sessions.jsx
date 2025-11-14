// app/sessions.jsx
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
const { height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

export default function Sessions() {
 const navigation = useNavigation();

  // Sample data for sessions
  const upcomingSessions = [
    {
      id: 1,
      type: "Video Call",
      title: "Weekly Check-in with Avana",
      date: "Tomorrow, 10:00 AM",
      duration: "30 mins",
      icon: "video-call",
      color: "#EA580C",
      status: "Scheduled"
    },
    {
      id: 2,
      type: "Chat Session",
      title: "Quick Mood Check",
      date: "Dec 15, 3:00 PM",
      duration: "15 mins",
      icon: "chat",
      color: "#0EA5E9",
      status: "Confirmed"
    }
  ];

  const pastSessions = [
    {
      id: 1,
      type: "Video Call",
      title: "Stress Management Session",
      date: "Dec 8, 2024",
      duration: "45 mins",
      icon: "video-call",
      color: "#EA580C",
      moodScore: 8,
      notes: "Focused on breathing techniques"
    },
    {
      id: 2,
      type: "Chat Session",
      title: "Quick Check-in",
      date: "Dec 5, 2024",
      duration: "20 mins",
      icon: "chat",
      color: "#0EA5E9",
      moodScore: 7,
      notes: "Discussed work-life balance"
    },
    {
      id: 3,
      type: "Video Call",
      title: "Weekly Review",
      date: "Nov 28, 2024",
      duration: "40 mins",
      icon: "video-call",
      color: "#EA580C",
      moodScore: 6,
      notes: "Progress on mindfulness practice"
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF7F0" }}>
      <ScrollView 
        contentContainerStyle={{ 
          paddingTop: 36, 
          paddingHorizontal: 16,
          paddingBottom: 120, // Increased for floating navbar
          minHeight: height - 80 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Create Sessions Section */}
        <View style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 4,
          marginBottom: 16,
        }}>
          <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 12, color: "#1F2937" }}>Create New Session</Text>
          
          {/* Meet Avana Section */}
          <View style={{ 
            backgroundColor: "#FFFBEB", 
            borderRadius: 14, 
            padding: 16, 
            marginBottom: 12,
            borderLeftWidth: 4,
            borderLeftColor: "#F59E0B"
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <View style={{ 
                width: 36, 
                height: 36, 
                borderRadius: 18, 
                backgroundColor: "#FEF3C7", 
                alignItems: "center", 
                justifyContent: "center",
                marginRight: 10
              }}>
                <Text style={{ fontSize: 18 }}>🤖</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700", fontSize: 15 }}>Meet Avana</Text>
                <Text style={{ color: "#92400E", fontSize: 11 }}>Your AI Wellness Companion</Text>
              </View>
            </View>
            <Text style={{ color: "#92400E", marginBottom: 14, fontSize: 13, lineHeight: 18 }}>
              Avana checks in on your mood and provides personalized exercises.
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Meet")}
              style={{
                backgroundColor: "#F59E0B",
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: "center",
                shadowColor: "#F59E0B",
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 3,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700", fontSize: 14 }}>Schedule with Avana</Text>
            </Pressable>
          </View>

          {/* Quick Sessions */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: "700", marginBottom: 10, fontSize: 15 }}>Quick Sessions</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
              <Pressable 
                onPress={() => navigation.navigate("Meet")}
                style={{
                  backgroundColor: "#FFF4E6",
                  flex: 1,
                  padding: 14,
                  borderRadius: 14,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.04,
                  shadowRadius: 4,
                  elevation: 2,
                  minHeight: 90,
                }}
              >
                <MaterialCommunityIcons name="chat" size={22} color="#EA580C" />
                <Text style={{ marginTop: 6, fontWeight: "600", color: "#EA580C", fontSize: 13 }}>Chat Session</Text>
                <Text style={{ fontSize: 11, color: "#9A3412", marginTop: 2 }}>Instant support</Text>
              </Pressable>
              <Pressable 
                onPress={() => navigation.navigate("Meet")}
                style={{
                  backgroundColor: "#FFF4E6",
                  flex: 1,
                  padding: 14,
                  borderRadius: 14,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.04,
                  shadowRadius: 4,
                  elevation: 2,
                  minHeight: 90,
                }}
              >
                <MaterialIcons name="video-call" size={22} color="#EA580C" />
                <Text style={{ marginTop: 6, fontWeight: "600", color: "#EA580C", fontSize: 13 }}>Video Call</Text>
                <Text style={{ fontSize: 11, color: "#9A3412", marginTop: 2 }}>Face-to-face</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Upcoming Sessions */}
        <View style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 4,
          marginBottom: 16,
        }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <Text style={{ fontWeight: "700", fontSize: 18, color: "#1F2937" }}>Upcoming Sessions</Text>
            <Text style={{ color: "#EA580C", fontWeight: "600", fontSize: 13 }}>{upcomingSessions.length} Scheduled</Text>
          </View>

          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <Pressable 
                key={session.id} 
                onPress={() => navigation.navigate("Meet")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#F8FAFC",
                  padding: 14,
                  borderRadius: 14,
                  marginBottom: 10,
                  borderLeftWidth: 4,
                  borderLeftColor: session.color
                }}
              >
                <View style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: 22, 
                  backgroundColor: `${session.color}15`, 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginRight: 12
                }}>
                  <MaterialIcons name={session.icon} size={20} color={session.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "600", fontSize: 14 }}>{session.title}</Text>
                  <Text style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>{session.date}</Text>
                  <Text style={{ color: "#6B7280", fontSize: 11 }}>{session.duration}</Text>
                </View>
                <View style={{ 
                  backgroundColor: "#DCFCE7", 
                  paddingHorizontal: 10, 
                  paddingVertical: 4, 
                  borderRadius: 10 
                }}>
                  <Text style={{ color: "#16A34A", fontSize: 11, fontWeight: "600" }}>{session.status}</Text>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={{ alignItems: "center", padding: 16 }}>
              <Ionicons name="calendar-outline" size={36} color="#D1D5DB" />
              <Text style={{ color: "#6B7280", marginTop: 6, fontSize: 13 }}>No upcoming sessions</Text>
            </View>
          )}
        </View>

        {/* Past Sessions with Wellness Reports */}
        <View style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 4,
          marginBottom: 16,
        }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <Text style={{ fontWeight: "700", fontSize: 18, color: "#1F2937" }}>Past Sessions</Text>
            <Text style={{ color: "#6B7280", fontWeight: "600", fontSize: 13 }}>{pastSessions.length} Completed</Text>
          </View>

          {pastSessions.map((session) => (
            <View key={session.id} style={{
              backgroundColor: "#F8FAFC",
              padding: 14,
              borderRadius: 14,
              marginBottom: 14,
              borderLeftWidth: 4,
              borderLeftColor: session.color
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <View style={{ 
                  width: 36, 
                  height: 36, 
                  borderRadius: 18, 
                  backgroundColor: `${session.color}15`, 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginRight: 10
                }}>
                  <MaterialIcons name={session.icon} size={18} color={session.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "600", fontSize: 14 }}>{session.title}</Text>
                  <Text style={{ color: "#6B7280", fontSize: 11 }}>{session.date} • {session.duration}</Text>
                </View>
              </View>

              {/* Wellness Report Mini */}
              <View style={{ 
                backgroundColor: "white", 
                padding: 12, 
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#E5E7EB"
              }}>
                <Text style={{ fontWeight: "600", marginBottom: 6, color: "#374151", fontSize: 13 }}>Session Summary</Text>
                
                <View style={{ flexDirection: "row", marginBottom: 6 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#6B7280", fontSize: 11 }}>Mood Score</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <Text style={{ fontWeight: "700", color: "#059669", fontSize: 12 }}>{session.moodScore}/10</Text>
                      <View style={{ 
                        width: 50, 
                        height: 5, 
                        backgroundColor: "#E5E7EB", 
                        borderRadius: 3, 
                        marginLeft: 6,
                        overflow: "hidden"
                      }}>
                        <View style={{ 
                          width: `${session.moodScore * 10}%`, 
                          height: "100%", 
                          backgroundColor: "#10B981",
                          borderRadius: 3
                        }} />
                      </View>
                    </View>
                  </View>
                </View>

                <Text style={{ color: "#6B7280", fontSize: 11, lineHeight: 14 }}>{session.notes}</Text>

                <Pressable
                  onPress={() => navigation.navigate("ReportDetail", { id: session.id })}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    paddingTop: 6,
                    borderTopWidth: 1,
                    borderTopColor: "#F3F4F6"
                  }}
                >
                  <Feather name="bar-chart" size={14} color="#0EA5E9" />
                  <Text style={{ color: "#0EA5E9", fontWeight: "600", marginLeft: 4, fontSize: 11 }}>
                    View Detailed Report
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}

          {/* Overall Wellness Report */}
          <View style={{ 
            backgroundColor: "#F0F9FF", 
            borderRadius: 14, 
            padding: 16,
            borderLeftWidth: 4,
            borderLeftColor: "#0EA5E9",
            marginTop: 12
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <Feather name="bar-chart" size={20} color="#0EA5E9" />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: "700", fontSize: 15 }}>Overall Wellness Report</Text>
                <Text style={{ color: "#0C4A6E", fontSize: 11 }}>Track your complete journey</Text>
              </View>
            </View>
            <Text style={{ color: "#0C4A6E", marginBottom: 14, fontSize: 13, lineHeight: 18 }}>
              View comprehensive analytics of your mood trends and progress.
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Reports")}
              style={{
                borderColor: "#0EA5E9",
                borderWidth: 1.5,
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: "rgba(14, 165, 233, 0.05)"
              }}
            >
              <Text style={{ color: "#0EA5E9", fontWeight: "700", fontSize: 14 }}>View Complete Reports</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}