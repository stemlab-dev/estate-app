import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Alert,
	Pressable,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import colors from '../../constants/color';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getErrorMessage } from '@/utils/getAxiosError';
import Loader from '@/components/Loader';
import { useAuth } from '@/context/authContext';

const Otp = () => {
	const [email, setEmail] = useState<string>('');
	const [otp, setOtp] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState({ email: '' });
	const { setToken, setProfile } = useAuth();

	// Validate email format using regex
	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Handle Continue button press
	const handleContinue = async () => {
		let valid = true;
		const newErrors = { email: '', password: '' };

		// Email Validation
		if (!email) {
			newErrors.email = 'Email is required';
			valid = false;
		} else if (!validateEmail(email)) {
			newErrors.email = 'Please enter a valid email';
			valid = false;
		}

		setErrors(newErrors);

		// If valid, navigate to EmailVerification
		if (valid) {
			try {
				setLoading(true);

				const url = `${process.env.EXPO_PUBLIC_API_URI}/auth/login`;
				const res = await axios.post(url, { email });
				await SecureStore.setItemAsync('accessToken', res.data.accessToken);
				await SecureStore.setItemAsync('refreshToken', res.data.refreshToken);
				await SecureStore.setItemAsync(
					'userInfo',
					JSON.stringify(res.data.user)
				);
				setToken(res.data.accessToken);
				setProfile(res.data.user);
				setLoading(false);
				router.navigate('/(app)');
			} catch (error) {
				setLoading(false);
				console.log('Error logging in', error);
				const message = getErrorMessage(error);
				Alert.alert('Error', message);
			}
		}
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<View style={styles.container}>
					{/* Title */}
					<View style={styles.contentContainer}>
						<View style={styles.header}>
							<Pressable onPress={() => router.back()}>
								<AntDesign name="arrowleft" size={24} color={colors.black} />
							</Pressable>
							<Text style={styles.title}>Reset password</Text>
							<AntDesign
								name="search1"
								size={24}
								color="black"
								style={{ opacity: 0 }}
							/>
						</View>

						{/* Email Input */}
						<Text
							style={{
								...styles.label,
								marginTop: 20,
							}}
						>
							Enter Email Address.
						</Text>
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="Enter your email"
								style={styles.input}
								keyboardType="email-address"
								value={email}
								onChangeText={(text) => setEmail(text)}
							/>
						</View>
						{errors.email ? (
							<Text style={styles.errorText}>{errors.email}</Text>
						) : null}
					</View>
					<View style={styles.continueContainer}>
						{/* Continue Button */}
						<TouchableOpacity
							style={styles.continueButton}
							onPress={handleContinue}
							disabled={loading}
						>
							<Text style={styles.continueButtonText}>Continue</Text>
						</TouchableOpacity>
					</View>
					<StatusBar backgroundColor={colors.greyBackground} />
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		height: '100%',
		justifyContent: 'space-between',
		flex: 1,
		paddingHorizontal: 10,
		backgroundColor: colors.greyBackground,
		// backgroundColor: '#fff',
	},
	header: {
		marginTop: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
	},
	subtitle: {
		fontSize: 14,
		color: '#666',
		marginVertical: 10,
		lineHeight: 20,
		marginBottom: 20,
	},
	label: {
		fontSize: 14,
		color: '#666',
		marginVertical: 5,
		lineHeight: 20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: 10,
		marginBottom: 10,
	},
	input: {
		padding: 15,
		flex: 1,
		fontSize: 16,
	},
	continueButton: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginVertical: 20,
	},
	continueButtonText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: '500',
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
		fontSize: 12,
	},
	contentContainer: {
		padding: 10,
		marginTop: 60,
		borderRadius: 10,
	},
	continueContainer: {
		paddingVertical: 10,
	},
	inssuredPolicy: {
		marginTop: 'auto',
		alignItems: 'center',
		marginBottom: 20,
	},
	forgotPasswordContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	forgotPasswordButton: {
		padding: 2,
	},
	inssuredText: {
		color: '#666',
		fontSize: 12,
		lineHeight: 18,
		textAlign: 'center', // Center text horizontally
	},
	footerText: {
		color: '#707070',
		fontSize: 14,
		marginBottom: 20,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	signInText: {
		color: colors.primary,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default Otp;
