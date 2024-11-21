import { useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState(''); // State to hold the name input value
    const [backgroundColor, setBackgroundColor] = useState(''); // State to hold the chosen background color
    const bgColors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

    return (
        <View style={styles.appContainer}>
            <ImageBackground
                source={require("../assets/background-img.png")}
                style={styles.bgImage}
            >
                <Text style={styles.title}>Chatterly</Text>
                <View style={styles.inputContainer}>
                    {/* Name input */}
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Your Name'
                    />

                    {/* Background color selector */}
                    <Text style={styles.colorText}>Choose Background Color:</Text>
                    <View style={styles.colorContainer}>
                        {bgColors.map((color) => (
                            <View
                                key={color}
                                style={[
                                    styles.colorWrapper,
                                    backgroundColor === color && styles.selectedColorWrapper, // Apply border to wrapper
                                ]}
                            >
                                <TouchableOpacity
                                    style={[
                                        styles.colorOption,
                                        { backgroundColor: color },
                                    ]}
                                    onPress={() => setBackgroundColor(color)}
                                />
                            </View>
                        ))}
                    </View>

                    {/* "Start Chatting" button */}
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Start Chatting"
                        accessibilityHint="Lets you proceed to the next screen to start chatting"
                        accessibilityRole="Button"
                        style={styles.button}
                        onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor })}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#757083',
        padding: 15,
        width: '88%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    colorText: {
        fontSize: 16,
        fontWeight: "300",
        color: "#171717",
        marginBottom: 10,
      },
    colorContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: 20,
    },
    colorOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    colorWrapper: {
        padding: 5, // Add padding to create space for the border
        borderRadius: 30, // Match the `colorOption` border-radius + padding for perfect rounding
    },
    inputContainer: {
        backgroundColor: '#fff',
        bottom: '10%',
        borderColor: '#757083',
        justifyContent: 'space-between', // Evenly spaced vertically
        paddingVertical: 20,
        width: '88%',
        height: '44%',
        alignItems: 'center',
    },
    selectedColorWrapper: {
        borderWidth: 2,
        borderColor: "#757083",
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        fontColor: '#757083',
        fontOpacity: 50,
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15
    },
    title: {
        flex: 1,
        fontSize: 45, 
        fontWeight: '600', 
        color: '#fff',
        marginTop: "33%",
    }
});

export default Start;