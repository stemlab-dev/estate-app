import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Alert,
} from 'react-native';
import colors from '../../constants/color';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getErrorMessage } from '@/utils/getAxiosError';
import Loader from '@/components/LoaderModal';
import SelectRole from '@/components/auth/SelectRole';
import PasswordInput from '@/components/auth/PasswordInput';
import Toast from 'react-native-toast-message';
import { roles } from '@/constants/data';
import { useAuth } from '@/context/authContext';

const Register = () => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
	const [role, setUserRole] = useState<string>('Tenant');
	const [errors, setErrors] = useState({ email: '', password: '' });
	const { setToken, setRole, setProfile } = useAuth();

	// Validate email format using regex
	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Handle Continue button press
	const handleContinue = async () => {
		// router.push('/(auth)/address');
		// return;
		let valid = true;
		const newErrors = { name: '', email: '', password: '' };
		// Password Validation
		if (!name.trim()) {
			newErrors.name = 'Name is required';
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
		if (!password) {
			newErrors.password = 'Password is required';
			valid = false;
		}

		setErrors(newErrors);

		// If valid, navigate to EmailVerification
		if (valid) {
			const data = {
				name: name.toLowerCase(),
				email: email.toLowerCase(),
				password,
				role: role.toUpperCase(),
			};
			try {
				setLoading(true);
				// console.log('data loaded', data);
				const res = await axios.post(
					`${process.env.EXPO_PUBLIC_API_URI}/auth/register`,
					data
				);
				console.log(res.data);
				setRole(res?.data?.user?.role.toUpperCase());
				await SecureStore.setItemAsync('accessToken', res.data.accessToken);
				await SecureStore.setItemAsync('refreshToken', res.data.refreshToken);
				await SecureStore.setItemAsync(
					'userInfo',
					JSON.stringify(res.data.user)
				);
				setToken(res.data.accessToken);
				setProfile(res.data.user);
				setLoading(false);
				Toast.show({
					type: 'success',
					text1: 'Success',
					text2: 'Registration successful',
				});
				router.push('/(auth)/address');
			} catch (error) {
				setLoading(false);
				console.log('Registration error', error);
				const message = getErrorMessage(error);
				Toast.show({
					type: 'error',
					text1: 'Registration error',
					text2: message,
				});
			}
		}
	};

	return (
		<View style={styles.container}>
			{/* Title */}
			<View style={styles.contentContainer}>
				<Text style={styles.title}>Signup to your account</Text>
				<Text
					style={{
						...styles.label,
						marginTop: 20,
					}}
				>
					Enter your full name.
				</Text>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Enter your name"
						style={styles.input}
						// keyboardType="text"
						value={name}
						onChangeText={(text) => setName(text)}
					/>
				</View>
				{errors.email ? (
					<Text style={styles.errorText}>{errors.email}</Text>
				) : null}
				{/* Email Input */}
				<Text style={styles.label}>Enter Email Address.</Text>

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

				{/* Password Input */}
				<PasswordInput
					password={password}
					setPassword={setPassword}
					isPasswordValid={isPasswordValid}
					setIsPasswordValid={setIsPasswordValid}
				/>
				{isPasswordValid && (
					<>
						<Text style={styles.label}>Role</Text>
						<SelectRole
							placeholder="Select Role"
							data={roles}
							value={role}
							setValue={setUserRole}
						/>
					</>
				)}
			</View>
			<View style={styles.continueContainer}>
				<View style={styles.inssuredPolicy}>
					<Text style={styles.inssuredText}>
						By logging in, you agree to Likee's Policy.
						<Text style={styles.signInText}>Terms of Service and Privacy </Text>
						and will be notified when you have logged out.
					</Text>
				</View>
				{/* Continue Button */}
				<TouchableOpacity
					style={styles.continueButton}
					onPress={handleContinue}
					// disabled={loading || !isPasswordValid}
				>
					<Text style={styles.continueButtonText}>Sign Up</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.footerText}
					onPress={() => router.navigate('/login')}
				>
					<Text>Already have an account?</Text>
					<Text style={styles.signInText}>Login</Text>
				</TouchableOpacity>
			</View>
			{loading && <Loader />}
			<StatusBar backgroundColor={colors.greyBackground} />
		</View>
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
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 30,
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
	contentContainer: {
		padding: 10,
		marginTop: 60,
		borderRadius: 10,
	},
	continueButton: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		borderRadius: 5,
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
	continueContainer: {
		paddingVertical: 10,
	},
	inssuredPolicy: {
		marginTop: 'auto',
		alignItems: 'center',
		marginBottom: 20,
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

export default Register;
