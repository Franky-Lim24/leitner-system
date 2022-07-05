import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Feather from "react-native-vector-icons/Feather";

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

    const [boxArr, setBoxArr] = useState([
        {
            text: "Revision Box 1",
            id: Math.random().toString(),
            checkCircle: false,
        },
        {
            text: "Revision Box 2",
            id: Math.random().toString(),
            checkCircle: false,
        },
        {
            text: "Revision Box 3",
            id: Math.random().toString(),
            checkCircle: false,
        },
        {
            text: "Revision Box 4",
            id: Math.random().toString(),
            checkCircle: false,
        },
        {
            text: "Revision Box 5",
            id: Math.random().toString(),
            checkCircle: false,
        },
        {
            text: "Revision Box 6",
            id: Math.random().toString(),
            checkCircle: false,
        },
        {
            text: "Revision Box 7",
            id: Math.random().toString(),
            checkCircle: false,
        },
    ]);

    const colors = ["#BEE0FE", "#FFCECE", "#CCFFD1", "#F3EBC3"];

    function addboxArr(text) {
        setBoxArr((retrievedText) => {
            [...boxArr, { text: retrievedText, id: Math.random().toString() }];
        });
    }

    const updateCheckCircle = (id) => {
        var box = boxArr.filter((check) => check.id === id);
        box = box[0];
        box.checkCircle = !box.checkCircle;
        // setBoxArr({...boxArr, checkCircle: box.checkCircle});
        // this.data.refresh()
    };

    // this.setState({ 
    //     refresh: !this.state.refresh
    // })

    

    function BoxItem(props) {
        return (
            <View
                style={[
                    styles.box,
                    {
                        backgroundColor:
                            colors[Math.floor(Math.random() * colors.length)],
                    },
                ]}
            >
                <View style={styles.boxFlex}>
                    <Text style={styles.boxText}>{props.text}</Text>
                    <TouchableOpacity
                        onPress={() => updateCheckCircle(props.id)}
                    >
                        {boxArr.checkCircle ? (
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
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <View></View> */}
                <Text style={styles.date}>
                    {monthName} {new Date().getFullYear()}
                </Text>
                <View style={styles.dateCarosell}>
                    <LinearGradient
                        colors={["#99a4fb", "#99a4fb"]}
                        style={styles.dateBox}
                    >
                        <Text style={styles.dateBoxText}>
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
                        extraData={this.state.refresh}
                        data={boxArr}
                        renderItem={(itemData) => {
                            return (
                                <BoxItem
                                    text={itemData.item.text}
                                    id={itemData.item.id}
                                />
                            );
                        }}
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
