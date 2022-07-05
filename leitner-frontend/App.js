import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen.js";
// import AnswerScreen from "./src/screens/AnswerScreen.js";
// import QuestionScreen from "./src/screens/QuestionScreen.js";
import ScheduleScreen from "./src/screens/ScheduleScreen.js";
import SignInScreen from "./src/screens/SignInScreen.js";
import SignUpScreen from "./src/screens/SignUpScreen.js";
import SplashScreen from "./src/screens/SplashScreen.js"


const Stack  = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{headerShown:false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      {/* <Stack.Screen name="Schedule" component={ScheduleScreen} /> */}
      {/* <Stack.Screen name="FlashCardQuestion" component={QuestionScreen} />
      <Stack.Screen name="FlashCardAnswer" component={AnswerScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
