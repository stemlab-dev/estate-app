import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	StatusBar,
	Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '@/constants/color';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { fetchPayment } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoaderModal from '@/components/LoaderModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import { getErrorMessage } from '@/utils/getAxiosError';
import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;

const index = () => {
	const { id, userId, amount, name, date, status } = useLocalSearchParams();
	const { token } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ['payments', id],
		queryFn: async () => fetchPayment(token, id),
	});
	useEffect(() => {
		if (data) {
			console.log('data ....', data);
		}
	}, [data]);
	const handelPayment = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/admins/payments/confirm-due-payment`,
				{
					userId,
					dueId: id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (data) {
				console.log(data);
				queryClient.invalidateQueries({ queryKey: ['payment', id] });
				router.push({
					pathname: '/payment/payment-details',
					params: { id },
				});
			}
		} catch (error) {
			const message = getErrorMessage(error);
			console.log(message);
			Alert.alert('Something went wrong', message || 'Something went wrong');
			// router.replace('/(app)/bills');
		} finally {
			setLoading(false);
		}
	};
	const handelPress = () => {
		router.push({
			pathname: '/payment/receipt',
			params: {
				id,
				amount,
				name,
				status: data?.status || status,
				date: data?.createdAt || date,
				link: '/payment/payment-details',
			},
		});
	};
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					padding: 10,
					gap: 10,
				}}
			>
				<TouchableOpacity onPress={() => router.push('/(app)')}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Payment Details</Text>
				{/* <AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/> */}
			</View>
			<View style={{ padding: 5, marginTop: 5 }}>
				<View
					style={{
						backgroundColor: colors.white,
						marginVertical: 10,
						padding: 10,
					}}
				>
					<View style={styles.textWrap}>
						<Text>Payment ID: </Text>
						<Text>{data?._id}</Text>
					</View>
					<View style={styles.textWrap}>
						<Text>Date:</Text>
						<Text>{moment(data?.createdAt).format('D MMM YY')}</Text>
					</View>
					<View style={styles.textWrap}>
						<Text>Time:</Text>
						<Text>{moment(data?.createdAt).format('hh:mma')}</Text>
					</View>
					<View style={styles.textWrap}>
						<Text>Payment Method:</Text>
						<Text>Transfer</Text>
					</View>
					<View
						style={{
							...styles.textWrap,
							borderTopColor: '#e5e5e5',
							borderTopWidth: 1,
						}}
					>
						<Text>Amount:</Text>
						<Text style={{ fontWeight: 'bold' }}>
							₦{data?.amount || amount}.00
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={{
						...styles.button,
						backgroundColor:
							data?.status === 'pending' ? colors.primary : colors.completed,
					}}
					onPress={data?.status === 'pending' ? handelPayment : handelPress}
				>
					<Text style={styles.buttonText}>
						{data?.status === 'pending'
							? 'Approve Payment'
							: 'Download Receipt'}
					</Text>
				</TouchableOpacity>
			</View>
			{isLoading ||
				(loading && <LoaderModal loading={isLoading} text="loading..." />)}
		</SafeAreaView>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#f5f5f5',
		padding: 10,
	},
	title: {
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},
	textWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
	},
	item: {
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
	},
	iconContainer: {
		paddingHorizontal: 10,
		paddingVertical: 12,
		borderRadius: 10,
	},

	text: {
		fontWeight: '600',
		fontSize: 14,
		color: 'white',
	},
	button: {
		// paddingVertical: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginVertical: 16,
	},
	buttonText: {
		color: colors.white,
		fontSize: 16,
		padding: 14,
		textAlign: 'center',
		fontWeight: '600',
		lineHeight: 26,
	},
});
