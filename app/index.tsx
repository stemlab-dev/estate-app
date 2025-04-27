import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/authContext';
import { Image, StyleSheet, View } from 'react-native';
import colors from '@/constants/color';

const Index = () => {
	const { loading } = useAuth();
	const [loggedInUser, setloggedInUser] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isFirstTime, setIsFirstTime] = useState(true);

	useEffect(() => {
		const subscription = async () => {
			const isFirstTime = SecureStore.getItem('isFirstTime');
			setIsFirstTime(isFirstTime ? true : false);
			const token = SecureStore.getItem('accessToken');
			setloggedInUser(token ? true : false);
			setIsLoading(false);
		};
		subscription();
	}, []);
	return (
		<View style={styles.container}>
			{loading || isLoading ? (
				<View style={styles.container}>
					<Image
						source={require('../assets/images/icon.png')}
						style={styles.logo}
					/>
				</View>
			) : (
				<Redirect
					href={
						isFirstTime ? '/onboarding' : loggedInUser ? '/(app)' : '/login'
					}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 220,
		height: 220,
		resizeMode: 'contain',
		marginBottom: 20,
	},
});

export default Index;
