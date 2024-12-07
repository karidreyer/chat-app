// import React & React Native components and Navigation
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { LogBox, Alert } from "react-native";

// Import functions from Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";

// Import the NetInfo hook for checking network status
import { useNetInfo }from '@react-native-community/netinfo';

// import components for the app
import Start from './components/Start.js';
import Chat from './components/Chat.js';

// Ignore the warning about AsyncStorage being extracted from react-native
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDB9SHjdoLlKjXAShZhrYNlUil3_faa2hg",
    authDomain: "chatapp-cb302.firebaseapp.com",
    projectId: "chatapp-cb302",
    storageBucket: "chatapp-cb302.firebasestorage.app",
    messagingSenderId: "299320074091",
    appId: "1:299320074091:web:cfd5090224b82fd4bcb62e"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    // Check the network status
    const connectionStatus = useNetInfo();  

    useEffect(() => {
      if (connectionStatus.isConnected === false) {
        Alert.alert("Connection Lost!");
        disableNetwork(db);
      } else if (connectionStatus.isConnected === true) {
        enableNetwork(db);
      }
    }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat">
            {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
