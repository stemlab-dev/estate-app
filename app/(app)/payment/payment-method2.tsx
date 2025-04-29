import LoaderModal from '@/components/LoaderModal';
import colors from '@/constants/color';
import { useAuth } from '@/context/authContext';
import { getErrorMessage } from '@/utils/getAxiosError';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Monnify from '@adsesugh/monnify-react-native';

const paymentMethod = () => {
	const { token, profile } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const { id, amount, name } = useLocalSearchParams();
	const [modalVisible, setModalVisible] = useState<boolean>(true);
	// const [paymentInitiated, setPaymentInitiated] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const apiUrl = process.env.EXPO_PUBLIC_API_URI;
	useEffect(() => {
		console.log('Amount provided profile', profile);
		if (!amount) {
			router.push({
				pathname: '/bills',
				params: { id, amount },
			});
		}
	}, [amount]);
	useEffect(() => {
		// setPaymentInitiated(true);
		setModalVisible(true);
	}, []);

	const handlePaymentSuccess = async (response: any) => {
		Toast.show({
			type: 'success',
			text1: 'Hello',
			text2: 'Payment Successful 👋',
		});
		try {
			console.log('Payment Successful', `Transaction ID: ${response}`);
			setModalVisible(false);
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/payments`,
				{
					amount,
					invoiceId: id,
					paymantRef: response?.transactionReference,
					...response,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (data) {
				console.log(data);
				queryClient.invalidateQueries({ queryKey: ['reports'] });
				queryClient.invalidateQueries({ queryKey: ['payment', id] });
				Toast.show({
					type: 'success',
					text1: 'Payment sent',
					text2: 'Payment successful',
				});
				router.push({
					pathname: '/payment/payment-details',
					params: { id, amount },
				});
			}
		} catch (error) {
			const message = getErrorMessage(error);
			console.log(message);
			Toast.show({
				type: 'error',
				text1: 'Something went wrong',
				text2: message,
			});
		} finally {
			setLoading(false);
		}
	};

	const paymentParameters = {
		amount: amount,
		currency: 'NGN',
		reference: `${new String(new Date().getTime())}`,
		customerFullName: profile?.name,
		customerEmail: profile?.email,
		customerMobileNumber: profile?.phone || '09012345678',
		apiKey: process.env.EXPO_PUBLIC_MONNIFY_API_KEY,
		contractCode: process.env.EXPO_PUBLIC_MONNIFY_CONTRACT_CODE,
		paymentDescription: name,
		// mode: 'TEST',
	};

	const onSuccess = (response: any) => {
		console.log('Payment Successful:', response);
		handlePaymentSuccess(response);
	};

	const onError = (response: any) => {
		console.log('Payment Failed:', response);
		Toast.show({
			type: 'error',
			text1: 'Payment Closed',
			text2: 'The payment window was closed.',
		});
		setModalVisible(false);
		router.navigate('/bills');
		// Handle error scenario
	};

	const onDismiss = () => {
		setModalVisible(!modalVisible);
		router.navigate('/bills');
	};

	return (
		<SafeAreaView style={styles.container}>
			<Monnify
				paymentParams={paymentParameters}
				onSuccess={onSuccess}
				onError={onError}
				onDismiss={onDismiss}
				visible={modalVisible}
			/>
			<LoaderModal loading={loading} />
			<Toast />
		</SafeAreaView>
	);
};
export default paymentMethod;
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		flexDirection: 'column',
		backgroundColor: colors.white,
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
		marginTop: 10,
	},

	content: {
		width: '100%',
		flex: 1,
		padding: 10,
		flexDirection: 'column',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	header: {
		padding: 10,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		fontWeight: '600',
		fontSize: 14,
		color: 'white',
	},
	pressable: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		borderRadius: 10,
		marginBottom: 5, // added to separate items
		backgroundColor: colors.primary,
		borderColor: 'gray',
		color: 'white',
		// borderWidth: 1,
		// marginBottom: 20,
	},
	item: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	iconContainer: {
		paddingHorizontal: 10,
		paddingVertical: 12,
		borderRadius: 10,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
