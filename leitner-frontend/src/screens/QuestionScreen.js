import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FlipCard from "react-native-flip-card";

function QuestionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          zIndex: 50,
          position: "absolute",
          marginTop: "15%",
          marginLeft: "5%",
        }}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Image source={require("./images/home.png")} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#7988fa",
          flex: 1.8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            color: "white",
          }}
        >
          Physics
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#94A0FB",
          zIndex: 100,
          width: "80%",
          height: 50,
          marginTop: 130,
          position: "absolute",
          alignSelf: "center",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            alert("Go to Previous Question?");
          }}
        >
          <Image source={require("./assets/21256.png")} />
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            textAlign: "center",
            fontSize: 25,
            color: "white",
          }}
        >
          Question 1/10
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 8.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "80%",
            height: "80%",
            borderColor: "black",
            borderWidth: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 40,
              //fontStyle: 'bold',
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            What is the Capital of Bulgaria?
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "70%",
            height: "80%",
            borderColor: "black",
            borderWidth: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            color="black"
            title="Show Answer"
            onPress={() => navigation.navigate("AnswerScreen")}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flex: 0.5,
        }}
      ></View>
    </SafeAreaView>
  );
}

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7988fa",
  },
});
