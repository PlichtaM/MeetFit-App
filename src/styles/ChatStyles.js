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
        backgroundColor: '#0066FF',
    },
    textRight: {
        color: '#fff',
    },
    textLeft: {
        color: '#000',
    },
    chatContainer: {
        flexGrow: 1,
        padding: 10,
    },
    messageInputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
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
        backgroundColor: '#0066FF',
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
