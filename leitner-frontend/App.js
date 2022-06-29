import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen.js";

const Stack  = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
	  	<Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateBox" component={CreateScreen} />
      <Stack.Screen name="Scheduler" component={SchedulerScreen} />
      <Stack.Screen name="FlashCardQuestion" component={QuestionScreen} />
      <Stack.Screen name="FlashCardAnswer" component={AnswerScreen} />
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
