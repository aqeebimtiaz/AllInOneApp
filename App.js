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
	StatusBar,
	Dimensions,
	StyleSheet,
	ScrollView,
	SafeAreaView,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const screenHeight = Dimensions.get("window").height;

export default class App extends React.Component {
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
};

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
		textAlign: 'center'
	},
	sectionContainer: {
		marginTop: 32,
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