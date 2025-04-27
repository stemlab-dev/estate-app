import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../constants/color';
import { router } from 'expo-router';// Adjust the path if needed

interface HeaderProps {
	title: string;
	more: string;
	screenName: string // Accepts a valid screen name
}

const SectionHeader: React.FC<HeaderProps> = ({ title, more, screenName }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<TouchableOpacity onPress={() => router.navigate(screenName)}>
				<Text style={styles.more}>{more}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SectionHeader;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
	},
	more: {
		fontSize: 16,
		color: colors.primary,
	},
});
