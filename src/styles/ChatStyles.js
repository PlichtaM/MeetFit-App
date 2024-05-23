import { StyleSheet } from 'react-native';

const ChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bubbleLeft: {
        backgroundColor: '#F0F0F0',
    },
    bubbleRight: {
        backgroundColor: '#4D6EF6',
    },
    textRight: {
        color: '#fff',
    },
    textLeft: {
        color: '#000',
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    messageInputContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    messageInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#4D6EF6',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
});

export default ChatStyles;
