import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import colors from '@/constants/color';
import { router } from 'expo-router';

const reminder = () => {
	const handelPress = (type: string) => {
		router.push({
			pathname: '/remider/create-reminder',
			params: { type },
		});
	};
	return (
		<View style={styles.itemContainer}>
			<Pressable
				onPress={() => handelPress('new-reminder')}
				style={styles.buttonContainer}
			>
				<View style={styles.iconContainer}>
					<View style={styles.icon}>
						<AntDesign name="plus" size={20} />
					</View>
					<Text style={styles.name}>Add reminder</Text>
				</View>
				<AntDesign name="right" size={20} color="black" />
			</Pressable>
			<Text style={styles.title}>Recuring reminder</Text>
			<Pressable
				onPress={() => handelPress('new-reminder')}
				style={styles.buttonContainer}
			>
				<Text style={styles.name}>Add reminder</Text>

				<AntDesign name="right" size={20} color="black" />
			</Pressable>
			<Pressable
				onPress={() => handelPress('new-reminder')}
				style={styles.buttonContainer}
			>
				<Text style={styles.name}>Add reminder</Text>

				<AntDesign name="right" size={20} color="black" />
			</Pressable>
			<Pressable
				onPress={() => handelPress('new-reminder')}
				style={styles.buttonContainer}
			>
				<Text style={styles.name}>Add reminder</Text>

				<AntDesign name="right" size={20} color="black" />
			</Pressable>
		</View>
	);
};

export default reminder;

const styles = StyleSheet.create({
	itemContainer: { padding: 10, flex: 1 },
	title: {
		fontWeight: 'bold',
		fontSize: 18,
		marginVertical: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 2,
		padding: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 10,
	},
	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 2,
		flex: 1,
	},
	icon: {
		padding: 10,
		borderRadius: '50%',
		marginRight: 5,
		borderColor: '#ccc',
		borderWidth: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingVertical: 10,
		textTransform: 'capitalize',
	},
	submitButton: {
		backgroundColor: colors.black,
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
	},
});
