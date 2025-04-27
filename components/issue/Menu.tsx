import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Animated,
	Easing,
} from 'react-native';
import React, { useRef } from 'react';
import { Entypo } from '@expo/vector-icons';
interface MenuProps {
	isMenu: boolean;
	setIsMenu: (isMenu: boolean) => void;
	handelUpdate: (status: string) => void;
}
const Menu = ({ isMenu, setIsMenu, handelUpdate }: MenuProps) => {
	const animationValue = useRef(new Animated.Value(0)).current;

	// Toggle Menu with Animation
	const toggleMenu = () => {
		if (isMenu) {
			// Slide up (close menu)
			Animated.timing(animationValue, {
				toValue: 0,
				duration: 300,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start(() => setIsMenu(false));
		} else {
			setIsMenu(true);
			// Slide down (open menu)
			Animated.timing(animationValue, {
				toValue: 1,
				duration: 300,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start();
		}
	};

	// Interpolating animated height value
	const translateY = animationValue.interpolate({
		inputRange: [0, 1],
		outputRange: [-150, 0], // Starts 150 units above and slides into view
	});

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				
			</View>
			{/* Animated Dropdown Menu */}
			{isMenu && (
				<Animated.View
					style={[styles.dropdownMenu, { transform: [{ translateY }] }]}
				>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => handelUpdate('resolved')}
					>
						<Text style={styles.menuText}>Resolved</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => handelUpdate('inprogress')}
					>
						<Text style={styles.menuText}>In Progress</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => handelUpdate('Delete')}
					>
						<Text style={styles.menuText}>Delete</Text>
					</TouchableOpacity>
				</Animated.View>
			)}
		</View>
	);
};

export default Menu;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5',
		position: 'relative',
		zIndex: 200,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		zIndex: 200,
	},
	menuButton: {
		marginRight: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	dropdownMenu: {
		position: 'absolute',
		top: 40,
		right: 0,
		zIndex: 10,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 8,
	},
	menuItem: {
		paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        width: '100%',
	},
	menuText: {
		fontSize: 16,
		padding: 10,
		// color: '#333',
	},
});
