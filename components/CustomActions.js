import { Text, TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const CustomActions = ({ iconTextStyle, name, onSend, storage, uid, wrapperStyle }) => {
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
    
    // Function to upload and send an image
    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        const newUploadRef = ref(storage, uniqueRefString);
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            console.log('File has been uploaded successfully');
            const imageURL = await getDownloadURL(snapshot.ref);
            const imageMessage = {
                user: { _id: uid, name },
                createdAt: new Date(),
                image: imageURL
            };
            onSend([imageMessage]);
          })
    }

    // Generate a reference for the image
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${uid}-${timeStamp}-${imageName}`;
      }

    // Allow user to pick a photo from their library
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Ask for permission to access the user's media library
        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (result?.assets?.length > 0) {
                await uploadAndSendImage(result.assets[0].uri);
            }
        } else {
            Alert.alert("Permission hasn't been granted.");
        }
    };

    // Allow user to take a photo with their camera
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync(); // Ask for permission to access the user's camera
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (result?.assets?.length > 0) {
                await uploadAndSendImage(result.assets[0].uri);
            }
        } else {
            Alert.alert("Permission hasn't been granted.");
        }
    };

    // Allow user to share their location
    const getLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                const locationMessage = {
                    user: { _id: uid, name },
                    createdAt: new Date(),
                    location: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                };
                onSend([locationMessage]); // Send the location as the message
            } else {
                Alert.alert("Permission hasn't been granted.");
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