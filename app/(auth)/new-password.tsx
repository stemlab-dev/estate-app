import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Alert,
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

const NewPassword = () => {
	const [password, setPassword] = useState<string>('');
	const [cpassword, setCPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState({ password: '', cpassword: '' });
	const { setToken, setProfile } = useAuth();


	// Handle Continue button press
	const handleContinue = async () => {
		let valid = true;
		const newErrors = { password: '', cpassword: '' };

		// Email Validation
		if (!password) {
			newErrors.password = 'password is required';
			valid = false;
		} else if (!cpassword) {
			newErrors.cpassword = 'Please enter a valid email';
			valid = false;
		}

		// Password Validation
		if (!password) {
			newErrors.password = 'Password is required';
			valid = false;
		}

		setErrors(newErrors);

		// If valid, navigate to EmailVerification
		if (valid) {
			try {
				setLoading(true);

				const url = `${process.env.EXPO_PUBLIC_API_URI}/auth/login`;
				const res = await axios.post(url, { password });
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
						<Text style={styles.title}>New password</Text>

						{/* Email Input */}
						<Text
							style={{
								...styles.label,
								marginTop: 20,
							}}
						>
							Enter New password.
						</Text>
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="Enter your new password"
								style={styles.input}
								value={password}
								onChangeText={(text) => setPassword(text)}
							/>
						</View>
						{errors.password ? (
							<Text style={styles.errorText}>{errors.password}</Text>
						) : null}
						<Text style={styles.label}>Confirm password.</Text>
						<View style={styles.inputContainer}>
							<TextInput
								placeholder="Confirm password"
								style={styles.input}
								value={cpassword}
								onChangeText={(text) => setCPassword(text)}
							/>
						</View>
						{errors.cpassword ? (
							<Text style={styles.errorText}>{errors.cpassword}</Text>
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
		justifyContent: 'space-around',
		flex: 1,
		paddingHorizontal: 10,
		backgroundColor: colors.greyBackground,
		// backgroundColor: '#fff',
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
	header: {
		marginTop: 50,
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

export default NewPassword;
