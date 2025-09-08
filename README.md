Auth App - React Native + Expo

Overview : 
This is a simple authentication app built using React Native, Expo and React Navigation. It includes Login, Signup and Home screens, auth state management using authcontext and navigation flow

Setup Instructions:
1. Clone the repo and go to the project folder:
   git clone https://github.com/Sherry81/auth-app-assessment
   cd auth-app-assessment

2. Install dependencies:
   npm install

3. Install required packages:
   npm install @react-navigation/native @react-navigation/native-stack
   expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-get-random-values
   expo install @react-native-async-storage/async-storage
   npm install react-native-toast-message

4. Start the app:
   npm start

5. Open the app in Expo Go by scanning the QR code.

Auth Flow:
- Signup: user data is saved and redirected to Login.
- Login: user is authenticated and redirected to Home.
- Logout: clears user and returns to Login.

Bonus Points:
- Password visibility toggle added
- Toast messages for success and error feedback
- TypeScript used for all files
