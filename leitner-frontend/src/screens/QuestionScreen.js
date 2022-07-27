import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { Icon } from "@rneui/themed";
import FlipCard from "react-native-flip-card-plus";
import { GetQuestion, PutQuestion } from "../services/questionService";

export default class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.card = React.createRef();
    this.state = {
      currentQuestionIndex: 0,
      questions: [],
      boxName: this.props.route.params.boxName, 
    };
  }

  componentDidMount() {
    const boxId = this.props.route.params.boxId;
    console.log(boxId);
    const getQuestion = async (boxId) => {
			console.log('calling getquestion');
			var res = await GetQuestion(boxId);
      this.setState({questions: res.data});
		}
    getQuestion(boxId);
  }

  handleRight(id, qn, ans, level) {
    this.card.flipHorizontal();
    let incrementCurrentQuestionIndex = this.state.currentQuestionIndex + 1;
    setTimeout(() => {
      this.setState({ currentQuestionIndex: incrementCurrentQuestionIndex });
    }, 300);
    let newLevel = level + 1;
    PutQuestion({
      question_id: id,
      question: qn,
      answer: ans,
      level_no: newLevel
    });
  }

  handleWrong(id, qn, ans) {
    this.card.flipHorizontal();
    let incrementCurrentQuestionIndex = this.state.currentQuestionIndex + 1;
    setTimeout(() => {
      this.setState({ currentQuestionIndex: incrementCurrentQuestionIndex });
    }, 300);
    async function putQuestion(id, qn, ans) {
      await PutQuestion({
        question_id: id,
        question: qn,
        answer: ans,
        level_no: 1,
      });
    }
    putQuestion(id, qn, ans);
  }

  render() {
    const { questions, currentQuestionIndex, boxName } = this.state;

    if (currentQuestionIndex >= questions.length) {
      return (
        <SafeAreaView styles={styles.endPage}>
          <View styles={styles.textBox}>
            <Text styles={styles.endPageText}>End of the Quiz!</Text>
            <Button
              title="Return to Home"
              onPress={() => {
                this.props.navigation.navigate('HomeScreen');
              }}
            ></Button>
          </View>
        </SafeAreaView>
      );
    }

    const { answer, level, question, id, date } 
    = questions[currentQuestionIndex];
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.home}
          onPress={() => {
            this.props.navigation.navigate("HomeScreen");
          }}
        >
          <Icon
            name="home"
            type="simple-line-icon"
            color="#FFFFFF"
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.header}></View>
        <View style={styles.header}>
          <Text style={styles.headerText}>{boxName}</Text>
        </View>
        <View style={styles.question}>
          <Text style={styles.questionText}>Question</Text>
          <Text style={styles.questionText}> {currentQuestionIndex + 1}</Text>
          <Text style={styles.questionText}>/</Text>
          <Text style={styles.questionText}>{questions.length} </Text>
        </View>
        <View style={styles.body}>
          <FlipCard
            flipDirection={"h"}
            style={styles.cardContainer}
            ref={(card) => (this.card = card)}
          >
            <View style={styles.card}>
              <Text style={styles.label}>{question}</Text>
            </View>
            <View style={styles.card}>
              <View style={{ flex: 8, justifyContent: "center" }}>
                <Text style={styles.label}>{answer}</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 0.2 }}></View>
                <View style={styles.redButton}>
                  <Button
                    color="red"
                    title="Wrong"
                    onPress={() => this.handleWrong(id, question, answer)}
                  />
                </View>
                <View style={{ flex: 0.2 }}></View>
                <View style={styles.greenButton}>
                  <Button
                    color="green"
                    title="Right"
                    onPress={() =>
                      this.handleRight(id, question, answer, level)
                    }
                  />
                </View>
                <View style={{ flex: 0.2 }}></View>
              </View>
            </View>
          </FlipCard>
        </View>
        <View style={styles.showButtonContainer}>
          <Pressable
            style={styles.trigger}
            onPress={() => this.card.flipHorizontal()}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Show Answer</Text>
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: "white",
            flex: 0.5,
          }}
        ></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  endPage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  textBox: {
    width: "80%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
  },
  endPageText: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "System",
    color: "black",
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#7988fa",
  },
  cardContainer: {
    width: "80%",
    height: "90%",
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  card: {
    width: "80%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
    // shadowColor: "rgba(0,0,0,0.5)",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.5,
  },
  label: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "System",
    color: "black",
    backgroundColor: "transparent",
  },
  trigger: {
    backgroundColor: "white",
    margin: 20,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 0.5,
    // shadowColor: "rgba(0,0,0,1)",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.5,
  },
  header: {
    backgroundColor: "#7988fa",
    flex: 1.25,
    alignItems: "center",
  },

  headerText: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },

  question: {
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
  },

  questionText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 25,
    color: "white",
  },

  body: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 8.5,
    justifyContent: "center",
    alignItems: "center",
  },

  redButton: {
    backgroundColor: "white",
    width: "35%",
    height: "50%",
    borderColor: "red",
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },

  greenButton: {
    backgroundColor: "white",
    width: "35%",
    height: "50%",
    borderColor: "green",
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },

  showButtonContainer: {
    backgroundColor: "white",
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },

  home: {
    zIndex: 50,
    position: "absolute",
    marginTop: "15%",
    marginLeft: "5%",
  },
});
