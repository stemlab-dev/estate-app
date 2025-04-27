import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
    return (
            <Stack>
                <Stack.Screen name="user-details" options={{ headerShown: false }} />
                <Stack.Screen name="receipt" options={{ headerShown: false }} />
                <Stack.Screen name="user-issues" options={{ headerShown: false }} />
                <Stack.Screen name="payment-history" options={{ headerShown: false }} />
                <Stack.Screen name="due-payments" options={{ headerShown: false }} />
            </Stack>
        );
}
