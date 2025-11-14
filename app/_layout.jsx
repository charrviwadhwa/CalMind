// app/_layout.jsx
<<<<<<< HEAD
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


// Import only the pages that actually exist
import About from './about';
import CompletionPage from './CompletionPage';
import EmployeesDash from './EmployeesDash';
import GuardianPage from './GuardianPage';
import Home from './home';
import Meet from './meet';
import Sessions from './sessions';
import SpotifyPreferencesPage from './SpotifyPreferencesPage';
import SuggestionPage from './SuggestionPage';
import TherapyHistoryPage from './TherapyHistoryPage';
import UserPage from './UserPage';
import MeditationScreen from './meditation';
import SettingsScreen from './Settings';
import ForumsPage from './ForumsPage';
import BreathingTimer from './breathing-timer';
import JournalFoldersScreen from './journaling';
=======
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
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed

const Tab = createBottomTabNavigator();
const StackNav = createStackNavigator();

// Colors defined locally
const Colors = {
<<<<<<< HEAD
  primary: '#E91E63', // Pink color matching the image
=======
  primary: '#4A90E2',
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
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
<<<<<<< HEAD
        headerShown: false
=======
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
      }}
    >
      <StackNav.Screen name="HomeMain" component={Home} options={{ title: 'Wellness Home' }} />
      <StackNav.Screen name="About" component={About} options={{ title: 'About Us' }} />
<<<<<<< HEAD
      <StackNav.Screen name="BreathingTimer" component={BreathingTimer} options={{ title: 'Breathing Exercises' }} />
      <StackNav.Screen name="Journaling" component={JournalFoldersScreen} options={{ title: 'Journaling' }} />
      <StackNav.Screen name="Meditation" component={MeditationScreen} options={{ title: 'Meditation' }} />
=======
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
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
<<<<<<< HEAD
        headerShown: false
=======
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
      }}
    >
      <StackNav.Screen name="SessionsMain" component={Sessions} options={{ title: 'Therapy Sessions' }} />
      <StackNav.Screen name="TherapyHistory" component={TherapyHistoryPage} options={{ title: 'Session History' }} />
      <StackNav.Screen name="Completion" component={CompletionPage} options={{ title: 'Session Complete' }} />
      <StackNav.Screen name="Suggestion" component={SuggestionPage} options={{ title: 'Suggestions' }} />
<<<<<<< HEAD
      <StackNav.Screen name="Meet" component={Meet} />

=======
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
    </StackNav.Navigator>
  );
}

<<<<<<< HEAD
// Forums Stack (using Meet as placeholder)
function ForumsStack() {
=======
// Meet Stack
function MeetStack() {
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
  return (
    <StackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
<<<<<<< HEAD
        headerShown: false
      }}
    >
      <StackNav.Screen name="ForumsMain" component={ForumsPage} options={{ title: 'Forums' }} />
=======
      }}
    >
      <StackNav.Screen name="MeetMain" component={Meet} options={{ title: 'Video Consultation' }} />
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
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
<<<<<<< HEAD
        headerShown: false
      }}
    >
      <StackNav.Screen name="UserProfile" component={EmployeesDash} options={{ title: 'My Profile' }} />
=======
      }}
    >
      <StackNav.Screen name="UserProfile" component={UserPage} options={{ title: 'My Profile' }} />
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
      <StackNav.Screen name="Guardian" component={GuardianPage} options={{ title: 'Guardian Settings' }} />
      <StackNav.Screen name="SpotifyPreferences" component={SpotifyPreferencesPage} options={{ title: 'Music Preferences' }} />
    </StackNav.Navigator>
  );
}

<<<<<<< HEAD
// Settings Stack (using About as placeholder)
function SettingsStack() {
  return (
    <StackNav.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: false
      }}
    >
      <StackNav.Screen name="SettingsMain" component={SettingsScreen} options={{ title: 'Settings' }} />
    </StackNav.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  // List of subpage routes that should hide the tab bar
  const subpageRoutes = {
    Home: ['BreathingTimer', 'Journaling', 'Meditation', 'About'],
    Sessions: ['TherapyHistory', 'Completion', 'Suggestion', 'Meet'],
    Forums: ['EmployeesDash'],
    Profile: ['Guardian', 'SpotifyPreferences'],
    Settings: [], // No subpages in Settings
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        // Get the focused route name from the nested stack
        const routeName = getFocusedRouteNameFromRoute(route);
        
        // Check if current screen is a subpage
        // If routeName exists and is in the subpageRoutes list for this tab, hide the tab bar
        const isSubpage = routeName && subpageRoutes[route.name]?.includes(routeName);
        
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Sessions') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Forums') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: '#9E9E9E',
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 8,
            backgroundColor: '#FFFFFF',
            borderRadius: 25,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            borderTopWidth: 0,
            display: isSubpage ? 'none' : 'flex', // Hide tab bar on subpages
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
          headerShown: false,
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Sessions" component={SessionsStack} />
      <Tab.Screen name="Forums" component={ForumsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
=======
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
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
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
<<<<<<< HEAD
      initialRouteName="Onboarding" // Set to "Onboarding" to show onboarding first
    >
      <StackNav.Screen name="Onboarding" component={OnboardingStack} />
      <StackNav.Screen name="MainApp" component={MainTabs} />
      
=======
      initialRouteName="MainApp" // Set to "Onboarding" to show onboarding first
    >
      <StackNav.Screen name="Onboarding" component={OnboardingStack} />
      <StackNav.Screen name="MainApp" component={MainTabs} />
>>>>>>> 310b82bbb10428cd64b621ecbb86f34ccc1a2bed
    </StackNav.Navigator>
  );
}