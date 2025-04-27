import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '@/constants/color';

interface Props{
	text: string;
	loading?: boolean;
	bgColor?: string;
	textColor?: string;
	handlePress?: () => void;
}
const Button = ({
	text,
	handlePress,
	loading,
	bgColor,
	textColor,
}:Props) => {
	return (
		<TouchableOpacity
			style={{
				...styles.continueButton,
				backgroundColor: bgColor ? bgColor : colors.primary,
			}}
			onPress={handlePress}
			disabled={loading}
		>
			<Text
				style={{
					...styles.continueButtonText,
					color: textColor ? textColor : '#FFF',
				}}
			>
				{loading ? 'Loading...' : text}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	continueButton: {
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginVertical: 20,
	},
	continueButtonText: {
		fontSize: 16,
		fontWeight: '500',
	},
});
