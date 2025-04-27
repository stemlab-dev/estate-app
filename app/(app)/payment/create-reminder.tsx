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
import React, { useCallback, useState } from 'react';
import Button from '@/components/ui/Button';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';
import LoaderModal from '@/components/LoaderModal';
import colors from '@/constants/color';
import { useAuth } from '@/context/authContext';
import SelectDropDown from '@/components/ui/Select';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;

const account = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { token, profile } = useAuth();
	const [name, setName] = useState<string>('');
	const [amount, setAmount] = useState<string>('');
	const [frequency, setFrequency] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [status, setStatus] = useState<string>('');
	const data = [
		{
			name: 'Standard Bank',
			value: 'Standard Bank',
		},
		{
			name: 'United Bank of Africa',
			value: 'United Bank of Africa',
		},
		{
			name: 'Fidelity Bank',
			value: 'Fidelity Bank',
		},
	];
	const [errors, setErrors] = useState<any>({
		name: '',
		type: '',
		amount: '',
		frequency: '',
		status: '',
	});

	const handleValidate = () => {
		let valid = true;
		const newErrors = {
			name: '',
			type: '',
			amount: '',
			frequency: '',
			status: '',
		};

		if (!name || !name.trim()) {
			newErrors.name = 'Payment Name is required';
			valid = false;
		}
		if (!type || !type.trim()) {
			newErrors.name = 'Select a payment type';
			valid = false;
		}
		if (!amount) {
			newErrors.name = 'Select a payment Amount';
			valid = false;
		}
		if (frequency.trim()) {
			newErrors.name = 'Select a payment frequency';
			valid = false;
		}
		if (!status || !status.trim()) {
			newErrors.name = 'Select a payment status';
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};
const handlePress = useCallback((index: number) => {
		console.log('index data', index);
		bottomSheetRef.current?.snapToIndex(index);
		setIsOpen(true);
	}, []);
	const updateBank = async () => {
		const isValid = handleValidate();
		if (!isValid) {
			return;
		}
		try {
			setLoading(true);
			const response = await axios.post(
				`${apiUrl}/payment/reminder`,
				{ name, type, amount, frequency, status },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setLoading(false);
			if (response.status === 200) {
				console.log('response.data', response.data);
				// setProfile(response.data);
				// setUserRole(response.data?.role.toUpperCase());
				Alert.alert('Success', 'Account updated successfully!');
				router.push({
					pathname: '/success-page',
					params: {
						link: '/profile',
						message: 'Bank Account updated successfully!',
					},
				});
			} else {
				Alert.alert('Error', 'Failed to Account. Please try again.');
			}
		} catch (error) {
			setLoading(false);
			console.error('Error Updating Account', error);
			Alert.alert('Error', 'An error occurred while uploading the image.');
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
				<Text style={styles.title}>Set a new Reminder</Text>
				<AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/>
			</View>
			<View style={styles.formCard}>
				<View>
					<Text style={styles.label}>Name</Text>
					<TextInput
						style={styles.input}
						placeholder="Abdullahi James"
						value={name}
						onChangeText={setName}
					/>
					{errors.name ? (
						<Text style={styles.errorText}>{errors.name}</Text>
					) : null}
				</View>
				<View>
					<Text style={styles.label}>Frequency</Text>
					<SelectDropDown
						placeholder="Select item.."
						data={data}
						setValue={setFrequency}
						value={frequency}
					/>
					{errors.type ? (
						<Text style={styles.errorText}>{errors.type}</Text>
					) : null}
				</View>
				<View>
					<Text style={styles.label}>Amount</Text>
					<TextInput
						style={styles.input}
						placeholder="10000"
						value={amount}
						onChangeText={setAmount}
					/>
					{errors.amount ? (
						<Text style={styles.errorText}>{errors.amount}</Text>
					) : null}
				</View>
				<View>
					<Text style={styles.label}>Type</Text>
					<SelectDropDown
						placeholder="Select item.."
						data={data}
						setValue={setType}
						value={type}
					/>
					{errors.frequency ? (
						<Text style={styles.errorText}>{errors.type}</Text>
					) : null}
				</View>
				<View>
					<Text style={styles.label}>Status</Text>
					<SelectDropDown
						placeholder="Select item.."
						data={data}
						setValue={setStatus}
						value={status}
					/>
					{errors.status ? (
						<Text style={styles.errorText}>{errors.status}</Text>
					) : null}
				</View>
				<Button
					text="Add Invoice"
					loading={loading}
					bgColor={colors.primary}
					textColor="#FFF"
					handlePress={updateBank}
				/>
			</View>
			<LoaderModal loading={loading} text="loading..." />
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
