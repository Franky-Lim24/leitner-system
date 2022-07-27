import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Icon } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { format } from 'react-string-format';
import axios from 'axios';
import { CreateBox } from '../services/boxService.js';
import { CreateQuestions } from '../services/questionService.js';

function DetailsScreen({ route, navigation }) {
	// const createBoxes = (boxN, boxC) => {
	//   CreateBox({
	//     box_name: boxN,
	//     colour: boxC,
	//   })
	//   navigation.navigate("HomeScreen");
	// };

	//keyboard stuff
	const [keyboardStatus, setKeyboardStatus] = useState(undefined);

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardStatus('Keyboard Shown');
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardStatus('Keyboard Hidden');
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	//flatlist for the boxes users will enter their questions into
	const initialstate = [{ id: 1, question: 'Question', answer: 'Answer' }];

	const [Questionboxes, setQuestionboxes] = useState(initialstate);

	var currentQuestionBoxID = 1;

	async function addNewQuestionBox() {
		if (
			JSON.stringify(Questionboxes[Questionboxes.length - 1].question) ===
				JSON.stringify('Question') ||
			JSON.stringify(Questionboxes[Questionboxes.length - 1].answer) ===
				JSON.stringify('Answer')
		) {
			alert('Please fill in your previous created question first!');
			return;
		}
		// alert(JSON.stringify("Question"));

		currentQuestionBoxID = currentQuestionBoxID + 1;
		Questionboxes.push({
			id: currentQuestionBoxID,
			question: 'Question',
			answer: 'Answer',
		});
	}

	//creating new questions and sending to the backend
	// const initialstate = Questionboxes;
	// const [questionsData, setData] = useState(initialstate);

	var qn = '';
	var ans = '';

	async function questionsSubmitted(value) {
		qn = value.nativeEvent.text;
		const newState = Questionboxes.map((obj) => {
			if (obj.id == currentQuestionBoxID) {
				return { ...obj, question: qn };
			} else {
				return obj;
			}
		});

		setQuestionboxes(newState);
		dismissKeyboard();
		alert(JSON.stringify(Questionboxes));
	}

	async function answerSubmitted(value) {
		ans = value.nativeEvent.text;
		const newState = Questionboxes.map((obj) => {
			// 👇️ if id equals 2, update country property
			if (obj.id == currentQuestionBoxID) {
				return { ...obj, answer: ans };
			} else {
				return obj;
			}
		});

		setQuestionboxes(newState);
		dismissKeyboard();
		alert(JSON.stringify(Questionboxes));
	}

	const createQuestions = (Questionboxes) => {
		CreateQuestions(Questionboxes);
	};

	const Question = ({ id, Question, Answer }) => (
		<View
			style={[
				styles.Whitebox,
				styles.shadowProp,
				{ width: 320, height: 150, marginVertical: 8 },
			]}
		>
			<View style={{ position: 'relative', left: 15, top: 10, width: 285 }}>
				<TextInput
					style={[
						styles.Body,
						{
							fontWeight: 'bold',
							fontSize: 17,
							flexWrap: 'wrap',
							overflow: 'hidden',
						},
					]}
					placeholder="Question"
					placeholderTextColor="black"
					onSubmitEditing={(value) => questionsSubmitted(value)}
				/>
			</View>
			<Text
				style={[
					styles.Body,
					{ position: 'absolute', left: 15, top: 20, color: 'lightgrey' },
				]}
			>
				____________________________________
			</Text>
			<View
				style={[
					styles.Whitebox,
					{
						borderColor: '#D9D9D9',
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
							color: 'grey',
							flexWrap: 'wrap',
							overflow: 'scroll',
							marginHorizontal: 5,
						},
					]}
					placeholder="Answer"
					blurOnSubmit={true}
					onSubmitEditing={(value) => answerSubmitted(value)}
					multiline={true}
				/>
			</View>
		</View>
	);

	const renderQuestion = ({ item }) => <Question title={item.title} />;

	//creating a box stuff
	const [boxName, setBoxName] = useState('');

	async function createBox(boxName) {
		await CreateBox(boxName);
	}

	async function doneButtonPressed() {
		await createBox(boxName);
		alert(JSON.stringify(boxName) + 'created' + 'async ran');
		navigation.push('HomeScreen');
	}

	const dismissKeyboard = () => {
		Keyboard.dismiss;
	};

	const saveUserInput = (value) => {
		setBoxName(value);
	};

	const userMakesBoxName = (value) => {
		saveUserInput(value.nativeEvent.text);
		dismissKeyboard();
	};

	return (
		<SafeAreaView style={styles.Background}>
			<TouchableOpacity
				style={{ position: 'absolute', top: 60, left: 35 }}
				onPress={() => navigation.navigate('HomeScreen')}
			>
				<Icon name="home" type="simple-line-icon" color="#FFFFFF" size={30} />
			</TouchableOpacity>

			<View style={{ height: 50, width: 200, top: 60 }}>
				<TextInput
					style={[
						styles.Title,
						{ flexWrap: 'wrap', overflow: 'hidden', textAlign: 'center' },
					]}
					placeholder="Untitled Box"
					placeholderTextColor="white"
					onSubmitEditing={(value) => userMakesBoxName(value)}
				/>
			</View>

			<View style={[styles.BackgroundRectangle]}>
				<View
					style={{
						height: 475,
						width: 330,
						borderRadius: 10,
						position: 'absolute',
						left: 35,
						top: 40,
					}}
				>
					{Questionboxes && (
						<FlatList
							data={Questionboxes}
							renderItem={renderQuestion}
							keyExtractor={(item) => item.id}
						/>
					)}
				</View>

				{/* add questions button */}
				<TouchableOpacity
					style={{ position: 'absolute', left: 35, top: 535 }}
					onPress={(currentQuestionBoxID) =>
						addNewQuestionBox(currentQuestionBoxID)
					}
				>
					<Icon name="plus" type="simple-line-icon" size={30} />
				</TouchableOpacity>

				{/* done button */}
				<TouchableOpacity
					style={[
						styles.Whitebox,
						styles.shadowProp,
						{
							backgroundColor: '#7988FA',
							position: 'absolute',
							right: 35,
							top: 530,
							width: 100,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
						},
					]}
					onPress={() => doneButtonPressed()}
				>
					<Text style={[styles.Body, { color: 'white' }]}>Done</Text>
				</TouchableOpacity>
			</View>

			{/* <Button title="Go to the login screen" onPress={() => navigation.navigate("Login")} />
        <Button title="Go back" onPress={() => navigation.goBack()} />  */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	Background: {
		backgroundColor: '#7988FA',
		flex: 1,
		flexDirection: 'row', //main axis is horizontal
		justifyContent: 'center',
	},

	BackgroundRectangle: {
		backgroundColor: '#F5F7FF',
		position: 'absolute',
		width: '100%',
		height: '87.5%',
		borderRadius: 20,
		alignSelf: 'flex-end', //align self to the end of the cross axis of the flex direction.
		flexDirection: 'row',
		justifyContent: 'center',
	},

	Title: {
		fontSize: 35,
		fontWeight: 'bold',
		color: 'white',
	},

	Subtitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black',
	},

	Body: {
		fontSize: 15,
		color: 'black',
	},

	Circle: {
		backgroundColor: 'black',
		borderRadius: 100,
		width: 35,
		height: 35,
	},

	Whitebox: {
		backgroundColor: '#FFFFFF',
		width: 45,
		height: 45,
		borderRadius: 10,
	},

	shadowProp: {
		shadowColor: '#171717',
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
});

export default DetailsScreen;
