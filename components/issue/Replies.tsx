import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
} from 'react-native';
import React, { useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/context/authContext';
import Chat from './Chat';
import colors from '@/constants/color';

interface Reply {
	_id: string;
	message: string;
	createdAt: string;
	from: string;
}

interface RepliesProps {
	message: string;
	replies: Reply[];
	setMessage: (message: string) => void;
	handelSend: () => void;
}

const Replies = ({
	replies,
	message,
	setMessage,
	handelSend,
}: RepliesProps) => {
	const { profile } = useAuth();
	const flatListRef = useRef<FlatList<any>>(null);

	// Scroll to the bottom when the replies array changes
	const scrollToBottom = () => {
		setTimeout(() => {
			flatListRef?.current?.scrollToEnd({ animated: true });
		}, 100);
	};

	React.useEffect(() => {
		scrollToBottom();
	}, [replies]);

	return (
		<KeyboardAvoidingView
			style={styles.keyboardAvoidingView}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<SafeAreaView style={styles.container}>
				{/* Chat List */}
				<FlatList
					ref={flatListRef}
					keyExtractor={(item: any) => item?._id.toString()}
					showsVerticalScrollIndicator={false}
					data={replies}
					renderItem={({ item }) => (
						<Chat
							key={item._id}
							reply={item}
							isUserChat={profile?._id === item.from}
						/>
					)}
					contentContainerStyle={styles.replyContainer}
					onContentSizeChange={scrollToBottom} // Scrolls to the bottom whenever content changes
					onLayout={scrollToBottom}
				/>

				{/* Input Section */}
				<View style={styles.inputContainer}>
					<TextInput
						value={message}
						onChangeText={setMessage}
						placeholder="Type your message..."
						style={styles.input}
						returnKeyType="send"
						onSubmitEditing={() => {
							handelSend();
							Keyboard.dismiss(); // Dismiss keyboard on send
						}}
					/>
					<TouchableOpacity
						onPress={() => {
							handelSend();
							Keyboard.dismiss(); // Ensure keyboard dismisses
						}}
					>
						<Feather name="send" size={24} color="black" style={styles.icon} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default Replies;

const styles = StyleSheet.create({
	keyboardAvoidingView: {
		// flex: 1,
	},
	container: {
		// flex: 1,
		// flexDirection: 'column',
		// minHeight: 600,
		marginBottom: 60,
	},
	replyContainer: {
	},
	inputContainer: {
		flexDirection: 'row',
		paddingVertical: 5,
		alignItems: 'center',
		borderColor: '#ccc',
		borderTopWidth: 1,
	},
	input: {
		flex: 1,
		fontSize: 16,
		backgroundColor: '#f9f9f9',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	icon: {
		marginLeft: 8,
	},
});
