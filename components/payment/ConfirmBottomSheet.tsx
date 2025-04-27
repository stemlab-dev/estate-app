import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '../ui/Button';
import colors from '@/constants/color';

export default function CheckInput({
	selectedId,
	selectedUsers,
	allUsers,
	handelSelectType,
	handelConfirm,
	handleOpenUsersModal,
}: {
	selectedId: string;
	allUsers: number;
	selectedUsers: number;
	handelSelectType: (id: string) => void;
	handelConfirm: () => void;
	handleOpenUsersModal: () => void;
}) {
	const userCheckOptions = [
		{
			id: 'AllUsers',
			title: 'All Users',
			total: allUsers,
		},
		{
			id: 'SpecificUsers',
			title: 'Specific Users',
			total: selectedUsers,
		},
	];
	const onSelect = useCallback(
		(id: string) => handelSelectType(id),
		[handelSelectType]
	);
	const onConfirm = useCallback(() => handelConfirm(), [handelConfirm]);
	const onOpen = useCallback(
		() => handleOpenUsersModal(),
		[handleOpenUsersModal]
	);

	return (
		<BottomSheetView style={styles.contentContainer}>
			<Text style={styles.title}>
				Select the person who will make the payment.
			</Text>
			<View style={styles.itemsContainer}>
				{userCheckOptions.map((item, index) => {
					if (index === 0) {
						return (
							<TouchableOpacity
								key={item.id}
								onPress={() => onSelect(item.id)}
								style={styles.container}
							>
								<View style={styles.checkboxContainer}>
									<Checkbox
										style={styles.checkbox}
										value={selectedId === item.id}
										onValueChange={() => onSelect(item.id)}
										color={
											selectedId === item.id ? colors.primary : colors.accent
										}
									/>
									<Text style={styles.optionText}>{item.title}</Text>
								</View>
								<Text
									style={{
										// fontWeight: 'bold',
										fontSize: 18,
									}}
								>
									{item.total} users
								</Text>
							</TouchableOpacity>
						);
					} else {
						return (
							<View key={item.id} style={styles.container}>
								<TouchableOpacity
									onPress={() => onSelect(item.id)}
									style={{ ...styles.checkboxContainer, flex: 1 }}
								>
									<Checkbox
										style={styles.checkbox}
										value={selectedId === item.id}
										onValueChange={() => onSelect(item.id)}
										color={
											selectedId === item.id ? colors.primary : colors.accent
										}
									/>
									<Text style={styles.optionText}>{item.title}</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={onOpen}>
									<Text
										style={{
											// fontWeight: 'bold',
											fontSize: 18,
											color: colors.primary,
										}}
									>
										{item.total} users
									</Text>
								</TouchableOpacity>
							</View>
						);
					}
				})}
				<Text
					style={
						{ fontSize: 14, color: colors.black, marginTop: 14}
					}
				>
					Users mention will get notify
				</Text>
				<View style={styles.buttonContainer}>
					<Button text="Done" handlePress={onConfirm} loading={false} />
				</View>
			</View>
		</BottomSheetView>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor: 'white',
		flex: 1,
		padding: 10,
		paddingHorizontal: 19,
		borderRadius: 16,
		flexDirection: 'column',
		// alignContent: 'space-between',
		justifyContent: 'space-around',
	},
	title: {
		fontWeight: 'semibold',
		fontSize: 18,
		// marginBottom: 12,
	},
	itemsContainer: {
		// gap: 8,
		// flex: 1,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 14,
		borderRadius: 10,
		// backgroundColor: 'ghostwhite',
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkbox: {
		marginRight: 5,
	},
	optionText: {
		fontSize: 16,
		textTransform: 'capitalize',
	},
	buttonContainer: {
		marginTop: 10,
	},
});
