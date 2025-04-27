import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Button from '@/components/ui/Button';
import { router, useLocalSearchParams } from 'expo-router';
import colors from '@/constants/color';

const success = () => {
	const { message, link } = useLocalSearchParams();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.imageView}>
					<Image
						source={require('@/assets/images/success.png')}
						style={{ width: 70, height: 70, alignSelf: 'center' }}
					/>
				</View>
				<Text style={styles.text}>{message}</Text>
				<View style={styles.buttonContainer}>
					<Button text="Okay" handlePress={() => router.push(link)} />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default success;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
		padding: 20,
		borderRadius: 10,
	},
	imageView: {
		width: 200,
		height: 200,
		borderRadius: 10,
		marginBottom: 10,
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10,
	},
	buttonContainer: {
		width: '100%',
		marginTop: 30,
		padding: 10,
	},
});
