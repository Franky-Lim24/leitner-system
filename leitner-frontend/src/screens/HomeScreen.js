import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Dimensions, Image, TouchableOpacity, Keyboard, TextInput, FlatList } from 'react-native';
import { Icon } from "@rneui/themed";
import { NavigationContainer } from '@react-navigation/native';



function HomeScreen({navigation}) {

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


//flatlist stuff for the study boxes
  const BoxData = [{id:1, title:"Physics", DayCount:"Day: 3", DueDate:"01-01-2022"} ,
  {id:2, title:"Chemistry", DayCount:"Day: 2", DueDate:"02-02-2022"},
  {id:3, title:"Biology", DayCount:"Day: 1", DueDate:"03-02-2022"}];

  const Box = ({ title, DayCount, DueDate }) => (
    <TouchableOpacity style={styles.BoxItem} onPress={() => navigation.navigate("QuestionScreen")}> 
      <Text style={[styles.Subtitle, {alignSelf: "center", top: 35, fontSize: 17}]}>{title} </Text>
      <Text style={[styles.Body, {alignSelf: "center", top: 45}]}>{DayCount} </Text>
      <Text style={[styles.Body, {alignSelf: "center", top: 50, fontSize:13}]}>{DueDate}</Text>
    </TouchableOpacity>
  );

  const renderBox = ({ item }) => (
    <Box title={item.title} DayCount={item.DayCount} DueDate={item.DueDate} />
  );


  return (
    <SafeAreaView style={styles.Background}>

       {/* settings button */}
      <TouchableOpacity style={{position:"absolute", top: 60, left:40}}>
        <Icon
          name="settings"
          type="simple-line-icon"
          color="#FFFFFF"
          size={35}
        />
      </TouchableOpacity>

      <Text style = {[styles.Title, {fontSize: 40, top: 80}]}>
          Welcome Back!
      </Text>


      <View style={styles.BackgroundRectangle}>

          {/* task bar */}
          <View style={[styles.Taskbar, styles.shadowProp]}>
            <Text style={[styles.Subtitle, {position: 'relative', left: 15, top: 15}]}>
              Your Tasks
            </Text>
            <Text style={[styles.Body, {position: 'absolute', left: 15, top: 35, color: "lightgrey"}]}>
              _______________________________________
            </Text>
            <Text style={[styles.Body, {position: 'absolute', left: 20, top: 65}]}>
              1.  Physics
            </Text>
            <Text style={[styles.Body, {position: 'absolute', left: 20, top: 90}]}>
              2. Chemistry
            </Text>


            {/* see full schedule button */}
            <TouchableOpacity style={[
              styles.SearchBar,
              styles.shadowProp, {
              backgroundColor: "#7988FA",
              width: 150,
              position: 'absolute',
              right: 15,
              top: 165,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              }]}
              onPress={() => navigation.navigate("ScheduleScreen")}
              >

                <Text style={[styles.Body, {color: "white"}]}>
                  See full schedule
                </Text>
            </TouchableOpacity>

          </View>


          {/* study box section titles/subtitles */}
          <Text style = {[styles.Subtitle, {position: "absolute", top: 145, left: 35}]}>
            Study Boxes
          </Text>

          <Text style = {[styles.Body, {position: "absolute", top: 175, left: 35}]}>
            What will you study today?
          </Text>


          {/* create new box button */}
          <View style={styles.CreateButton}>
            <Button  title="Create" onPress={() => navigation.navigate("DetailsScreen")}  />
          </View>


          {/* search bar */}
          <View style={[styles.SearchBar, styles.shadowProp]}>
            <View style={{position: "relative", top: 15, left: 35, width: 270}}>
              <TextInput
                style={[styles.Body, {flexWrap: "wrap", overflow: "hidden"}]}
                placeholder= "Search"
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
            <Image
              source={require('./assets/1200px-Magnifying_glass_icon.svg.png')}
              style={{width: 20, height: 20, position: "absolute",  bottom: 10, left: 10}}>
            </Image>
          </View>


          {/* study boxes */}
          <View style={styles.BoxWindow}>
            {BoxData && (
              <FlatList
                data={BoxData}
                renderItem={renderBox}
                keyExtractor={(item) => item.id}
                horizontal= {true}
              />
            )}
          </View>

      </View>

    </SafeAreaView>


  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const taskbarWidth = windowWidth * 0.83;
const taskbarHeight = windowHeight * 0.27;
const taskbarCenter = taskbarHeight/2;

const searchbarWidth = windowWidth - 35*2;

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
      height: "66.66666%",
      borderRadius: 20,
      alignSelf: "flex-end", //align self to the end of the cross axis of the flex direction.
      flexDirection:"row",
      justifyContent: "center",

    },

    Taskbar: {
      backgroundColor: "#FFFFFF",
      width: taskbarWidth,
      height: taskbarHeight,
      borderRadius: 10,
      alignSelf: "flex-start",
      bottom: taskbarCenter,
      position: "relative",

    },

    Title: {
      fontSize: 35,
      fontWeight: "bold",
      color: "white",
      position: "relative",
      top: 95

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

    CreateButton:{
      position: "absolute",
      top: 145,
      right: 35


    },

    SearchBar: {
      backgroundColor: "#FFFFFF",
      width: searchbarWidth,
      height: 45,
      borderRadius: 10,
      position: "absolute",
      top: 215,
    },

    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },

    BoxItem: {
      backgroundColor: "lightpink",
      width: 150,
      height: 150,
      borderRadius: 10,
      marginHorizontal: 8
    },

    BoxWindow: {
      width: 320,
      height: 150,
      borderRadius: 10,
      position: "absolute",
      top: 285, 
      left: 35
    }


  });

export default HomeScreen;