import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
	return (
		<Stack>
			<Stack.Screen name="receipt" options={{ headerShown: false }} />
			<Stack.Screen name="bank" options={{ headerShown: false }} />
			<Stack.Screen name="create-invoice" options={{ headerShown: false }} />
			<Stack.Screen name="create-reminder" options={{ headerShown: false }} />
			<Stack.Screen name="payment-details" options={{ headerShown: false }} />
			<Stack.Screen name="payment-method" options={{ headerShown: false }} />
			<Stack.Screen name="bank-transfer" options={{ headerShown: false }} />
			<Stack.Screen name="revenues" options={{ headerShown: false }} />
		</Stack>
	);
}
