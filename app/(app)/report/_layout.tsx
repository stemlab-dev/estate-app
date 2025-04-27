import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="send-report" options={{ headerShown: false }} />
			<Stack.Screen name="why" options={{ headerShown: false }} />
			<Stack.Screen name="report-details" options={{ headerShown: false }} />
		</Stack>
	);
}
