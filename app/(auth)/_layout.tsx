import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import { useAuth } from '@/context/authContext';

export default function _layout() {
	// const { token } = useAuth();
	// useEffect(() => {
	// 	console.log(token);
	// 	if (token) {
	// 		router.push("/(app)/index");
	// 	}
	// }, [token]);
	return (
		<Stack>
			<Stack.Screen name="login" options={{ headerShown: false }} />
			<Stack.Screen name="register" options={{ headerShown: false }} />
			<Stack.Screen name="reset-password" options={{ headerShown: false }} />
			<Stack.Screen name="new-password" options={{ headerShown: false }} />
			<Stack.Screen name="information" options={{ headerShown: false }} />
			<Stack.Screen name="address" options={{ headerShown: false }} />
			<Stack.Screen name="select-estates" options={{ headerShown: false }} />
			<Stack.Screen name="date-of-birth" options={{ headerShown: false }} />
		</Stack>
	);
}
