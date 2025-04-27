import React, { useState } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Pressable,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import colors from '@/constants/color';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
// import EvilIcons from '@expo/vector-icons/EvilIcons';
import { getErrorMessage } from '@/utils/getAxiosError';
import { useAuth } from '@/context/authContext';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;
import * as SecureStore from 'expo-secure-store';
import LoaderModal from '@/components/LoaderModal';

const ProfilePhotoUpload = () => {
	const [image, setImage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const { token, profile, setProfile } = useAuth();
	const { estate, address, state, dateOfBirth, gender } =
		useLocalSearchParams();
	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			Toast.show({
				type: 'error',
				text1: 'Permission required',
				text2: 'Please allow access to your photo library to upload an image.',
			});
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1], // Square aspect ratio
			quality: 1, // Highest quality
		});
		if (!result.canceled) {
			setImage(result.assets[0].uri); // Set the selected image URI
		}
	};

	const uploadImage = async () => {
		if (!image) {
			Toast.show({
				type: 'error',
				text1: 'Select an image first',
				text2: 'Please select an image first',
			});
			return;
		}
		const payload = { estate, address, state, dateOfBirth, gender };
		const formData = new FormData();
		formData.append('profileImage', {
			uri: image,
			type: 'image/jpeg', // Mime type
			name: 'profile.jpg',
		} as any);
        // map payload to form data
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value);
        })
		console.log('formData', formData)
		try {
			const response = await axios.patch(
				`${apiUrl}/users/complete-profile`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log('Upload Successful:', response.data);
			Toast.show({
				type: 'success',
				text1: 'Profile updated',
				text2: 'Profile updated successfully',
			});
			setImage(null); // Reset the image URI after upload
			await SecureStore.setItemAsync(
				'userInfo',
				JSON.stringify({ ...profile, profileVerified: true })
			);
			setProfile({ ...profile, profileVerified: true });
			router.replace('/(app)');
		} catch (error) {
			setLoading(false);
			const message = getErrorMessage(error);
			console.error('Upload Error:', message);
			Toast.show({
				type: 'error',
				text1: 'Failed to upload profile',
				text2: 'Upload failed, please try again.',
			});
		}
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
				<View style={styles.titles}>
					<Text style={styles.title}>You're in! Now add your profile</Text>
					<Text style={styles.title}> photo</Text>
				</View>
				<TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
					{image ? (
						<Image source={{ uri: image }} style={styles.image} />
					) : (
						<View style={styles.placeholder}>
							<Text>Select Image</Text>
						</View>
					)}
					<TouchableOpacity onPress={pickImage} style={styles.editIcon}>
						{/* <EvilIcons name="pencil" size={18} color="white" /> */}
						<FontAwesome name="pencil-square-o" size={18} color="white" />
					</TouchableOpacity>
				</TouchableOpacity>
			</Animated.View>
			<TouchableOpacity
				disabled={loading}
				onPress={uploadImage}
				style={styles.button}
			>
				<Text style={styles.buttonText}>
					{loading ? 'Updating' : 'Continue'}
				</Text>
			</TouchableOpacity>
			<Toast />
			<LoaderModal loading={loading} />
		</View>
	);
};

export default ProfilePhotoUpload;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: 10,
	},
	header: {
		marginTop: 60,
		padding: 10,
	},
	contentContainer: {
		padding: 10,
		borderRadius: 10,
		flex: 1,
	},
	titles: {
		marginBottom: 20,
	},
	title: {
		fontSize: 26,
		fontWeight: '500',
	},
	imageContainer: {
		// marginTop: 50,
		position: 'relative',
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	image: {
		width: 160,
		height: 160,
		borderRadius: 80,
	},
	placeholder: {
		width: 160,
		height: 160,
		borderRadius: 80,
		backgroundColor: '#BDC0CE',
		alignItems: 'center',
		justifyContent: 'center',
	},
	editIcon: {
		position: 'absolute',
		top: '56%',
		right: '34%',
		backgroundColor: '#000',
		borderRadius: 15,
		padding: 5,
	},
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		borderRadius: 5,
		alignItems: 'center',
		width: '100%',
		marginVertical: 20,
	},
	buttonText: { color: '#FFF', fontSize: 16, fontWeight: '500' },
});
