// app/_layout.jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import only the pages that actually exist
import Home from './home';
import Sessions from './sessions';
import Meet from './meet';
import GuardianPage from './GuardianPage';
import UserPage from './UserPage';
import TherapyHistoryPage from './TherapyHistoryPage';
import SpotifyPreferencesPage from './SpotifyPreferencesPage';
import CompletionPage from './CompletionPage';
import About from './about';
import EmployeesDash from './EmployeesDash';
import SuggestionPage from './SuggestionPage';

const Tab = createBottomTabNavigator();
const StackNav = createStackNavigator();

// Colors defined locally
const Colors = {
  primary: '#4A90E2',
  background: '#F8F9FA',
};

// Onboarding Stack
function OnboardingStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNav.Screen name="UserPage" component={UserPage} />
      <StackNav.Screen name="GuardianPage" component={GuardianPage} />
      <StackNav.Screen name="TherapyHistoryPage" component={TherapyHistoryPage} />
      <StackNav.Screen name="SpotifyPreferencesPage" component={SpotifyPreferencesPage} />
      <StackNav.Screen name="CompletionPage" component={CompletionPage} />
    </StackNav.Navigator>
  );
}

// Home Stack
function HomeStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <StackNav.Screen name="HomeMain" component={Home} options={{ title: 'Wellness Home' }} />
      <StackNav.Screen name="About" component={About} options={{ title: 'About Us' }} />
    </StackNav.Navigator>
  );
}

// Sessions Stack
function SessionsStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <StackNav.Screen name="SessionsMain" component={Sessions} options={{ title: 'Therapy Sessions' }} />
      <StackNav.Screen name="TherapyHistory" component={TherapyHistoryPage} options={{ title: 'Session History' }} />
      <StackNav.Screen name="Completion" component={CompletionPage} options={{ title: 'Session Complete' }} />
      <StackNav.Screen name="Suggestion" component={SuggestionPage} options={{ title: 'Suggestions' }} />
    </StackNav.Navigator>
  );
}

// Meet Stack
function MeetStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <StackNav.Screen name="MeetMain" component={Meet} options={{ title: 'Video Consultation' }} />
      <StackNav.Screen name="EmployeesDash" component={EmployeesDash} options={{ title: 'Employee Dashboard' }} />
    </StackNav.Navigator>
  );
}

// Profile Stack
function ProfileStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <StackNav.Screen name="UserProfile" component={UserPage} options={{ title: 'My Profile' }} />
      <StackNav.Screen name="Guardian" component={GuardianPage} options={{ title: 'Guardian Settings' }} />
      <StackNav.Screen name="SpotifyPreferences" component={SpotifyPreferencesPage} options={{ title: 'Music Preferences' }} />
    </StackNav.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Sessions') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Meet') {
            iconName = focused ? 'videocam' : 'videocam-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Sessions" component={SessionsStack} />
      <Tab.Screen name="Meet" component={MeetStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Root Layout - REMOVED NavigationContainer wrapper
export default function RootLayout() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="MainApp" // Set to "Onboarding" to show onboarding first
    >
      <StackNav.Screen name="Onboarding" component={OnboardingStack} />
      <StackNav.Screen name="MainApp" component={MainTabs} />
    </StackNav.Navigator>
  );
}