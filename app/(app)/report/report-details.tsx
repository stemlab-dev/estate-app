import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import React from 'react';
// import {  } from 'react-native-gesture-handler'
import colors from '@/constants/color';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import StatusBtn from '@/components/issue/StatusBtn';

const index = () => {
	const {
		createdAt,
		status,
		category,
		reason,
	} = useLocalSearchParams();
	const data = useLocalSearchParams();
	// console.log('params', data._id);
	const handleEditReport = () => {
		router.navigate({
			pathname: '/report/send-report',
			params: { category: category, isEditId: data._id, chat: reason },
		});
	};
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: 10,
				}}
			>
				<TouchableOpacity onPress={() => router.push('/reports')}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Report Details</Text>
				<AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/>
			</View>

			<View style={styles.formCard}>
				<View style={styles.content}>
					<Text style={styles.label}>
						Issue Title:{' '}
						<Text style={{ textTransform: 'capitalize' }}>{category}</Text>
					</Text>
					<Text style={styles.label}>
						Report Date:
						<Text> {moment(createdAt).format('ll')}</Text>
					</Text>
					<Text style={styles.label}>
						Report Status: <StatusBtn status={status} />
					</Text>
					<Text style={styles.label}>Reason:</Text>
					<View style={styles.descriptionsContainer}>
						<Text style={styles.descriptionsText}>{reason}</Text>
					</View>
				</View>
				{status !== 'resolved' && (
					<Pressable style={styles.continueButton} onPress={handleEditReport}>
						<Text style={styles.buttonText}>Edit Report</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	continueButton: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginVertical: 20,
	},
	formCard: {
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		backgroundColor: 'white',
	},
	content: {
		padding: 5,
	},
	label: {
		padding: 5,
		// color: '#fff',
		fontWeight: 'bold',
	},
	descriptionsContainer: {
		padding: 10,
		backgroundColor: '#fff',
		borderRadius: 5,
		borderColor: colors.grey,
		borderWidth: 1,
	},
	descriptionsText: {
		fontSize: 16,
		minHeight: 250,
	},
});
