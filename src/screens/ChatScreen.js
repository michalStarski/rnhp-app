const React = require('react');
const { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } = require('react-native');
const { TextInput } = require('react-native-paper');
const Message = require('../components/Message');
import Icon from 'react-native-vector-icons/MaterialIcons';
const MessageService = require('../services/MessageService');
const AuthorService = require('../services/AuthorService');
const ImagePicker = require('react-native-image-picker');


class ChatScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            senderMessage: '',
            img: '',
            loading: false,
        }
        this.imagePickerOptions = {
            title: 'Select Image',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        this.getMessages = this.getMessages.bind(this);
        this.messageSendHandler = this.messageSendHandler.bind(this);
        this.showImagePicker = this.showImagePicker.bind(this);
    }

    async componentDidMount() {
        this.getMessages();
    }

    async getMessages() {
        this.setState({ loading: true })
        MessageService.getAll()
            .then(response => {
                this.setState({ messages: response, loading: false });
            });
    }

    async messageSendHandler(content, image) {
        this.setState({ loading: true });
        const author = await AuthorService.getName();
        MessageService.create(content, author, image)
            .then(response => {
                console.log(response);
                this.setState({ senderMessage: '', loading: false })
                this.getMessages();
            })
            .catch(error => console.error(JSON.stringify(error)));
    }


    showImagePicker() {
        ImagePicker.showImagePicker(this.imagePickerOptions, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.data };
                this.setState({
                    img: source.uri,
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.view}>
                {this.state.loading ? <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20, padding: 10 }}>Proszę czekać ...</Text> : null}
                {this.state.messages.length === 0 ? <Text style={{ flex: 1, textAlign: 'center', marginTop: '80%' }}>No messages at the moment!</Text> : (
                    <ScrollView>
                        <FlatList inverted data={this.state.messages}
                            renderItem={({ item }) => <Message content={item.content} author={item.author} picture={item.image || ""} likeCount={item.likes_count} id={item.id} />}
                        />
                    </ScrollView>
                )
                }

                <View style={styles.bottomBar}>
                    <TextInput value={this.state.senderMessage} onChangeText={text => this.setState({ senderMessage: text })} style={{ width: '85%' }}></TextInput>
                    <TouchableOpacity onPress={() => this.messageSendHandler(this.state.senderMessage, this.state.img)}>
                        <Icon size={30} name="send"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showImagePicker}>
                        <Icon size={30} name="camera-alt"></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = new StyleSheet.create({
    view: {
        flex: 1
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

module.exports = ChatScreen;
