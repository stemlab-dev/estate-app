import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import colors from '@/constants/color';

const PasswordInput = ({
	password,
	setPassword,
	isPasswordValid,
	setIsPasswordValid,
}: {
	password: string;
	setPassword: (password: string) => void;
	isPasswordValid: boolean;
	setIsPasswordValid: (isValid: boolean) => void;
}) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [strength, setStrength] = useState<string>('');

	// Validation rules
	const validateArray = [
		{
			text: 'Must contain at least 8 characters.',
			valid: password.length >= 8,
		},
		{
			text: 'Must contain at least one number.',
			valid: /\d/.test(password),
		},
		{
			text: 'Must contain at least one symbol.',
			valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		},
		{ text: 'Strong password.', valid: strength === 'Strong' },
		{ text: 'Can’t contain spaces', valid: !/\s/.test(password) },
	];

	// Validate password and update strength and validity
	const validatePassword = (input: string) => {
		setPassword(input);

		// Check for minimum length
		if (input.length < 8) {
			setStrength('Weak');
			setIsPasswordValid(false);
			return;
		}

		// Check for at least one number and one symbol
		const hasNumber = /\d/.test(input);
		const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(input);

		if (!hasNumber || !hasSymbol) {
			setStrength('Medium');
			setIsPasswordValid(false);
			return;
		}

		// If all conditions are met
		setStrength('Strong');
		setIsPasswordValid(true);
	};

	// Update password validity when password changes
	useEffect(() => {
		const isValid =
			password.length >= 8 &&
			/\d/.test(password) &&
			/[!@#$%^&*(),.?":{}|<>]/.test(password) &&
			!/\s/.test(password);
		setIsPasswordValid(isValid);
	}, [password]);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Password</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={password}
					onChangeText={validatePassword}
					secureTextEntry={!showPassword}
					placeholder="Enter your password"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				<TouchableOpacity
					style={styles.eyes}
					onPress={() => setShowPassword(!showPassword)}
				>
					{showPassword ? (
						<FontAwesome name="eye-slash" size={16} color="black" />
					) : (
						<FontAwesome name="eye" size={16} color="black" />
					)}
				</TouchableOpacity>
			</View>
			{!isFocused ? null : (
				<>
					{isPasswordValid ? null : (
						<>
							<Text
								style={[
									styles.strengthText,
									{
										color:
											strength === 'Weak'
												? 'red'
												: strength === 'Medium'
												? 'orange'
												: 'green',
									},
								]}
							>
								Password strength: {strength}
							</Text>
							{validateArray.map((item, index) => (
								<View key={index} style={styles.validationItem}>
									{item.valid ? (
										<Feather name="check" size={12} color="green" />
									) : (
										<Feather name="x" size={12} color="red" />
									)}
									<Text style={styles.requirements}>{item.text}</Text>
								</View>
							))}
						</>
					)}
				</>
			)}
		</View>
	);
};

export default PasswordInput;

const styles = StyleSheet.create({
	container: {
		// padding: 2,
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
		flex: 1,
		padding: 15,
		fontSize: 16,
	},
	eyes: {
		padding: 10,
	},
	strengthText: {
		fontSize: 14,
		marginBottom: 8,
	},
	validationItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	requirements: {
		fontSize: 12,
		color: '#666',
		marginLeft: 4,
	},
});
