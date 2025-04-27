import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign} from '@expo/vector-icons';

const data = [
	{ label: 'Option 1', value: '1' },
	{ label: 'Option 2', value: '2' },
	{ label: 'Option 3', value: '3' },
	{ label: 'Option 4', value: '4' },
];

const DropdownHeader = () => {
	const [selectedValue, setSelectedValue] = useState(null);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Football Field Management</Text>
			<Dropdown
				style={styles.dropdown}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder="Select Field"
				searchPlaceholder="Search..."
				value={selectedValue}
				onChange={(item) => {
					setSelectedValue(item.value);
				}}
				renderLeftIcon={() => (
					<AntDesign
						style={styles.icon}
						color="black"
						name="Safety"
						size={20}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: '#f5f5f5',
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center',
	},
	dropdown: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		backgroundColor: 'white',
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	icon: {
		marginRight: 5,
	},
});

export default DropdownHeader;
