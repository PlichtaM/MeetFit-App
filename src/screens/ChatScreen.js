import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { getChatMessages, sendChatMessage, getUser } from '../../services/api';
import ChatStyles from '../styles/ChatStyles';

const ChatScreen = ({ route, navigation }) => {
    const { eventId, eventName } = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [avatars, setAvatars] = useState({});
    const flatListRef = useRef();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };

    fetchUserId();

        const fetchMessages = async () => {
            try {
                const response = await getChatMessages(eventId);
                setMessages(response.data);
                fetchAvatars(response.data);
                scrollToBottom();
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
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#B243D8",
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white",
        fontSize: 25,
      },
    });
  }, [navigation, eventName]);

  const fetchAvatars = async (messages) => {
    const uniqueUserIds = [...new Set(messages.map((msg) => msg.userId))];
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
            schedulePushNotification();
            scrollToBottom();
        } catch (error) {
            console.error("Error sending message:", error);
            Alert.alert("Error", "There was a problem sending your message.");
        }
    };

    const schedulePushNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "New message in chat!",
                body: `Message in chat: ${eventName}`,
                data: { eventId },
            },
            trigger: { seconds: 1 },
        });
    };

    const scrollToBottom = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: item.userId === userId ? "flex-end" : "flex-start",
      }}
    >
      {item.userId !== userId && (
        <Image
          source={{ uri: `https://meetfitapp.pl${avatars[item.userId]}` }}
          style={ChatStyles.avatar}
        />
      )}
      <View
        style={[
          item.userId === userId
            ? ChatStyles.bubbleRight
            : ChatStyles.bubbleLeft,
          { padding: 10, borderRadius: 10 },
        ]}
      >
        <Text
          style={
            item.userId === userId ? ChatStyles.textRight : ChatStyles.textLeft
          }
        >
          {item.message}
        </Text>
        <Text style={{ fontSize: 10, color: "#999", marginTop: 5 }}>
          {new Date(item.date).toLocaleString()}
        </Text>
      </View>
    </View>
  );

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.select({ ios: 90, android: 80 })}
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={[ChatStyles.chatContainer, { paddingBottom: 80 }]}
                style={{ flex: 1 }}
            />
            <View style={ChatStyles.messageInputContainer}>
                <TextInput
                    style={ChatStyles.messageInput}
                    value={message}
                    onChangeText={setMessage}
                    onFocus={scrollToBottom}
                />
                <TouchableOpacity style={ChatStyles.sendButton} onPress={handleSend}>
                    <Text style={ChatStyles.sendButtonText}>Wyślij</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;
