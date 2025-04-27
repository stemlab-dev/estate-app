import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="edit-profile" options={{ headerShown: false }} />
			<Stack.Screen name="profile-settings" options={{ headerShown: false }} />
			<Stack.Screen name="faqs" options={{ headerShown: false }} />
			<Stack.Screen name="rate" options={{ headerShown: false }} />
			<Stack.Screen name="support" options={{ headerShown: false }} />
		</Stack>
	);
}
