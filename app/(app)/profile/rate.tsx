import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
} from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getFontFamily } from '@/utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const rate = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					gap:25,
					alignItems: 'center',
					padding: 10,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
				<Feather name="arrow-left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Rate us</Text>
			</View>
			<View>
				<Text style={styles.description}>
					Your input is valuable in helping us better unerstand your needs and
					tailor our services
				</Text>
				<View>
					<Text style={styles.label}>comment</Text>
					<TextInput
						style={styles.textArea}
						multiline={true}
						numberOfLines={18}
						placeholder="Type your issue here..."
						// value={issue}
						onChangeText={setMessage}
					/>
				</View>
				<Button
					text="Submit"
					loading={loading}
					bgColor="#000"
					textColor="#FFF"
					handlePress={() => {}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default rate;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 14,
	},
	title: {
		fontFamily:getFontFamily("Urbanist",500),
		fontSize: 24,
		textAlign: 'center',
	},
	description:{
		fontFamily:getFontFamily("DMSans",500),
		fontSize: 16,
		textAlign: 'center',
		marginTop:30,
		marginBottom: 20,
	},
	label: {
		fontSize: 18,
		marginBottom: 10,
	},
	textArea: {
		height: 250,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 8,
		// backgroundColor: '#fff',
		textAlignVertical: 'top', // Ensures text starts at the top of the input
	},
});
