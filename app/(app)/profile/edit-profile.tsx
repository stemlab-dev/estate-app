import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	Alert,
	StatusBar,
	ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import axios from 'axios';
import LoaderModal from '@/components/LoaderModal';
import ProfileInput from '@/components/ui/ProfileInput';
import colors from '@/constants/color';
import { Role, useAuth } from '@/context/authContext';
import { validateEmail, validatePhone } from '@/utils/Inputvalidator';
import { getErrorMessage } from '@/utils/getAxiosError';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFontFamily } from '@/utils';

const account = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const { token, profile, setProfile, setRole: setUserRole } = useAuth();
	const [name, setName] = useState<string>(profile.name);
	const [email, setEmail] = useState<string>(profile.email);
	const [phone, setPhone] = useState<string>(profile.phone);
	const [role, setRole] = useState<string>(profile.role);
	const [address, setAddress] = useState<string>('');
	const [errors, setErrors] = useState<any>({
		name: '',
		email: '',
		password: '',
	});
	const [selectedImage, setSelectedImage] = useState<string | null>(null); // Store the selected image URI
	// Function to upload the image to the server
	const roles = ['Landlord', 'Tenant'];

	const handleValidate = () => {
		let valid = true;
		const newErrors = { name: '', email: '', phone: '' };

		if (!name || !name.trim()) {
			newErrors.name = 'Name is required';
			valid = false;
		}
		if (name.length < 2) {
			newErrors.name = 'Name must be at least 2 characters';
			valid = false;
		}

		// Email Validation
		if (!email) {
			newErrors.email = 'Email is required';
			valid = false;
		} else if (!validateEmail(email)) {
			newErrors.email = 'Please enter a valid email';
			valid = false;
		}

		// Password Validation
		if (!phone) {
			valid = true;
		} else if (!validatePhone(phone)) {
			newErrors.phone = 'Please enter a valid phone';
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const updateProfile = async () => {
		const isValid = handleValidate();
		if (!isValid) {
			return;
		}
		try {
			const formData = new FormData();
			console.log('role', role.toUpperCase());
			if (selectedImage) {
				formData.append('profileImage', {
					uri: selectedImage,
					name: 'profile.jpg', // Name of the file
					type: 'image/jpeg', // Mime type
				} as any);
			}
			formData.append('name', name);
			formData.append('email', email);
			formData.append('role', role.toUpperCase());
			if (phone) {
				formData.append('phone', phone);
			}
			formData.append('address', address);
			console.log(formData);
			setLoading(true);
			const response = await axios.patch(`${apiUrl}/users/profile`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			});
			setLoading(false);
			// console.log('response.data', response.data);
			setProfile(response.data.user);
			setUserRole(response.data?.user.role.toUpperCase());
			// Alert.alert('Success', 'Profile image updated successfully!');
			router.push({
				pathname: '/success-page',
				params: {
					link: '/profile',
					message: 'Profile updated successfully!',
				},
			});
		} catch (error) {
			setLoading(false);
			const message = getErrorMessage(error);
			console.log(message);
			Toast.show({
				type: 'error',
				text1: 'Error updating profile',
				text2: message,
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					gap: 25,
					alignItems: 'center',
					marginTop: 10,
					marginBottom: 26,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Edit Account</Text>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.formCard}
			>
				<ProfileInput
					selectedImage={selectedImage}
					setSelectedImage={setSelectedImage}
				/>
				<View>
					<Text style={styles.label}>Name</Text>
					<TextInput
						style={styles.input}
						placeholder="name"
						value={name}
						onChangeText={setName}
					/>
					{errors.name ? (
						<Text style={styles.errorText}>{errors.name}</Text>
					) : null}
				</View>
				<View>
					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="email"
						value={email}
						onChangeText={setEmail}
					/>
					{errors.email ? (
						<Text style={styles.errorText}>{errors.email}</Text>
					) : null}
				</View>
				<View>
					<Text style={styles.label}>Phone</Text>
					<TextInput
						style={styles.input}
						placeholder="phone"
						value={phone}
						onChangeText={setPhone}
					/>
					{errors.phone ? (
						<Text style={styles.errorText}>{errors.phone}</Text>
					) : null}
				</View>
				{profile.role !== Role.ADMIN && (
					<View style={{ marginBottom: 10 }}>
						<Text style={styles.label}>Status</Text>
						<View style={styles.buttonWrap}>
							{roles.map((item: string, index: number) => (
								<TouchableOpacity
									key={index}
									onPress={() => setRole(item)}
									style={{
										...styles.button,
										backgroundColor:
											role === item ? colors.primary : colors.disable,
									}}
								>
									<Text
										style={{
											...styles.buttonText,
											color: role === item ? 'white' : 'black',
										}}
									>
										{item}
									</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
				)}
				<View>
					<Text style={styles.label}>Address</Text>
					<TextInput
						style={styles.input}
						placeholder="No. 10 abc road, kano state, nigeria"
						value={address}
						onChangeText={setAddress}
					/>
				</View>
				<Button
					text="Submit"
					loading={loading}
					bgColor={colors.primary}
					textColor="#FFF"
					handlePress={updateProfile}
				/>
			</ScrollView>
			<Toast />
			<LoaderModal loading={loading} />
		</SafeAreaView>
	);
};

export default account;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		padding: 12,
	},
	title: {
		fontFamily: getFontFamily('Urbanist', 500),
		fontSize: 24,
	},
	formCard: {
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 40,
		marginTop: 10,
		backgroundColor: 'white',
	},
	label: {
		fontSize: 12,
		marginBottom: 10,
		fontFamily: getFontFamily('DMSans', 500),
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
		fontFamily: getFontFamily('DMSans', 500),
	},
});
// 802dot11n
