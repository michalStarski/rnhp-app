/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

const React = require('react');
const { Text, View, StyleSheet } = require('react-native');
const LoginScreen = require('./src/screens/LoginScreen');
const { Provider } = require('react-native-paper');

class App extends React.Component {
	render() {
		return (
			<View style={styles.view}>
				<Text style={{ textAlign: "center" }}>React Native Has Power</Text>
				<Provider>
					<LoginScreen />
				</Provider>
			</View>
		)
	}
}

const styles = new StyleSheet.create({
	view: {
		padding: 50,
		flex: 1,
	}
})

module.exports = App
