import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Image, TouchableOpacity, Keyboard, TextInput, FlatList } from 'react-native';
import { Icon } from "@rneui/themed";
import { NavigationContainer } from '@react-navigation/native';
import { format } from 'react-string-format'; //npm install


function DetailsScreen({navigation}) {

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

  //flatlist stuff
  const QuestionData = [{id:1, Question:"Question", Answer:"Answer"} ,
  {id:2, Question:"Question", Answer:"Answer"},
  {id:3, Question:"Question", Answer:"Answer"}];

  const Question = ({ id, Question, Answer }) => (
    <View style={[styles.Whitebox, styles.shadowProp, {width:320, height: 150, marginVertical: 8}]}> 
        <View style={{position: "relative", left: 15, top: 10, width: 285}}>
          <TextInput
            style={[styles.Body, {fontWeight: "bold", fontSize: 17, flexWrap: "wrap", overflow: "hidden"}]}
            placeholder= "Question"
            placeholderTextColor="black"
            onSubmitEditing={Keyboard.dismiss}
          />
          
        </View>
        <Text style={[styles.Body, {position: 'absolute', left: 15, top: 20, color: "lightgrey"}]}>
          ____________________________________
        </Text>
        <View style={[styles.Whitebox, {borderColor: "#D9D9D9", borderWidth:1, width: 290, height: 85, top: 30, left: 15}]}>
          <TextInput 
            style={[styles.Body, {color: "grey", flexWrap: "wrap", overflow: "scroll", marginHorizontal: 5}]}
            placeholder="Answer"
            onSubmitEditing={Keyboard.dismiss}
            multiline={true}
          />
        </View>
      </View>
  );

  const renderQuestion = ({ item }) => (
    <Question title={item.title} DayCount={item.DayCount} DueDate={item.DueDate} />
  );

    return (
      <SafeAreaView style={styles.Background}>

        <TouchableOpacity 
          style={{position: "absolute", top: 60, left:35}}
          onPress={() => navigation.navigate("HomeScreen")}>
            <Icon 
              name="home" 
              type="simple-line-icon" 
              color="#FFFFFF"
              size={30}
            />
        </TouchableOpacity>

        <View style={{height: 50, width:200, top:60}}>
          <TextInput
            style={[styles.Title, {flexWrap: "wrap", overflow: "hidden"}]}
            placeholder= "Untitled Box"
            placeholderTextColor="white"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>

        <View style={[styles.BackgroundRectangle]}>
          <Text style={[styles.Body, {fontSize: 17, position:"absolute", left: 35, top: 30, color:"grey"}]}>
            Box  
          </Text>
          <Text style={[styles.Body, {fontSize: 17, position:"absolute", left: 35, top: 51, color:"grey"}]}>
            Colour: 
          </Text>

          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#FF6F6F", position:"absolute", left: 120, top: 30}]}/>
          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#56BA60", position:"absolute", left: 170, top: 30}]}/>
          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#EFDD85", position:"absolute", left: 220, top: 30}]}/>
          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#799DFA", position:"absolute", left: 270, top: 30}]}/>
          <TouchableOpacity style={[styles.Circle, {backgroundColor: "#D879FA", position:"absolute", left: 320, top: 30}]}/>

          {/* <Text style={[styles.Body, {fontSize: 17, position:"absolute", left: 35, top: 100, color:"grey"}]}>
            Deadline:
          </Text>

          <TouchableOpacity style={[styles.Whitebox, styles.shadowProp, {width:235, height: 40, position: "absolute", left: 120, top: 90}]}> 
          </TouchableOpacity>
 */}
          <View style={{height: 400, width: 330, borderRadius: 10, position: "absolute",left: 35, top: 100}}>
            {QuestionData && (
              <FlatList
                data={QuestionData}
                renderItem={renderQuestion}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>

          <TouchableOpacity style={{position:"absolute", left: 35, top: 535}}>
            <Icon 
              name="plus" 
              type="simple-line-icon"
              size={30}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.Whitebox, 
              styles.shadowProp, 
              {backgroundColor:"#7988FA",
              position:"absolute", 
              right: 35, 
              top: 530,
              width: 100,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }]}>
              <Text style={[styles.Body, {color:"white"}]}>
                Done
              </Text>

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
      position: 'absolute',
      width: "100%",
      height: "87.5%",
      borderRadius: 20,
      alignSelf: "flex-end", //align self to the end of the cross axis of the flex direction.
      flexDirection:"row",
      justifyContent: "center",
      
    },

    Title: {
      fontFamily: "Montserrat",
      fontSize: 35,
      fontWeight: "bold",
      color: "white",

    },

    Subtitle: {
      fontFamily: "Montserrat",
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
    },

    Body: {
      fontFamily: "Montserrat",
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
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });

export default DetailsScreen;