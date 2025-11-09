import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Alert } from 'react-native';
// 1. Import Vapi SDK
import Vapi from '@vapi-ai/react-native'; 

// Replace with your actual Public Key
const VAPI_PUBLIC_KEY = 'a0bb08c0-e41d-45fb-97ee-eebb39300db9'; 
// Replace with your Assistant ID
const ASSISTANT_ID = 'c2929642-b8de-414e-a156-82ccf9c8fce5'; 

// 2. Initialize Vapi client outside the component (or use a ref)
const vapi = new Vapi(VAPI_PUBLIC_KEY);

const HomeScreen = () => {
  const [callStatus, setCallStatus] = useState('Disconnected');

  // --- Runtime Permission Request ---
  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        // ... (permission request details from previous step)
        {
          title: "Microphone Permission",
          message: "Vapi needs access to your microphone to start the call.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Microphone permission granted");
        return true;
      } else {
        Alert.alert("Permission Denied", "Cannot start call without microphone access.");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // --- Vapi Call Handlers ---
  const handleStartCall = async () => {
    const hasPermission = await requestPermissions();
    if (hasPermission) {
      setCallStatus('Connecting...');
      try {
        // 4. Start the call with the Assistant ID
        await vapi.start(ASSISTANT_ID); 
      } catch (error) {
        console.error('Failed to start call:', error);
        setCallStatus('Error');
      }
    }
  };

  const handleStopCall = () => {
    // 5. Stop the call
    vapi.stop(); 
  };
  
  // --- Vapi Event Listeners (using useEffect for setup) ---
  useEffect(() => {
    // 3. Set up event listeners on mount
    const handleCallStart = () => {
      setCallStatus('In Call');
      console.log('Call started');
    };

    const handleCallEnd = () => {
      setCallStatus('Disconnected');
      console.log('Call ended');
    };

    const handleError = (error) => {
      console.error('Vapi error:', error);
      setCallStatus('Error');
    };

    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('error', handleError);
    
    // Clean up event listeners on unmount
    return () => {
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('error', handleError);
    };
  }, []); // Run only once on component mount

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Vapi Status: {callStatus}</Text>
      <Button title="Start Vapi Call" onPress={handleStartCall} disabled={callStatus === 'In Call'} />
      <View style={{ height: 10 }} />
      <Button title="Stop Vapi Call" onPress={handleStopCall} disabled={callStatus !== 'In Call'} color="red" />
    </View>
  );
};

export default HomeScreen;