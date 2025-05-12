import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TouchableOpacity,
	Image,
	StatusBar,
} from 'react-native';
import React, { useState } from 'react';
// import {  } from 'react-native-gesture-handler'
import colors from '@/constants/color';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { getErrorMessage } from '@/utils/getAxiosError';
import Toast from 'react-native-toast-message';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import LoaderModal from '@/components/LoaderModal';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;

const index = () => {
	const { _id, logo, name, members, description, status, address} = useLocalSearchParams();
	const { profile, role, token } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const queryClient = useQueryClient();

	// console.log('data received', logo);
	const handleRequest = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/hoas/requests`,
				{ estateId: _id },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			console.log('data received', data);
			Toast.show({
				type: 'success',
				text1: 'Request Sent!',
				text2: 'Hoa will verify your request soon',
			});
			queryClient.invalidateQueries({
				queryKey: ['index', 'payments', 'reports', 'notifications'],
			});
		} catch (error) {
			console.error('Error creating invoice:', error);
			const message = getErrorMessage(error);
			Toast.show({
				type: 'error',
				text1: 'Error logging in!',
				text2: message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: 10,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Estate Details</Text>
				<AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/>
			</View>

			<View style={styles.content}>
				<Image
					source={{
						uri:
							logo ||
							`https://ui-avatars.com/api/?name=${name}&&length=1&&background=random`,
					}}
					style={{ width: 120, height: 120, borderRadius: 60 }}
				/>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 18,
						textTransform: 'capitalize',
						marginBottom: 2,
					}}
				>
					{name}
				</Text>
				<View
					style={{
						...styles.formCard,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 10,
,					}}
				>
					<Text>Status: {status}</Text>
					<Text>Members: {members} </Text>
				</View>
				<Text style={styles.text}>Address: {address}</Text>
				<Text style={styles.text}>Description: {description}</Text>
				<View style={styles.buttons}>
					<Pressable style={styles.button} onPress={handleRequest}>
						<Text style={styles.buttonText}>Send request</Text>
					</Pressable>
				</View>
			</View>
			<LoaderModal loading={loading} />
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#f5f5f5',
	},
	content: {
		flexDirection: 'column',
		marginTop: 10,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},
	text: {
		paddingTop: 10,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	buttons: {
		marginTop: 10,
		flexDirection: 'row',
		gap: 2,
	},
	button: {
		width: '100%',
		backgroundColor: colors.primary,
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginVertical: 20,
	},
	formCard: {
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		backgroundColor: 'white',
	},
});
