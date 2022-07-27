import React, { useEffect } from "react";
import { Icon } from "@rneui/themed";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { GetTask } from "../services/boxService";
import { GetBoxes } from "../services/authService.js";

const ScheduleScreen = ({ navigation }) => {
    //  today = new Date();
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    var monthName = months[new Date().getMonth()];
    var day = new Date().getDay();
    const colors = ["#BEE0FE", "#FFCECE", "#CCFFD1", "#F3EBC3"];
    const [boxArr, setBoxArr] = React.useState([]);

    useEffect(() => {

        async function getTask() {
            console.log("Get task ran");
            // const tasks = await GetTask();
            // console.log(tasks);
            var res = await GetBoxes();
            // setBoxArr(res.data);
            // console.log(res.data);
            res = res.data;
            // console.log(res.length);
            res.forEach((userObject)=>{
                console.log("hi");
                setBoxArr(
                    [
                        ...boxArr,
                        {
                            text: userObject.box_name,
                            // text: "1",
                            id: Math.random().toString(),
                            checkCircle: false,
                            color: colors[Math.floor(Math.random() * colors.length)],
                        },
                    ]
                );
            });
            // for (let userObject of res) {
            //     console.log("for function "+userObject.box_name);
            //     // alter(userObject.box_name);
            //     // addboxArr(userObject.box_name);
            //     // setBoxArr(
            //     //     [
            //     //         ...boxArr,
            //     //         {
            //     //             text: userObject.box_name,
            //     //             id: Math.random().toString(),
            //     //             checkCircle: false,
            //     //             color: colors[Math.floor(Math.random() * colors.length)],
            //     //         },
            //     //     ]
            //     // );
            // }
        }
        getTask();

        // function alter(value) {
            
        //     // console.log("alter function:"+value);
        //     // if (value != undefined) {
        //     //     console.log(value.box_name);
        //         addboxArr(value);
        //     // }
        // }
    },[]);

    function addboxArr(text) {
        setBoxArr((text) => {
            [
                ...boxArr,
                {
                    text: text,
                    id: Math.random().toString(),
                    checkCircle: false,
                    color: colors[Math.floor(Math.random() * colors.length)],
                },
            ];
        });
    }

    const updateCheckCircle = (id) => {
        var box = boxArr.filter((check) => check.id === id);
        box = box[0];
        box.checkCircle = !box.checkCircle;
        setBoxArr(() => {
            return [...boxArr];
        });
    };

    function BoxItem(props) {
        return (
            <View
                style={[
                    styles.box,
                    {
                        backgroundColor: props.color,
                    },
                ]}
            >
                <View style={styles.boxFlex}>
                    <Text style={styles.boxText}>{props.text}</Text>
                    {/* <View.Animatable animation="fadeInUpBig"> */}
                    <TouchableOpacity
                        onPress={() => updateCheckCircle(props.id)}
                    >
                        {props.checkCircle ? (
                            <Feather
                                name="check-circle"
                                size={20}
                                style={styles.checkCircle}
                            />
                        ) : (
                            <Feather
                                name="circle"
                                size={20}
                                style={styles.checkCircle}
                            />
                        )}
                    </TouchableOpacity>

                    {/* </View.Animatable> */}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{ position: "absolute", top: 60, left: 35 }}
                    onPress={() => navigation.navigate("HomeScreen")}
                >
                    <Icon
                        name="home"
                        type="simple-line-icon"
                        color="#FFFFFF"
                        size={30}
                    />
                </TouchableOpacity>
                <Text style={[styles.date]}>
                    {monthName} {new Date().getFullYear()}
                </Text>
                <View style={styles.dateCarosell}>
                    <LinearGradient
                        colors={["#99a4fb", "#99a4fb"]}
                        style={styles.dateBox}
                    >
                        <Text style={[styles.dateBoxText]}>
                            {new Date().getDate() - 2}
                        </Text>
                        <Text style={styles.dateBoxText}>
                            {days[(day - 2) % 7]}
                        </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={["#99a4fb", "#99a4fb"]}
                        style={styles.dateBox}
                    >
                        <Text style={styles.dateBoxText}>
                            {new Date().getDate() - 1}
                        </Text>
                        <Text style={styles.dateBoxText}>
                            {days[(day - 1) % 7]}
                        </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={["#fff", "#fff"]}
                        style={styles.dateBox}
                    >
                        <Text
                            style={[styles.dateBoxText, { color: "#99a4fb" }]}
                        >
                            {new Date().getDate()}
                        </Text>
                        <Text
                            style={[styles.dateBoxText, { color: "#99a4fb" }]}
                        >
                            {days[day % 7]}
                        </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={["#99a4fb", "#99a4fb"]}
                        style={styles.dateBox}
                    >
                        <Text style={styles.dateBoxText}>
                            {new Date().getDate() + 1}
                        </Text>
                        <Text style={styles.dateBoxText}>
                            {days[(day + 1) % 7]}
                        </Text>
                    </LinearGradient>
                    <LinearGradient
                        colors={["#99a4fb", "#99a4fb"]}
                        style={styles.dateBox}
                    >
                        <Text style={styles.dateBoxText}>
                            {new Date().getDate() + 2}
                        </Text>
                        <Text style={styles.dateBoxText}>
                            {days[(day + 2) % 7]}
                        </Text>
                    </LinearGradient>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.task}>Tasks</Text>
                <View style={{ flex: 1 }}>
                    <FlatList
                        // extraData={boxArr}
                        data={boxArr}
                        renderItem={(itemData) => {
                            return (
                                <BoxItem
                                    text={itemData.item.text}
                                    id={itemData.item.id}
                                    checkCircle={itemData.item.checkCircle}
                                    color={itemData.item.color}
                                />
                            );
                        }}
                        keyExtractor={(item) => item.id}
                        alwaysBounceVertical={false}
                    />
                </View>
            </View>
        </View>
    );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7988FA",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 35,
        paddingVertical: 20,
    },
    date: {
        flex: 2,
        fontSize: 30,
        color: "#fff",
        paddingTop: 50,
        left: 110,
        top: 10,
    },
    dateCarosell: {
        flexDirection: "row",
        flex: 2,
    },
    dateBox: {
        flexDirection: "column",
        flex: 1,
        width: "20%",
        height: 65,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginLeft: 8,
        marginRight: 8,
    },

    dateBoxText: {
        fontSize: 17,
        color: "#fff",
    },
    task: {
        fontSize: 30,
    },
    box: {
        justifyContent: "center",
        alignContent: "center",
        // backgroundColor: "purple",
        margin: 10,
        borderRadius: 10,
        height: 75,
    },
    boxText: {
        fontSize: 20,
        marginLeft: 20,
        marginTop: 6,
    },
    boxFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    checkCircle: {
        padding: 10,
    },
});
