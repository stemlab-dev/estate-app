import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getFontFamily } from '@/utils';
import colors from '@/constants/color';

const capitalizeFirstLetter = (str : string) => {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
};

const Info = ({
id, role, house
}: {
	id: string;
	house: string;
	role: string | undefined;
}) => {
	return (
		<View style={styles.card}>
			<View style={styles.item}>
				<Text style={styles.title}>Role</Text>
				<Text style={styles.text}>{capitalizeFirstLetter(role)}</Text>
			</View>
			<View style={styles.item}>
				<Text style={styles.title}>ID Number</Text>
				<Text style={styles.text}>{id}</Text>
			</View>
			<View style={styles.item}>
				<Text style={styles.title}>House</Text>
				<Text style={styles.text}>{house}</Text>
			</View>
		</View>
	);
};

export default Info;

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 6,
		// flex: 1,
		width: 'auto',
		backgroundColor: colors.white,
		borderColor: colors.grey,
		borderWidth: 1,
		borderRadius: 16,
		paddingVertical: 14,
		marginTop: 10,
		marginBottom: 6,
		paddingHorizontal: 10,
    },
    item: {
        padding: 2
    },
    title: {
        fontSize: 16,
		fontFamily:getFontFamily('Urbanist',500),
	},
	text: {
		fontSize: 18,
		fontFamily:getFontFamily('Urbanist',600),
	},
});


// 0012056076 access uduka oj