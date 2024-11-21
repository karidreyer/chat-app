import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params; // Extract name and backgroundColor from the Start screen's route params

    useEffect(() => {
        navigation.setOptions({ title: name }); // Update the title in the navigation bar to the user's name as entered on the Start screen
      }, []);

 return (
   // Set the background color to the color chosen on the Start screen
   <View style={[styles.container, {backgroundColor}]}> 
     <Text>This is the Chat Screen - in progress</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;