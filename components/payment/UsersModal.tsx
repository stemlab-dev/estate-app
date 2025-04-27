import React, { useCallback } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import CheckUser from './CheckUser';
import Button from '../ui/Button';
import colors from '@/constants/color';
import {  FlatList } from 'react-native-gesture-handler';
import { BottomSheetView } from '@gorhom/bottom-sheet';

interface UserModalProps {
	data: any[];
	members: string[];
	setMembers: (members: string[]) => void;
	handleSubmit: () => void;
}

const UsersModal: React.FC<UserModalProps> = ({
	data,
	members,
	setMembers,
	handleSubmit,
}) => {
	// Optimize selection function with useCallback
	const handelSelectUser = useCallback(
		(id: string) => {
			setMembers((prev) =>
				prev.includes(id)
					? prev.filter((memberId) => memberId !== id)
					: [...prev, id]
			);
		},
		[setMembers]
	);

	// Memoize renderItem function to prevent unnecessary re-renders
	const renderItem = useCallback(
		({ item }: { item: any }) => (
			<CheckUser
				data={item}
				selectedUsers={members}
				handelSelect={handelSelectUser}
			/>
		),
		[members, handelSelectUser]
	);

	return (
		<BottomSheetView style={styles.contentContainer}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>
					Select Users {}
					<Text style={{ color: colors.primary }}>({members.length})</Text>
				</Text>
			</View>
			{/* User List */}
			<FlatList
				data={data}
				keyExtractor={(item) => item._id.toString()}
				renderItem={renderItem}
				contentContainerStyle={styles.itemsContainer}
			/>
			<View style={styles.itemContainer}>
				<Button text="Submit" handlePress={handleSubmit} loading={false} />
			</View>
		</BottomSheetView>
	);
};

export default UsersModal;

const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor: 'ghostwhite',
		flex: 1,
		padding: 10,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		alignItems: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		padding: 10,
	},
	cancelButton: {
		padding: 2,
		borderRadius: 50,
		backgroundColor: colors.failed,
	},
	buttonText: {
		color: 'white',
	},
	itemsContainer: {
		gap: 5,
	},
	itemContainer: {
		padding: 6,
	},
});
