const React = require('react');
const { View, Text, StyleSheet, Image, TouchableOpacity } = require('react-native');
const { Surface } = require('react-native-paper');
import Icon from 'react-native-vector-icons/AntDesign';
const MessageService = require('../services/MessageService');

type Props = {
    content: string,
    author: string,
    image: string
}

const Message = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Text style={styles.text}>{props.content}</Text>
                <Text style={styles.text}>{props.author}</Text>
                <Image source={{ uri: props.picture || "" }} style={{ width: 50, height: 50 }}></Image>
                <TouchableOpacity onPress={() => MessageService.like(props.id)}>
                    <Icon name="like1"></Icon>
                </TouchableOpacity>
                <Text>{props.likeCount}</Text>
            </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1
    },
    messageContainer: {
        marginTop: 15,
        padding: 30,
        backgroundColor: 'aliceblue'

    },
    text: {
        marginBottom: 10,
        fontSize: 20
    }
})

module.exports = Message;
