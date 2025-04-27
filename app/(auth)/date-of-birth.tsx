import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import DateOfBirthPicker from '@/components/DateOfBirthPicker';
import { router, useLocalSearchParams } from 'expo-router';
import SelectRole from '@/components/auth/SelectRole';
import { genders } from '@/constants/data';
import colors from '@/constants/color';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const BirthdayScreen = () => {
	const [dob, setDob] = useState(new Date());
	const [gender, setGender] = useState('male');
	const { estate, address, state } = useLocalSearchParams();
	const handleContinue = async () => {
		if (!dob || !gender) {
			Toast.show({
				type: 'error',
				text1: 'Incomplete fields!',
				text2: 'All fields are required',
			});
			return;
		}
		router.push({
			pathname: '/information',
			params: {
				estate,
				address,
				state,
				dateOfBirth: dob.toDateString(),
				gender,
			},
		});
		return;
	};

	return (
		<View style={styles.container}>
			<Pressable onPress={() => router.back()} style={styles.header}>
				<AntDesign name="arrowleft" size={24} color={colors.black} />
			</Pressable>
			<Animated.View
				entering={FadeInDown.delay(600).duration(1000).springify()}
				style={styles.contentContainer}
			>
				<Text style={styles.title}>Let's know you!</Text>
				<View>
					<Text style={styles.label}>Date of Birth</Text>
					<DateOfBirthPicker date={dob} setDate={setDob} />
				</View>
				<View>
					<Text style={styles.label}>Gender</Text>
					<SelectRole
						placeholder="Select gender"
						data={genders}
						value={gender}
						setValue={setGender}
					/>
				</View>
			</Animated.View>

			<TouchableOpacity
				onPress={handleContinue}
				// disabled={!dob}
				style={styles.button}
			>
				<Text style={styles.buttonText}>Continue</Text>
			</TouchableOpacity>
			<Toast />
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: '#fff' },
	header: {
		marginTop: 50,
	},
	contentContainer: {
		// padding: 10,
		// marginTop: 60,
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
		borderRadius: 5,
		alignItems: 'center',
		marginVertical: 20,
	},
	buttonText: { color: '#FFF', fontSize: 16, fontWeight: '500' },
});

export default BirthdayScreen;
