import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import colors from '@/constants/color';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BackButton() {
	return (
		<TouchableOpacity style={styles.header} onPress={() => router.back()}>
			<Entypo
				name="chevron-with-circle-left"
				size={40}
				color={colors.primary}
			/>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
    header: {
        marginTop: 50,
    }
})