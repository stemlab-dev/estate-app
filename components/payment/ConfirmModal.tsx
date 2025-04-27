import colors from '@/constants/color';
import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Button from '../ui/Button';

const ConfirmModal = ({
	show,
	setShow,
	text,
	handelConfirm,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	text: string;
	handelConfirm: () => void;
}) => {
	return (
		<Modal animationType="slide" transparent={true} visible={show}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.text}>Are you sure!</Text>
					<Text style={styles.modalText}>
						Create payments for {}
						<Text style={{ fontWeight: 'bold', color: colors.primary }}>
							{text}
						</Text>{' '}
						{}
						users
					</Text>
					<View style={{ padding: 10 }}>
						<Button text="Confirm" handlePress={handelConfirm} />
						<Button
							text="Cancel"
							handlePress={() => setShow(false)}
							bgColor={colors.deem}
							textColor="#FFF"
						/>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: 'rgba(73, 72, 72, 0.5)',
	},
	modalContent: {
		backgroundColor: colors.white,
		padding: 10,
		paddingVertical: 20,
		borderRadius: 4,
		width: '80%',
		// alignItems: 'center',
	},
	modalText: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 10,
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		// color: colors.primary,
		marginBottom: 10,
	},
});

export default ConfirmModal;
