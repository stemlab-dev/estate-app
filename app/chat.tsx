import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/authContext';
import { useLocalSearchParams } from 'expo-router';

const ChatScreen = () => {
	const { chatId } = useLocalSearchParams();
	const { profile } = useAuth();
	const [messages, setMessages] = useState([]);
	const [inputText, setInputText] = useState('');
	const flatListRef = useRef(null);

	// WebSocket connection
	const ws = useRef(null);

	useEffect(() => {
		// Connect to WebSocket server
		ws.current = new WebSocket('ws://localhost:8080');

		ws.current.onopen = () => {
			console.log('WebSocket connected');
		};

		ws.current.onmessage = (event) => {
			const message = JSON.parse(event.data);
			setMessages((prevMessages) => [...prevMessages, message]);
		};

		ws.current.onclose = () => {
			console.log('WebSocket disconnected');
		};

		return () => {
			ws.current.close();
		};
	}, []);

	// Send message function
	const sendMessage = () => {
		if (inputText.trim()) {
			const newMessage = {
				id: Date.now().toString(),
				sender: profile._id,
				text: inputText,
				timestamp: new Date().toISOString(),
			};

			// Send message via WebSocket
			ws.current.send(JSON.stringify(newMessage));

			// Update local state
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			setInputText('');

			// Scroll to the latest message
			setTimeout(() => {
				flatListRef.current.scrollToEnd({ animated: true });
			}, 100);
		}
	};

	// Render message item
	const renderItem = ({ item }) => {
		const isSender = item.sender === profile._id;
		return (
			<View
				style={[
					styles.messageContainer,
					isSender ? styles.senderMessage : styles.receiverMessage,
				]}
			>
				{!isSender && (
					<Image
						source={{ uri: 'https://via.placeholder.com/40' }} // Replace with actual avatar URL
						style={styles.avatar}
					/>
				)}
				<View
					style={[
						styles.messageBubble,
						isSender ? styles.senderBubble : styles.receiverBubble,
					]}
				>
					<Text style={styles.messageText}>{item.text}</Text>
					<Text style={styles.timestamp}>
						{new Date(item.timestamp).toLocaleTimeString()}
					</Text>
				</View>
				{isSender && (
					<Image
						source={{ uri: 'https://via.placeholder.com/40' }} // Replace with actual avatar URL
						style={styles.avatar}
					/>
				)}
			</View>
		);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<FlatList
				ref={flatListRef}
				data={messages}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				contentContainerStyle={styles.messagesContainer}
				onContentSizeChange={() =>
					flatListRef.current.scrollToEnd({ animated: true })
				}
			/>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Type a message..."
					value={inputText}
					onChangeText={setInputText}
				/>
				<TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
					<Ionicons name="send" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	messagesContainer: {
		padding: 10,
	},
	messageContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginBottom: 10,
	},
	senderMessage: {
		justifyContent: 'flex-end',
	},
	receiverMessage: {
		justifyContent: 'flex-start',
	},
	messageBubble: {
		maxWidth: '70%',
		padding: 10,
		borderRadius: 10,
	},
	senderBubble: {
		backgroundColor: '#007AFF',
		marginLeft: 10,
	},
	receiverBubble: {
		backgroundColor: '#e5e5ea',
		marginRight: 10,
	},
	messageText: {
		fontSize: 16,
	},
	timestamp: {
		fontSize: 12,
		color: '#666',
		marginTop: 5,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	inputContainer: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#ccc',
	},
	input: {
		flex: 1,
		padding: 10,
		backgroundColor: '#f9f9f9',
		borderRadius: 20,
		marginRight: 10,
	},
	sendButton: {
		backgroundColor: '#007AFF',
		borderRadius: 20,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ChatScreen;
