import React, { useState, useRef } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	Animated,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

const DropdownMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const animatedHeight = useRef(new Animated.Value(0)).current;
	const animatedOpacity = useRef(new Animated.Value(0)).current;

	const toggleMenu = () => {
		if (isMenuOpen) {
			// Close the menu
			Animated.parallel([
				Animated.timing(animatedHeight, {
					toValue: 0,
					duration: 200,
					useNativeDriver: false,
				}),
				Animated.timing(animatedOpacity, {
					toValue: 0,
					duration: 200,
					useNativeDriver: false,
				}),
			]).start(() => setIsMenuOpen(false));
		} else {
			// Open the menu
			setIsMenuOpen(true);
			Animated.parallel([
				Animated.timing(animatedHeight, {
					toValue: 100, // Adjust height based on your menu content
					duration: 200,
					useNativeDriver: false,
				}),
				Animated.timing(animatedOpacity, {
					toValue: 1,
					duration: 200,
					useNativeDriver: false,
				}),
			]).start();
		}
	};

	const closeMenu = () => {
		if (isMenuOpen) {
			toggleMenu();
		}
	};

	return (
		<TouchableWithoutFeedback onPress={closeMenu}>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => console.log('Navigate back')}>
						<AntDesign name="left" size={24} color="black" />
					</TouchableOpacity>
					<Text style={styles.title}>Issue Details</Text>
					<View style={styles.iconContainer}>
						<TouchableOpacity onPress={toggleMenu}>
							<Entypo name="dots-three-vertical" size={24} color="black" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => console.log('Share')}>
							<AntDesign name="sharealt" size={24} color="black" />
						</TouchableOpacity>
					</View>
				</View>

				{/* Dropdown Menu */}
				<Animated.View
					style={[
						styles.menu,
						{
							height: animatedHeight,
							opacity: animatedOpacity,
						},
					]}
				>
					<TouchableOpacity style={styles.menuItem}>
						<Text>Edit</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem}>
						<Text>Delete</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem}>
						<Text>Report</Text>
					</TouchableOpacity>
				</Animated.View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	iconContainer: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		zIndex: 1000,
	},
	menu: {
		position: 'absolute',
		top: 70, // Adjust based on your header height
		right: 10,
		backgroundColor: 'white',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ccc',
		// overflow: 'hidden',
		width: 120,
	},
	menuItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
});

export default DropdownMenu;
