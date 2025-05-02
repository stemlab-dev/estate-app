import LoaderModal from '@/components/LoaderModal';
import colors from '@/constants/color';
import { useAuth } from '@/context/authContext';
import { getErrorMessage } from '@/utils/getAxiosError';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	Pressable,
	Alert,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import { Paystack } from 'react-native-paystack-webview';
import Toast from 'react-native-toast-message';

const paymentMethod = () => {
	const { token, profile } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
       const { id, amount, name } = useLocalSearchParams();
	const [paymentInitiated, setPaymentInitiated] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const apiUrl = process.env.EXPO_PUBLIC_API_URI;
	useEffect(() => {
		if (!amount) {
			router.push({
				pathname: '/payment/payment-details',
				params: { id, amount },
			});
		}
	}, [amount]);

	const handlePaymentSuccess = async (response: any) => {
		Toast.show({
			type: 'success',
			text1: 'Hello',
			text2: 'Payment Successful 👋',
		});
		try {
			console.log('Payment Successful', `Transaction ID: ${response}`);
			setPaymentInitiated(false);
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/payments`,
				{
					amount,
					invoiceId: id,
					paymantRef: response?.data?.transactionRef?.reference,
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
	const handlePaymentClose = () => {
		Toast.show({
			type: 'error',
			text1: 'Payment Closed',
			text2: 'The payment window was closed.',
		});
		setPaymentInitiated(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<TouchableOpacity onPress={() => router.navigate('/')}>
						<AntDesign name="left" size={24} />
					</TouchableOpacity>
					<Text style={styles.title}>Payment Method</Text>
					<AntDesign
						name="search1"
						size={24}
						color="black"
						style={{ opacity: 0 }}
					/>
				</View>
			</View>

			<View style={styles.content}>
				<Pressable
					onPress={() => setPaymentInitiated(true)}
					style={styles.pressable}
				>
					<View style={styles.item}>
						<View style={styles.iconContainer}>
							<AntDesign name="creditcard" size={16} color={colors.white} />
						</View>
						<Text style={[styles.text, { color: colors.white }]}>
							Pay with Paystack
						</Text>
					</View>
					<View style={styles.iconContainer}>
						<AntDesign name="right" size={18} color={colors.white} />
					</View>
				</Pressable>

				{paymentInitiated && (
					<Paystack
						paystackKey={process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY} // Replace with your Paystack public key
						amount={amount} // Amount in kobo (e.g., 500000 = ₦5,000)
						billingEmail={profile.email} // User's email
						activityIndicatorColor="blue"
						onCancel={handlePaymentClose}
						onSuccess={handlePaymentSuccess}
						autoStart={true}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};
export default paymentMethod;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		flexDirection: 'column',
		backgroundColor: colors.white,
		// justifyContent: 'center',
		width: '100%',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
		marginTop: 10,
	},

	content: {
		// flex: 1,
		width: '100%',
		padding: 10,
		gap: 2,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
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
		width: '100%',
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
});
