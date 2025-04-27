import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import CountryDropdown from '@/components/CountryDropdown';
import { router } from 'expo-router';
import colors from '@/constants/color';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/context/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddressScreen = () => {
	const { profile } = useAuth();
	const [selectedCountry, setSelectedCountry] = useState<string>('');
	const [state, setState] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(false);
	useEffect(() => {
		if (profile?.profileVerified) {
			router.navigate('/(app)');
		}
	}, [profile]);
	const handleContinue = async () => {
		if (!selectedCountry) {
			Toast.show({
				type: 'error',
				text1: 'Select country!',
				text2: 'Please select a country',
			});
			return;
		}
		if (!state) {
			Toast.show({
				type: 'error',
				text1: 'Select a state!',
				text2: 'Please select a state',
			});
			return;
		}
		router.push({
			pathname: '/select-estates',
			params: { country: selectedCountry, state },
		});
		return;
	};
	const countries = [
		{ label: 'Nigeria', value: 'Nigeria' },
		{ label: 'Ghana', value: 'Ghana' },
		{ label: 'United States', value: 'United States' },
		{ label: 'United Kingdom', value: 'United Kingdom' },
		{ label: 'Canada', value: 'Canada' },
	];
	const states = [
		{ label: 'Lagos', value: 'Lagos', country: 'Nigeria' },
		{ label: 'Accra', value: 'Accra', country: 'Ghana' },
		{ label: 'Abuja', value: 'Abuja', country: 'Nigeria' },
		{ label: 'New York', value: 'New york', country: 'United States' },
	];

	return (
		<SafeAreaView style={styles.container}>
			<Pressable onPress={() => router.back()} style={styles.header}>
				<AntDesign name="arrowleft" size={24} color={colors.black} />
			</Pressable>
			<Animated.View
				entering={FadeInDown.delay(600).duration(1000).springify()}
				style={styles.contentContainer}
			>
				<Text style={styles.title}>Enter your home address</Text>
				<View>
					{/* <Text style={styles.label}>Country</Text> */}
					<CountryDropdown
						data={countries}
						label="Country"
						placeholder="Select your contry"
						onSelect={(country) => setSelectedCountry(country)}
					/>
				</View>
				<View>
					{/* <Text style={styles.label}>State</Text> */}
					<CountryDropdown
						data={states}
						label="State"
						placeholder="Select your state"
						onSelect={(country) => setState(country)}
					/>
				</View>
			</Animated.View>

			<TouchableOpacity
				onPress={handleContinue}
				// disabled={!isValid}
				style={styles.button}
			>
				<Text style={styles.buttonText}>Continue</Text>
			</TouchableOpacity>
			<Toast />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: '#fff' },
	header: {
		marginTop: 50,
	},
	contentContainer: {
		borderRadius: 10,
	},
	title: {
		fontSize: 26,
		fontWeight: '500',
		marginTop: 20,
		marginBottom: 20,
	},
	label: {
		fontSize: 14,
		color: '#666',
		marginVertical: 5,
		lineHeight: 20,
	},
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		borderRadius: 20,
		alignItems: 'center',
		marginVertical: 20,
	},
	buttonText: { color: '#FFF', fontSize: 16, fontWeight: '500' },
});

export default AddressScreen;
