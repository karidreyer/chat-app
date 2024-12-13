// Import necessary libraries and dependencies
import { Text, TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

// Create a function to handle the custom actions options
const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {
    const actionSheet = useActionSheet();
    
    //display a menu with options (take photo, select photo, share location)
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            },
        );
    };

    // Allow user to pick a photo from their library
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Ask for permission to access the user's media library
  
        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
  
            if (!result.canceled) {
                console.log('uploading and uploading the image occurs here');
              } else Alert.alert("Permission hasn't been granted.");
        }
    };

    // Allow user to take a photo with their camera
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync(); // Ask for permission to access the user's camera
    
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
    
            if (!result.canceled) {
                console.log('uploading and uploading the image occurs here');
              } else Alert.alert("Permission hasn't been granted.");
        }
    };

    // Allow user to share their location
    // const getLocation = async () => {
    //     let permissions = await Location.requestForegroundPermissionsAsync(); // Ask for permission to access the user's location
    //     if (permissions?.granted) {
    //         const location = await Location.getCurrentPositionAsync({});
    //         if (location) {
    //             onSend({
    //                 location: {
    //                     longitude: location.coords.longitude,
    //                     latitude: location.coords.latitude,
    //                 },
    //             });
    //         } else Alert.alert("Error occurred while fetching location");
    //     } else Alert.alert("Permission hasn't been granted.");
    // };

    const getLocation = async () => {
        console.log("getLocation triggered"); // Debugging
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            console.log("Permission status:", status); // Log permission status
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                console.log("Location fetched:", location); // Log the location data
                const locationMessage = {
                    location: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                };
                onSend([locationMessage]); // Send the location as the message
                console.log("Location message sent:", locationMessage);
            } else {
                console.log("Permission denied");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    return (
        <TouchableOpacity 
            accessible={true}
            accessibilityLabel="More options"
            accessibilityHint="Choose to send an image, take a photo, or send your location."
            accessibilityRole="button"
            style={styles.container} 
            onPress={onActionPress}
        >
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;