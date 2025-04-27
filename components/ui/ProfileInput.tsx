import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/context/authContext';
import { Feather } from '@expo/vector-icons';
import { getFontFamily } from '@/utils';

const ProfileInput = ({
	selectedImage,
	setSelectedImage,
}: {
	selectedImage: string | null;
	setSelectedImage: (selectedImage: string | null) => void;
}) => {
	const { profile } = useAuth();
	// Function to open the image picker
	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert(
				'Permission required',
				'Please allow access to your photo library to upload an image.'
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1], // Square aspect ratio
			quality: 1, // Highest quality
		});
		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri); // Set the selected image URI
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={pickImage}>
				<View style={styles.imageContainer}>
					{selectedImage ? (
						<Image source={{ uri: selectedImage }} style={styles.image} />
					) : (
						<Image
							source={{
								uri:
									profile?.profileImage?.url ||
									`https://ui-avatars.com/api/?name=${profile?.name}&&length=1&&background=1767C7`,
							}}
							style={styles.image}
						/>
					)}
				</View>
				<View style={styles.camera}>
					<Feather name="camera" size={16} />
				</View>
			</TouchableOpacity>
			<Text style={styles.text}>{profile.name}</Text>
		</View>
	);
};

export default ProfileInput;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	imageContainer: {
		width: 70,
		height: 70,
		borderRadius: 50, // Circular image
		overflow: 'hidden',
		marginBottom: 10,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	camera: {
		position: 'absolute',
		top: 40,
		right: -10,
		padding: 5,
		backgroundColor: 'white',
		width: 30,
		height: 30,
		borderRadius: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 18,
		marginBottom: 20,
		fontFamily:getFontFamily("DMSans",600),
		textTransform: 'capitalize',
	},
});
