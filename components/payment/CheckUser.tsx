import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '@/constants/color';

interface CheckUserProps {
	data: { _id: string; name: string; role: string };
	selectedUsers: string[];
	handelSelect: (id: string) => void;
}

const CheckUser: React.FC<CheckUserProps> = ({
	data,
	selectedUsers,
	handelSelect,
}) => {
	// Memoize the checked state
	const isChecked = useMemo(
		() => selectedUsers.includes(data._id),
		[selectedUsers, data._id]
	);

	// Optimize click handler
	const handlePress = useCallback(() => {
		handelSelect(data._id);
	}, [handelSelect, data._id]);

	return (
		<TouchableOpacity onPress={handlePress} style={styles.container}>
			<Checkbox
				style={styles.checkbox}
				value={isChecked}
				onValueChange={handlePress}
				color={isChecked ? '#4630EB' : colors.accent}
			/>
			<View style={styles.textWrap}>
				<Text style={styles.title}>{data.name}</Text>
				<Text style={styles.paragraph}>{data.role}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(CheckUser); // Memoized for performance

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderRadius: 10,
		backgroundColor: 'white',
	},
	textWrap: {
		paddingLeft: 10,
	},
	title: {
		fontSize: 18,
		textTransform: 'capitalize',
	},
	paragraph: {
		fontSize: 12,
		textTransform: 'capitalize',
		fontWeight: 'bold',
	},
	checkbox: {
		margin: 8,
	},
});
