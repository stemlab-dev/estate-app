import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '@/constants/color';
import { getFontFamily } from '@/utils';

const TabButtons = ({
	screens,
	tab,
	filterData
}: {
	screens: any[];
	tab: string;
	filterData: (tab: string) => void;
}) => {
	return (
		<View style={styles.buttonWrap}>
			{screens.map((item: string, index: number) => (
				<TouchableOpacity
					key={index}
					onPress={() => filterData(item)}
					style={{
						...styles.button,
						backgroundColor:
							tab === item ? colors.primary : colors.disable,
						borderColor: tab === item ? colors.primary : colors.grey
					}}
				>
					<Text
						style={{
							...styles.buttonText,
							color: tab === item ? 'white' : 'black',
						}}
					>
						{item}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default TabButtons;

const styles = StyleSheet.create({
	buttonWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 10,
		gap: 8,
	},
	button: {
		// paddingHorizontal: 16,
		paddingVertical: 7,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.gray,
		flex: 1,
	},
	buttonText: {
		color: '#FFF',
		fontSize: 12,
		fontFamily:getFontFamily("Urbanist"),
		textAlign: 'center',
	},
});
