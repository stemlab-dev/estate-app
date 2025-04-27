import colors from '@/constants/color';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// const DropdownComponent = () => {
const SelectRole = ({
	data,
	value,
	placeholder,
	setValue,
}: {
	data: any;
	value: string;
	placeholder: string;
	setValue: (role: string) => void;
}) => {
	const [isFocus, setIsFocus] = useState(false);

	return (
		<View style={styles.container}>
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: '#666' }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? placeholder : '...'}
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setValue(item.value);
					setIsFocus(false);
				}}
			/>
		</View>
	);
};

export default SelectRole;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'white',
		// padding: 16,
	},
	dropdown: {
		height: 50,
		borderColor: '#666',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
		color: colors.success,
		// backgroundColor: 'white',
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
		color: '#666',
	},
	selectedTextStyle: {
		fontSize: 16,
		color: '#666',
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
