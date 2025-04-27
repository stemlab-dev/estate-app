import React from 'react';
import { Stack } from 'expo-router';
import Menu from '@/components/issue/DropDown';

export default function _layout() {
	return (
		<Stack>
			<Stack.Screen name="issue-details" options={{ headerShown: false, tabBarVisible: false }} />
		</Stack>
	);
}
