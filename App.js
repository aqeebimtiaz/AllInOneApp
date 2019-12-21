/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
	View,
	Text,
	Alert,
	StatusBar,
	TextInput,
	Dimensions,
	StyleSheet,
	ScrollView,
	SafeAreaView,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const screenHeight = Dimensions.get("window").height;

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cityname: '',
			time: '',
			name: '',
			icon: '',
			description: '',
			temperature: 0.00,
			forecast: [],
			latitude: '',
			longitude: '',
			humidity: '',
			windSpeed: '',
			cloudPercentage: '',
			loading: false,
			error: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	processData(data){
		if (data.cod == 404){
			let message = data.message.replace(/^\w/, c => c.toUpperCase());
			Alert.alert(message);
		}
		else if (data.cod == 200){
			var time = this.convertTime(data.dt);
			var sunrise = this.convertTime(data.sys.sunrise);
			var sunset = this.convertTime(data.sys.sunset);
			this.setState({
				forecast: data,
				time: time,
				name: data.name,
				icon: data.weather[0].icon,
				description: data.weather[0].description,
				temperature: data.main.temp,
				humidity: data.main.humidity,
				windSpeed: data.wind.speed,
				cloudPercentage: data.clouds.all,
				sunrise: sunrise,
				sunset: sunset,
			});
			// console.log("after set state:")
			// console.log(data.weather[0].icon)
		}
	}

	convertTime(timeStamp){
		let time;

		// Create a new date from the passed date time
		var date = new Date(timeStamp*1000);

		// Hours part from the timestamp
		var hours = date.getHours() - (date.getHours() >= 12 ? 12 : 0);

		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();
		var period = date.getHours() >= 12 ? ' PM' : ' AM';

		time = hours + ':' + minutes.substr(-2) + period;
		return time;
	}

	// Get weather by city name
	getWeatherInfo(){
		let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.cityname + '&units=metric&appid=ce0cb4b99e8ee814c20a4f76609c8196'
		fetch(url)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			// let tempData = JSON.stringify(data);
          	// console.log(tempData);
			// alert(tempData);
			this.processData(data);
		})
		.catch(function(error){
			console.log(error.message);
			throw error.message;
		});

		// this.getForecast();
	}

	handleSubmit() {
		this.getWeatherInfo(this.state.cityname);
		// alert('Cityname: ' + this.state.cityname);
	}

	render() {
		return (
			<>
				<StatusBar backgroundColor="grey" barStyle="light-content" showHideTransition='slide' animated hidden />

				<SafeAreaView>
					<ScrollView
						contentInsetAdjustmentBehavior="automatic"
						style={styles.scrollView}>

						{global.HermesInternal == null ? null : (
							<View style={styles.engine}>
								<Text style={styles.footer}>Engine: Hermes</Text>
							</View>
						)}

						<View style={styles.body}>

							<Text style={styles.title}>Search For City</Text>

							<TextInput
								style={styles.searchInput}
								value = {this.state.cityname}
								onChangeText = {(cityname) => this.setState({cityname})}
								onSubmitEditing={this.handleSubmit}
								returnKeyType={'search'}
								placeholder="Input City's Name"
								placeholderTextColor="#6F6F6F"
							/>

							<View style={styles.sectionContainer}>

								<Text style={styles.sectionTitle}>Step One</Text>
								<Text style={styles.sectionDescription}>
									Edit <Text style={styles.highlight}>App.js</Text> to change this
									screen and then come back to see your edits.
								</Text>
							</View>

						</View>

					</ScrollView>
				</SafeAreaView>
			</>
		);

	}
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	engine: {
		position: 'absolute',
		right: 0,
	},
	body: {
		height: screenHeight,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: Colors.white,
	},
	title: {
		marginTop: 20,
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
	},
	searchInput: {
		borderBottomWidth: 2,
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		// borderWidth: 1,
		borderColor: 'black',
		borderRadius: 8,
		color: 'black',
	},
	sectionContainer: {
		// marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	highlight: {
		fontWeight: '700',
	},
	footer: {
		color: Colors.dark,
		fontSize: 12,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'right',
	},
});
