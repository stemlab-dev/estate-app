import colors from '@/constants/color';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function CheckInput({
	data,
	handelSelect,
}: {
	data: any;
	handelSelect: (id: string) => void;
}) {
	const [isChecked, setChecked] = useState(false);
	const handlePress = (id: string) => {
		console.log('id:', id);
		setChecked(!isChecked);
		handelSelect(id);
	};
	return (
		<TouchableOpacity
			onPress={() => handlePress('hello world')}
			style={styles.container}
		>
			<View style={styles.section}>
				<Checkbox
					style={styles.checkbox}
					value={isChecked}
					onValueChange={setChecked}
					color={isChecked ? '#4630EB' : colors.accent}
				/>
				<Text style={styles.paragraph}>Custom color </Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		borderRadius: 10,
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 5,
	},
	paragraph: {
		fontSize: 15,
	},
	checkbox: {
		margin: 8,
	},
});
