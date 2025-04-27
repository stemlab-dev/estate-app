import colors from '@/constants/color';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// const DropdownComponent = () => {
const SelectBank = ({
	data,
	placeholder,
	value,
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
				style={[styles.dropdown, isFocus && { borderColor: '#ccc' }]}
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

export default SelectBank;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'white',
		// padding: 16,
	},
	dropdown: {
		height: 50,
		borderColor: '#ccc',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		// backgroundColor: 'white',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
		color: colors.black,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
		color: colors.black,
	},
});
