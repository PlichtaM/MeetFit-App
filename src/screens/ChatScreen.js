import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getChatMessages, sendChatMessage, getUser } from '../../services/api'; // Import getUser
import ChatStyles from '../styles/ChatStyles';

const ChatScreen = ({ route, navigation }) => {
    const { eventId, eventName } = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [avatars, setAvatars] = useState({});

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        };

        fetchUserId();

        const fetchMessages = async () => {
            try {
                const response = await getChatMessages(eventId);
                setMessages(response.data);
                fetchAvatars(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
                Alert.alert("Error", "There was a problem fetching chat messages.");
            }
        };

        fetchMessages();

        // Set interval to refresh messages every 5 seconds
        const intervalId = setInterval(() => {
            fetchMessages();
        }, 5000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [eventId]);

    useEffect(() => {
        navigation.setOptions({
            title: eventName,
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#B243D8',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
                fontSize: 25,
            },
        });
    }, [navigation, eventName]);

    const fetchAvatars = async (messages) => {
        const uniqueUserIds = [...new Set(messages.map(msg => msg.userId))];
        const avatars = {};
        
        for (const userId of uniqueUserIds) {
            try {
                const userResponse = await getUser(userId);
                avatars[userId] = userResponse.data.profilePictureUrl;
            } catch (error) {
                console.error(`Error fetching avatar for user ${userId}:`, error);
            }
        }
        setAvatars(avatars);
    };

    const handleSend = async () => {
        if (!message.trim()) {
            Alert.alert("Error", "Message cannot be empty.");
            return;
        }

        try {
            await sendChatMessage({ eventId, message });
            setMessage('');
            const response = await getChatMessages(eventId);
            setMessages(response.data);
            fetchAvatars(response.data);
        } catch (error) {
            console.error("Error sending message:", error);
            Alert.alert("Error", "There was a problem sending your message.");
        }
    };

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: item.userId === userId ? 'flex-end' : 'flex-start' }}>
            {item.userId !== userId && (
                <Image
                    source={{ uri: `https://meetfitapp.pl${avatars[item.userId]}` }}
                    style={ChatStyles.avatar}
                />
            )}
            <View style={[
                item.userId === userId ? ChatStyles.bubbleRight : ChatStyles.bubbleLeft,
                { padding: 10, borderRadius: 10 }
            ]}>
                <Text style={item.userId === userId ? ChatStyles.textRight : ChatStyles.textLeft}>{item.message}</Text>
                <Text style={{ fontSize: 10, color: '#999', marginTop: 5 }}>{new Date(item.date).toLocaleString()}</Text>
            </View>
        </View>
    );

    return (
        <View style={ChatStyles.container}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={ChatStyles.chatContainer}
            />
            <View style={ChatStyles.messageInputContainer}>
                <TextInput
                    style={ChatStyles.messageInput}
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={ChatStyles.sendButton} onPress={handleSend}>
                    <Text style={ChatStyles.sendButtonText}>Wyślij</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatScreen;
