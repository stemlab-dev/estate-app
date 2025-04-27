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

const index = () => {
	const { id } = useLocalSearchParams();
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
				<TouchableOpacity onPress={() => router.back()}>
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
				<Text>Issue Title: {id}</Text>
				<Pressable style={styles.continueButton} onPress={() => router.back()}>
					<Text style={styles.buttonText}>Send Report</Text>
				</Pressable>
				<Pressable style={styles.continueButton} onPress={() => router.back()}>
					<Text style={styles.buttonText}>Resolved</Text>
				</Pressable>
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
		backgroundColor: colors.black,
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
});
