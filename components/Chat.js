import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

import CustomActions from './CustomActions';


const Chat = ({ route, navigation, db, isConnected, storage }) => {
	const { name, backgroundColor, uid } = route.params; // Extract name and backgroundColor from the Start screen's route params
  	const [messages, setMessages] = useState([]); // State to hold the chat messagess

  	const onSend = (newMessages) => {
    	addDoc(collection(db, "messages"), newMessages[0])
  	}

	let unsubMessages;

  	useEffect(() => {
		if (isConnected === true) {
			if (unsubMessages) unsubMessages(); // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      		unsubMessages = null;
			navigation.setOptions({ title: name }); // Update the title in the navigation bar to the user's name as entered on the Start screen
			
			const q = query(collection(db, "messages"), orderBy("createdAt", "desc")); // Query to get messages from Firestore
			
			// Subscribe to the query and update the messages state, unsubscribe when the component unmounts
			unsubMessages = onSnapshot(q, (docs) => {
				let newMessages = [];
				docs.forEach(doc => {
					newMessages.push({
						_id: doc.id,
						...doc.data(),
						createdAt: new Date(doc.data().createdAt.toMillis())
					})
				});
				cacheMessages(newMessages);
				setMessages(newMessages);
			});
		} else loadCachedMessages();

		// Clean up the listener
		return () => {
			if (unsubMessages) unsubMessages();
		}
  	}, [isConnected]); // "isConnected" here is added as a dependency in order to re-run the effect when the connection status changes

	// Cache messages in AsyncStorage
	const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }
     // Load cached messages from AsyncStorage
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setLists(JSON.parse(cachedMessages));
    }

	// Customizing the chat bubble
	const renderBubble = (props) => {
		return <Bubble
			{...props}
			wrapperStyle={{
				right: {
				backgroundColor: "#000"
				},
				left: {
				backgroundColor: "#FFF"
				}
			}}
		/>
	}

	// Prevents the user from sending messages when offline
	const renderInputToolbar = (props) => {
		if (isConnected) return <InputToolbar {...props} />;
		else return null;
	   }

	// Create a custom actions component to allow users to take photos, choose images from the library, and share their location
	const renderCustomActions = (props) => {
		return (
			<CustomActions 
				onSend={onSend} 
				uid={uid} 
				name={name}
				storage={storage} 
				{...props} 
			/>
		);
	};

	// Create a custom view to display the user's location on a map
	const renderCustomView = (props) => {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<MapView
					style={{width: 150,
					height: 100,
					borderRadius: 13,
					margin: 3}}
					region={{
						latitude: currentMessage.location.latitude,
						longitude: currentMessage.location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	}

 	return (
   		<View style={[styles.container, {backgroundColor}]}> 
     		<GiftedChat 
      			messages={messages}
				renderBubble={renderBubble}
				renderInputToolbar={renderInputToolbar}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
				onSend={messages => onSend(messages)}
				user={{
					_id: uid,
					name: name,
				}}
     		/>
      		{/* Prevents keyboard from overlapping the input field */}
      		{Platform.OS === "ios" || Platform.OS === "android" ? (
        		<KeyboardAvoidingView
          			behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
          			keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0} // Adjust offset to prevent overlap
        		/>
      		) : null}
   		</View>
 	);
}

const styles = StyleSheet.create({
 	container: {
   		flex: 1
 	}
});

export default Chat;