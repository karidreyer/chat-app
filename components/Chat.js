// This is the Chat screen component. It will display the chat interface where users can send and receive messages.

import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
	const { name, backgroundColor } = route.params; // Extract name and backgroundColor from the Start screen's route params
  	const [messages, setMessages] = useState([]); // State to hold the chat messages

  	const onSend = (newMessages) => {
    	setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  	}

  	useEffect(() => {
		navigation.setOptions({ title: name }); // Update the title in the navigation bar to the user's name as entered on the Start screen
    	setMessages([
         	{	
            	_id: 1,
            	text: 'Hello!',
            	createdAt: new Date(),
            	user: {
               		_id: 2,
              		name: 'React Native',
              		avatar: 'https://placehold.co/140x140',
            	},
          	},
			{
				_id: 2,
				text: 'You have entered the chat!',
				createdAt: new Date(),
				system: true,
			},
    	]);
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
					_id: 1
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