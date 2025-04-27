import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	SafeAreaView,
	TextInput,
	Alert,
	StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';
import LoaderModal from '@/components/LoaderModal';
import ProfileInput from '@/components/ui/ProfileInput';
import colors from '@/constants/color';
import { Role, useAuth } from '@/context/authContext';
import { validateEmail, validatePhone } from '@/utils/Inputvalidator';
import SelectBank from '@/components/auth/SelectBank';
import { getErrorMessage } from '@/utils/getAxiosError';
import Toast from 'react-native-toast-message';
import { getBanks } from '@/api';
import { useQuery } from '@tanstack/react-query';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;

const account = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { token } = useAuth();
	const [accountName, setAccountName] = useState<string>('');
	const [accountNumber, setAccountNumber] = useState<string>('');
	const [bank, setBank] = useState<string>('');
	const [banks, setBanks] = useState<[]>([]);
	const { data, isLoading } = useQuery({
		queryKey: ['banks'],
		queryFn: async () => getBanks(),
	});
	useEffect(() => {
		if (data) {
			// console.log('data', data);
			const newBanks = data.data.map((item: any) => {
				return {
                    value: item.id,
                    label: item.name,
                };
			})
			setBanks(newBanks);
		}
	}, [data]);
	const [errors, setErrors] = useState<any>({
		name: '',
		bank: '',
		accountNumber: '',
	});

	const handleValidate = () => {
		let valid = true;
		const newErrors = { name: '', bank: '', accountNumber: '' };

		if (!accountName || !accountName.trim()) {
			newErrors.name = 'Account Name is required';
			valid = false;
		}
		if (!bank || !bank.trim()) {
			newErrors.name = 'Select a valid bank';
			valid = false;
		}

		// accountNumber Validation
		if (!validatePhone(accountNumber)) {
			newErrors.accountNumber = 'Please enter a account Number';
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const updateBank = async () => {
		const isValid = handleValidate();
		if (!isValid) {
			console.log('invalid');
			return;
		}
		try {
			setLoading(true);
			const response = await axios.patch(
				`${apiUrl}/admins/payments/update-bank`,
				{ accountName, bank, accountNumber },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setLoading(false);
			console.log('response.data', response.data);
			router.push({
				pathname: '/success-page',
				params: {
					link: '/profile',
					message: 'Bank Account updated successfully!',
				},
			});
		} catch (error) {
			setLoading(false);
			console.error('Error Updating Account', error);
			const message = getErrorMessage(error);
			Toast.show({
				type: 'error',
				text1: 'Error Updating Account!',
				text2: message,
				position: 'bottom',
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: 10,
					marginBottom: 26,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Add Account</Text>
				<AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/>
			</View>
			<View style={styles.formCard}>
				<View>
					<Text style={styles.label}>Account Number</Text>
					<TextInput
						style={styles.input}
						placeholder="Account Number"
						value={accountNumber}
						onChangeText={setAccountNumber}
					/>
					{errors.accountNumber ? (
						<Text style={styles.errorText}>{errors.accountNumber}</Text>
					) : null}
				</View>
				<View>
					<Text style={styles.label}>Bank Account</Text>
					<SelectBank data={banks} setValue={setBank} value={bank} />
					{errors.bank ? (
						<Text style={styles.errorText}>{errors.bank}</Text>
					) : null}
				</View>
				<View>
					<Text style={styles.label}>Name</Text>
					<TextInput
						style={styles.input}
						placeholder="Abdullahi James"
						value={accountName}
						onChangeText={setAccountName}
					/>
					{errors.name ? (
						<Text style={styles.errorText}>{errors.name}</Text>
					) : null}
				</View>
				<Button
					text="Save Bank Account"
					loading={loading || isLoading}
					bgColor={colors.primary}
					textColor="#FFF"
					handlePress={updateBank}
				/>
			</View>
			<LoaderModal loading={loading} text="Loading..." />
		</SafeAreaView>
	);
};

export default account;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		padding: 10,
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
	},
	formCard: {
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		backgroundColor: 'white',
	},
	label: {
		fontSize: 18,
		marginBottom: 10,
		fontWeight: 'bold',
	},
	input: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		marginBottom: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
	},
	buttonWrap: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginBottom: 10,
		gap: 10,
	},
	button: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	errorText: {
		color: 'red',
		fontSize: 10,
		marginTop: 2,
	},
	buttonText: {
		color: '#FFF',
		fontSize: 16,
		textAlign: 'center',
	},
});
