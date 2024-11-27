// Import necessary components from React and React Native
import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
	const { name, backgroundColor, uid } = route.params; // Extract name and backgroundColor from the Start screen's route params
  	const [messages, setMessages] = useState([]); // State to hold the chat messages

  	const onSend = (newMessages) => {
    	addDoc(collection(db, "messages"), newMessages[0])
  	}

  	useEffect(() => {
		navigation.setOptions({ title: name }); // Update the title in the navigation bar to the user's name as entered on the Start screen
		
		const q = query(collection(db, "messages"), orderBy("createdAt", "desc")); // Query to get messages from Firestore
		
		// Subscribe to the query and update the messages state, unsubscribe when the component unmounts
		const unsubMessages = onSnapshot(q, (docs) => {
			let newMessages = [];
			docs.forEach(doc => {
			  	newMessages.push({
					id: doc.id,
					...doc.data(),
					createdAt: new Date(doc.data().createdAt.toMillis())
			  	})
			})
			setMessages(newMessages);
		})
		return () => {
			if (unsubMessages) unsubMessages();
		}
  	}, []);

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

 	return (
   		<View style={[styles.container, {backgroundColor}]}> 
     		<GiftedChat 
      			messages={messages}
				renderBubble={renderBubble}
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