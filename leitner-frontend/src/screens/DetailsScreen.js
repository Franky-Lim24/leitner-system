import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Keyboard,
  TextInput,
  FlatList,
  Animated,
} from "react-native";
import { Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { format } from "react-string-format"; //npm install
import axios from "axios";
import {CreateBox, CreateQuestions} from "../services/authService.js";

const baseURL = "https://heap-leitner.uc.r.appspot.com";

function DetailsScreen({ route, navigation }) {

  const {callAPI} = route.params;
  const createBoxes = (boxN, boxC) => {
    CreateBox({
      box_name: boxN,
      colour: boxC,
    })
    navigation.navigate("HomeScreen");
  };

  //keyboard stuff
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);




  //Questions stuff
  // const QuestionData = [
  //   { id: 1, Question: "Question", Answer: "Answer" },
  //   { id: 2, Question: "Question", Answer: "Answer" },
  //   { id: 3, Question: "Question", Answer: "Answer" },
  // ];

  const createQuestions = (question) => {
    CreateQuestions({
      box_name: boxN,
      colour: boxC,
    })
  };

  const Question = ({ id, Question, Answer }) => (
    <View
      style={[
        styles.Whitebox,
        styles.shadowProp,
        { width: 320, height: 150, marginVertical: 8 },
      ]}
    >
      <View style={{ position: "relative", left: 15, top: 10, width: 285 }}>
        <TextInput
          style={[
            styles.Body,
            {
              fontWeight: "bold",
              fontSize: 17,
              flexWrap: "wrap",
              overflow: "hidden",
            },
          ]}
          placeholder="Question"
          placeholderTextColor="black"
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      <Text
        style={[
          styles.Body,
          { position: "absolute", left: 15, top: 20, color: "lightgrey" },
        ]}
      >
        ____________________________________
      </Text>
      <View
        style={[
          styles.Whitebox,
          {
            borderColor: "#D9D9D9",
            borderWidth: 1,
            width: 290,
            height: 85,
            top: 30,
            left: 15,
          },
        ]}
      >
        <TextInput
          style={[
            styles.Body,
            {
              color: "grey",
              flexWrap: "wrap",
              overflow: "scroll",
              marginHorizontal: 5,
            },
          ]}
          placeholder="Answer"
          onSubmitEditing={Keyboard.dismiss}
          multiline={true}
        />
      </View>
    </View>
  );

  const renderQuestion = ({ item }) => (
    <Question
      title={item.title}
      DayCount={item.DayCount}
      DueDate={item.DueDate}
    />
  );

  //creating a box stuff
  const [boxName, setBoxName] = useState("");

  async function createBox(boxName) {
    await CreateBox(boxName);
    console.log(boxName + "created");

  }


  async function doneButtonPressed() {
    console.log("doneButtonPressed");
    await createBox(boxName);
    alert(JSON.stringify(boxName) + "created" + "async ran");
    navigation.push("HomeScreen");
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss;
    console.log("dismissKeyboard");

  }

  const saveUserInput = (value) => {
    console.log(value);
    setBoxName(value);
    callAPI();
    console.log("saveuserinput");

  }

  const userMakesBoxName = (value) => {
    console.log("usermakesboxname1");
    console.log(value.nativeEvent.text);

    saveUserInput(value.nativeEvent.text);
    dismissKeyboard();
    console.log('usernamemakesboxname2');
  }


  return (
    <SafeAreaView style={styles.Background}>
      <TouchableOpacity
        style={{ position: "absolute", top: 60, left: 35 }}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="home" type="simple-line-icon" color="#FFFFFF" size={30} />
      </TouchableOpacity>

      <View style={{ height: 50, width: 200, top: 60 }}>
        <TextInput
          style={[styles.Title, { flexWrap: "wrap", overflow: "hidden", textAlign: "center" }]}          
          placeholder="Untitled Box"
          placeholderTextColor="white"
          onSubmitEditing= {(value) => userMakesBoxName(value)}
        />
      </View>

      <View style={[styles.BackgroundRectangle]}>
        {/* <Text style={[styles.Body, {fontSize: 17, position:"absolute", left: 35, top: 30, color:"grey"}]}>
            Box  
          </Text>
          <Text style={[styles.Body, {fontSize: 17, position:"absolute", left: 35, top: 51, color:"grey"}]}>
            Colour: 
          </Text>

          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#FF6F6F", position:"absolute", left: 120, top: 30}]}/>
          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#56BA60", position:"absolute", left: 170, top: 30}]}/>
          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#EFDD85", position:"absolute", left: 220, top: 30}]}/>
          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#799DFA", position:"absolute", left: 270, top: 30}]}/>
          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#D879FA", position:"absolute", left: 320, top: 30}]}/> */}

        {/* <Text style={[styles.Body, {fontSize: 17, position:"absolute", left: 35, top: 100, color:"grey"}]}>
            Deadline:
          </Text>

          <TouchableOpacity style={[styles.Whitebox, styles.shadowProp, {width:235, height: 40, position: "absolute", left: 120, top: 90}]}> 
          </TouchableOpacity>
 */}
        <View
          style={{
            height: 475,
            width: 330,
            borderRadius: 10,
            position: "absolute",
            left: 35,
            top: 40,
          }}
        >
          {QuestionData && (
            <FlatList
              data={QuestionData}
              renderItem={renderQuestion}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>

        <TouchableOpacity style={{ position: "absolute", left: 35, top: 535 }}>
          <Icon name="plus" type="simple-line-icon" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.Whitebox,
            styles.shadowProp,
            {
              backgroundColor: "#7988FA",
              position: "absolute",
              right: 35,
              top: 530,
              width: 100,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={() => doneButtonPressed()}
        >
          <Text style={[styles.Body, { color: "white" }]}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* <Button title="Go to the login screen" onPress={() => navigation.navigate("Login")} />
        <Button title="Go back" onPress={() => navigation.goBack()} />  */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Background: {
    backgroundColor: "#7988FA",
    flex: 1,
    flexDirection: "row", //main axis is horizontal
    justifyContent: "center",
  },

  BackgroundRectangle: {
    backgroundColor: "#F5F7FF",
    position: "absolute",
    width: "100%",
    height: "87.5%",
    borderRadius: 20,
    alignSelf: "flex-end", //align self to the end of the cross axis of the flex direction.
    flexDirection: "row",
    justifyContent: "center",
  },

  Title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },

  Subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  Body: {
    fontSize: 15,
    color: "black",
  },

  Circle: {
    backgroundColor: "black",
    borderRadius: 100,
    width: 35,
    height: 35,
  },

  Whitebox: {
    backgroundColor: "#FFFFFF",
    width: 45,
    height: 45,
    borderRadius: 10,
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default DetailsScreen;
