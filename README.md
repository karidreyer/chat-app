# Chat App

## Overview
The Chat App is a student project, built using **React Native** and **Expo** to develop modern mobile development skills with a focus on functionality and user experience. The app allows users to communicate with friends and family, offering features like sending text messages, images, and location sharing, with offline support and accessibility for visually impaired users.

---

## Features and User Stories
### User Stories
- **Join a chat room**: As a new user, I can easily enter a chat room to start talking to my friends and family.
- **Send messages**: I can send text messages to exchange news with my contacts.
- **Share images**: I can send pictures to show what I’m currently doing.
- **Share location**: I can share my location to let others know where I am.
- **Offline access**: I can read past messages offline.
- **Screen reader compatibility**: As a visually impaired user, I can use the app with a screen reader.

### Key Features
- Enter a name and choose a background color before starting a chat.
- Engage in conversations through an intuitive chat interface.
- Send images (from the library or camera) and location data.
- Store chat data online and offline.
- Ensure accessibility for visually impaired users.

---

## Technical Requirements
- Written in **React Native** and developed using **Expo**.
- Styled following the provided screen design.
- Chat conversations stored in **Google Firestore Database**.
- User authentication via **Firebase anonymous authentication**.
- Images stored in **Firebase Cloud Storage**.
- Local data storage for offline access.
- Ability to send:
  - **Images**: From the phone’s library or camera.
  - **Location**: Displayed in a map view.
- Built using the **Gifted Chat** library.
- Thoroughly commented codebase.

---

## Setup Instructions

### Development Environment
To set up the development environment, follow these steps:

1. **Install Node.js**: Ensure you have Node.js installed on your system. [Download Node.js](https://nodejs.org/)
2. **Install Expo CLI**: Install Expo CLI globally by running:
   ```bash
   npm install -g expo-cli
   ```
3. **Clone the Repository**: Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   cd chat-app
   ```
4. **Install Dependencies**: Install the required libraries and dependencies:
   ```bash
   npm install
   ```
5. **Setup Android/iOS Simulators**:
   - **Android**: Install [Android Studio](https://developer.android.com/studio) and configure the Android Virtual Device (AVD).
   - **iOS**: Use Xcode’s iOS Simulator (Mac only).
6. **Run the App**: Start the development server and run the app:
   ```bash
   expo start
   ```
   Open the app in your desired simulator or Expo Go app.

### Database Configuration
This app uses **Google Firestore Database** for storing chat data. Follow these steps to set up the database:

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Enable Firestore**:
   - In the Firebase project dashboard, enable Firestore Database and set up necessary collections (e.g., `messages`).
3. **Enable Authentication**:
   - Go to the Authentication section and enable **Anonymous Authentication**.
4. **Set up Cloud Storage**:
   - Enable Firebase Cloud Storage for storing images.
5. **Add Firebase Config**:
   - Add the Firebase configuration to the app:
     - Create a `firebaseConfig.js` file in the project root.
     - Add your Firebase project’s configuration object:
       ```javascript
       export const firebaseConfig = {
         apiKey: "<your-api-key>",
         authDomain: "<your-auth-domain>",
         projectId: "<your-project-id>",
         storageBucket: "<your-storage-bucket>",
         messagingSenderId: "<your-messaging-sender-id>",
         appId: "<your-app-id>",
       };
       ```

### Necessary Libraries
The app relies on the following key libraries:

- **@react-native-async-storage/async-storage**: For storing data locally.
  ```bash
  npm install @react-native-async-storage/async-storage
  ```
- **@react-native-community/netinfo**: For network connectivity information.
  ```bash
  npm install @react-native-community/netinfo
  ```
- **@react-navigation/native**: For navigation.
  ```bash
  npm install @react-navigation/native
  ```
  Install required peer dependencies:
  ```bash
  npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-get-random-values react-native-vector-icons
  ```
- **@react-navigation/native-stack**: For stack navigation.
  ```bash
  npm install @react-navigation/native-stack
  ```
- **expo**: Development environment and platform for React Native.
  (Installed with `expo init`)
- **expo-image-picker**: To pick images from the library or camera.
  ```bash
  npm install expo-image-picker
  ```
- **expo-location**: To fetch and share location data.
  ```bash
  npm install expo-location
  ```
- **expo-status-bar**: For managing the app’s status bar.
  ```bash
  npm install expo-status-bar
  ```
- **firebase**: Backend for authentication, database, and storage.
  ```bash
  npm install firebase
  ```
- **react-native**: Framework for building mobile apps.
  (Installed with `expo init`)
- **react-native-gifted-chat**: Prebuilt chat UI components.
  ```bash
  npm install react-native-gifted-chat
  ```
- **react-native-maps**: To display location data on a map.
  ```bash
  npm install react-native-maps
  ```
- **react-native-safe-area-context**: For handling safe area insets.
  ```bash
  npm install react-native-safe-area-context
  ```
- **react-native-screens**: For improved navigation performance.
  ```bash
  npm install react-native-screens
  ```
- **@babel/core**: Development dependency for compiling JavaScript code.
  ```bash
  npm install --save-dev @babel/core
  ```

To install all necessary libraries at once, you can also run:
```bash
npm install
```

You can find a complete list of dependencies in the `package.json` file.
