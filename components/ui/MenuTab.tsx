import { Pressable, StyleSheet, Text, ScrollView, View } from 'react-native';
import React from 'react';
import colors from '@/constants/color';
import { getFontFamily } from '@/utils';

const MenuTab = ({
	filterTypes,
	filterBy,
	handleCategoryChange,
}: {
	filterTypes: string[];
	filterBy: string;
	handleCategoryChange: (category: string) => void;
}) => {
	return (
		<View
			style={{
				borderColor: colors.borderLight,
				borderWidth: 1,
				borderRadius: 8,
			}}
		>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					width: '100%',
					flex: 1,
					gap: 2,
				}}
			>
				{filterTypes.map((item, index) => (
					<Pressable
						style={{
							...styles.menuBtn,
							backgroundColor:
								filterBy === item ? colors.primary : 'transparent',
						}}
						key={index}
						onPress={() => handleCategoryChange(item)}
					>
						<Text
							style={{
								...styles.text,
								fontSize: 12,
								fontWeight: 'semibold',
								color: filterBy === item ? 'white' : colors.dark,
							}}
						>
							{item}
						</Text>
					</Pressable>
				))}
			</ScrollView>
		</View>
	);
};

export default MenuTab;

const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		fontFamily: getFontFamily('DMSans', 600),
	},
	menuBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		width: 'auto',
		height: 44,
		borderRadius: 8,
	},
});
