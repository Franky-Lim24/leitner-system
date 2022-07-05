import { StatusBar } from "expo-status-bar";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";


function AnswerScreen({ navigation }) {
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
          
          <Image source={require("../images/home.png")} />
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
              Sofia
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "35%",
              height: "80%",
              borderColor: "green",
              borderWidth: 1,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              color="black"
              title="Right"
              onPress={() => navigation.navigate("AnswerScreen")}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: "35%",
              height: "80%",
              borderColor: "red",
              borderWidth: 1,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              color="black"
              title="Wrong"
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

export default AnswerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7988fa",
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
