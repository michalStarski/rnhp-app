const React = require('react');
const { Text, View, StyleSheet, Button } = require('react-native');
const { TextInput } = require('react-native-paper');
const AuthorService = require('../services/AuthorService');

type Props = {
    title: string,
}

type State = {
    title: string,
}

class LoginScreen extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: ""
        }
        this.saveAuthor = this.saveAuthor.bind(this);
    }

    async componentDidMount() {
        const name = await AuthorService.getName();
        this.setState({ name });
    }

    saveAuthor() {
        const { name } = this.state;
        console.log(name);
        AuthorService.setName(name);
    }

    render() {
        return (
            <View style={styles.view}>
                <Text style={styles.label}>Name</Text>
                <TextInput value={this.state.name} onChangeText={text => this.setState({ name: text })} style={styles.input} />
                <Text style={styles.label}>Username</Text>
                <TextInput value={this.state.username} onChangeText={text => this.setState({ username: text })} style={styles.input} />
                <Button style={styles.button} title="Button" onPress={this.saveAuthor} ></Button>
            </View>
        )
    }
}

const styles = new StyleSheet.create({
    view: {
        padding: 20,
        flex: 1,
    },
    label: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    input: {
        height: 50,
        borderColor: "black"
    },
})

module.exports = LoginScreen;
