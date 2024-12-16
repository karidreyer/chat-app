import { Alert,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNetInfo }from '@react-native-community/netinfo';

import Start from './components/Start.js';
import Chat from './components/Chat.js';


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
    const storage = getStorage(app);

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
            {props => <Chat 
              isConnected={connectionStatus.isConnected} 
              db={db} 
              storage={storage} 
              {...props}
            />}
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
