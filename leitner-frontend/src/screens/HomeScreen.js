import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Button
        color="black"
        title="Show Answer"
        onPress={() => this.props.navigation.navigate('QuestionScreen')}
      />
      <Text>home screen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
