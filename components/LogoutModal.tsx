import colors from '@/constants/color';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
	View,
	Text,
	Modal,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native';

const LoaderModal = ({
	showModal = false,
	setShowModal,
	handleContinue,
}: {
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
	handleContinue: () => void;
}) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={showModal}
			onRequestClose={() => setShowModal(false)}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<TouchableOpacity
						style={{ alignSelf: 'flex-end' }}
						onPress={() => setShowModal(false)}
					>
						<Feather name="x" size={24} />
					</TouchableOpacity>
					<Image
						source={require('../assets/images/warning.png')}
						style={styles.icon}
					/>
					<Text style={styles.modalTitle}>Logout</Text>
					<Text style={styles.modalMessage}>
						Are you sure you want to logout?
					</Text>

					<TouchableOpacity style={styles.modalbutton} onPress={handleContinue}>
						<Text style={styles.modalbuttonText}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
		width: '80%',
		maxWidth: 300,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	modalMessage: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: 'center',
	},
	modalbutton: {
		backgroundColor: colors.primary,
		padding: 10,
		borderRadius: 5,
		width: '100%',
		alignItems: 'center',
	},
	modalbuttonText: {
		color: '#fff',
		fontSize: 16,
	},
	icon: {
		width: 60,
		height: 60,
		resizeMode: 'contain',
		marginBottom: 10,
	},
});

export default LoaderModal;
