import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Alert,
	StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoaderModal from '@/components/LoaderModal';
import { useAuth } from '@/context/authContext';
import axios from 'axios';
import { getErrorMessage } from '@/utils/getAxiosError';
import { useLocalSearchParams } from 'expo-router';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;
import { router } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import colors from '@/constants/color';
import * as Clipboard from 'expo-clipboard';

const bankTransfer = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const { token } = useAuth();
	const { id, amount } = useLocalSearchParams();
	const copyToClipboard = async (text: string) => {
		await Clipboard.setStringAsync(text);
	};
	// const [banks setBanks] = useState<[]>([]);
	// const { data, isLoading } = useQuery({
	// 	queryKey: ['banks'],
	// 	queryFn: async () => getBanks(),
	// });
	// useEffect(() => {
	// 	if (data) {
	// 		console.log('data', data);
	// 		const newBanks = data.data.map((item: any) => {
	// 			return {
	// 				value: item.id,
	// 				label: item.name,
	// 			};
	// 		})
	// 		setBanks(newBanks);
	// 	}
	// }, [data]);
	const accountInfor = {
		accountNumber: '9035095173',
		accountName: 'Abdulsalam mohammed',
		bankName: 'Opay',
	};
	const handelPayment = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/payments/dues`,
				{
					amount,
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
				queryClient.invalidateQueries({ queryKey: ['reports'] });
				Alert.alert('Payment sent', 'Due payment successful');
				router.push({
					pathname: '/payment/payment-details',
					params: { id, amount },
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
						<AntDesign name="left" size={24} color={colors.primary} />
					</TouchableOpacity>
					<Text style={styles.title}>Bank transfer</Text>
					<AntDesign
						name="search1"
						size={24}
						color="black"
						style={{ opacity: 0 }}
					/>
				</View>
			</View>
			<View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
				<View style={styles.content}>
					<View style={styles.textWrap}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={styles.text}>Account Number:</Text>
							<Text style={styles.copiedText}>
								{accountInfor.accountNumber}
							</Text>
						</View>
						<TouchableOpacity onPress={() => copyToClipboard('hello world')}>
							<Feather name="copy" size={20} />
						</TouchableOpacity>
					</View>
					<View style={styles.textWrap}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={styles.text}>Bank Name:</Text>
							<Text style={styles.copiedText}>{accountInfor.bankName}</Text>
						</View>
						{/* <TouchableOpacity onPress={() => copyToClipboard('First bank')}> */}
						<Feather name="copy" size={20} style={{ opacity: 0 }} />
						{/* </TouchableOpacity> */}
					</View>
					<View style={styles.textWrap}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={styles.text}>Account Name:</Text>
							<Text style={styles.copiedText}>{accountInfor.accountName}</Text>
						</View>
						{/* <TouchableOpacity onPress={() => copyToClipboard('hello estate')}> */}
						<Feather name="copy" size={20} style={{ opacity: 0 }} />
						{/* </TouchableOpacity> */}
					</View>
					<View style={styles.textWrap}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={styles.text}>Amount:</Text>
							<Text style={styles.copiedText}>{amount}</Text>
						</View>
						<TouchableOpacity
							style={styles.btn}
							onPress={() => copyToClipboard(amount)}
						>
							<Feather name="copy" size={20} />
						</TouchableOpacity>
					</View>
				</View>
				<Button text="I have make transfer" handlePress={handelPayment} />
			</View>

			{loading && <LoaderModal loading={loading} text="Loading" />}
		</SafeAreaView>
	);
};

export default bankTransfer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		padding: 5,
		flexDirection: 'column',
		backgroundColor: colors.white,
		justifyContent: 'center',
	},
	header: {
		padding: 10,
		marginTop: 15,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'semibold',
		marginTop: 10,
	},
	content: {
		backgroundColor: colors.gray,
		padding: 5,
		// paddingVertical: 20,
		borderRadius: 20,
	},
	text: {
		fontSize: 16,
	},
	copiedText: {
		// flex: 1,
		marginLeft: 5,
		fontSize: 18,
		fontWeight: 'bold',
	},
	textWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
	},
	btn: {
		alignSelf: 'flex-end',
		// paddingRight: 20
	},
});
