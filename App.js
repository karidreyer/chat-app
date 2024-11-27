// import React Native components and Navigation
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import functions from Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import components for the app
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
            {props => <Chat db={db} {...props} />}
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
