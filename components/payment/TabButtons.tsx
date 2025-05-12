import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '@/constants/color';

const TabButtons = ({
	screens,
	tab,
	setTab,
}: {
	screens: any[];
	tab: string;
	setTab: (tab: string) => void;
}) => {
	return (
		<View style={styles.buttonWrap}>
			{screens.map((item: any, index: number) => (
				<TouchableOpacity
					key={index}
					onPress={() => setTab(item.screen)}
					style={{
						...styles.button,
						backgroundColor:
							tab === item.screen ? colors.primary : colors.disable,
						borderColor:
							tab === item.screen ? colors.primary : colors.borderLight,
					}}
				>
					<Text
						style={{
							...styles.buttonText,
							color: tab === item.screen ? 'white' : 'black',
						}}
					>
						{item.name}
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
		// padding:10,
		gap: 2,
	},
	button: {
		// paddingHorizontal: 16,
		paddingVertical: 7,
		borderRadius: 12,
		borderWidth: 1,
		flex: 1,
	},
	buttonText: {
		color: '#FFF',
		fontSize: 12,
		textAlign: 'center',
	},
});
