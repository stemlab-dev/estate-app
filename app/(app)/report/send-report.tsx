import {
	AntDesign,
	FontAwesome,
	FontAwesome6,
	MaterialIcons,
} from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
	Alert,
	Button,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	Pressable,
	View,
	TextInput,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import { getErrorMessage } from '@/utils/getAxiosError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import colors from '@/constants/color';
import LoaderModal from '@/components/LoaderModal';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;

const sendreport = () => {
	const { category, isEditId, chat } = useLocalSearchParams();
	const [message, setMessage] = useState(chat || '');
	console.log('category', category, isEditId, chat);
	// useEffect(() => {
	// 	setMessage(chat);
	// }, [chat]);
	const [isLoading, setIsLoading] = useState(false);
	const { token } = useAuth();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (formData: any) => {
			if (isEditId) {
				return axios.patch(`${apiUrl}/reports/${isEditId}`, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			}
			return axios.post(`${apiUrl}/reports`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['bills', 'reports'],
			});
			Toast.show({
				type: 'success',
				text1: 'Report sent',
				text2: 'Incident reported successfully',
			});
			router.push('/(app)/reports'); // Reset form after success
		},
		onError: (error) => {
			const message = getErrorMessage(error);
			console.log(message);
			Toast.show({
				type: 'error',
				text1: 'Something went wrong',
				text2: message,
			});
		},
	});

	const handelSendReport = async () => {
		try {
			if (!message) {
				return Alert.alert('Error', 'Please enter a message');
			}
			setIsLoading(true);
			await mutation.mutateAsync({
				category,
				reason: message,
			});
		} catch (error) {
			const message = getErrorMessage(error);
			console.log(message);
			Toast.show({
				type: 'error',
				text1: 'Something went wrong',
				text2: message,
			});
			router.push('/(app)/reports');
		} finally {
			setIsLoading(false);
		}
	};

	// const handelPress = (item: any) => {
	// 	if (isEditId) {
	// 		router.back();
	// 		return;
	// 	}
	// 	router.push({
	// 		pathname: '/(app)/report',
	// 	});
	// };
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => router.back()} style={styles.cancelButton}>
					<AntDesign name="left" size={24} />
				</Pressable>
				<Text style={styles.title}>Why are you reporting this issue?</Text>
				<View>
					<Text style={styles.label}>Share us details</Text>
					<TextInput
						style={styles.textArea}
						multiline={true}
						numberOfLines={18}
						placeholder="Type your issue here..."
						value={message}
						onChangeText={setMessage}
					/>
				</View>
			</View>
			<View style={{ width: '100%' }}>
				<Pressable
					style={{
						...styles.submitButton,
						backgroundColor: message ? colors.primary : colors.grey,
					}}
					onPress={handelSendReport}
					disabled={isLoading}
				>
					<Text
						style={{
							...styles.submitText,
							color: message ? '#fff' : '#333',
						}}
					>
						{isLoading
							? 'Submitting...'
							: isEditId
							? 'Edit report'
							: 'Submit report'}
					</Text>
				</Pressable>
			</View>
			<Toast />
		</SafeAreaView>
	);
};

export default sendreport;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingBottom: 40,
		backgroundColor: '#f5f5f5',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	header: {
		marginBottom: 10,
	},
	cancelButton: {
		marginVertical: 20,
		paddingVertical: 10,
		fontSize: 18,
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 26,
	},
	submitButton: {
		backgroundColor: colors.black,
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginVertical: 20,
	},
	submitText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	label: {
		fontSize: 18,
		marginBottom: 10,
	},
	textArea: {
		height: 250,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 8,
		// backgroundColor: '#fff',
		textAlignVertical: 'top', // Ensures text starts at the top of the input
	},
});
