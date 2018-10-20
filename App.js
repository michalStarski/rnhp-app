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
const { TabNavigator } = require('react-navigation');
const ChatScreen = require('./src/screens/ChatScreen');

class App extends React.Component {
	render() {
		return (
			<View style={styles.view}>
				<Text style={{ textAlign: "center" }}>React Native Has Power</Text>
				<Provider>
					<AppNavigator />
				</Provider>
			</View>
		)
	}
}

const AppNavigator = new TabNavigator({
	Login: { screen: LoginScreen },
	Message: { screen: ChatScreen }
})

const styles = new StyleSheet.create({
	view: {
		flex: 1,
	}
})

module.exports = App
