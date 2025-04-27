import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import React from 'react';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PhoneIcon } from '@/assets/svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFontFamily } from '@/utils';

const Index = () => {
	const support = {
		phone: '09035095173',
		email: 'amm@gmail.com',
	};
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
				<Text style={styles.title}>Support</Text>
				<AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/>
			</View>
			<View
				style={{
					padding: 14,
					borderRadius: 10,
					borderWidth: 0.5,
					borderColor: '#449',
					backgroundColor: 'white',
					gap:10,
					marginTop: 20,
				}}
			>
				<Text style={styles.text}>Help line</Text>
				<View style={styles.textWrap}>
					<MaterialIcons name="mail-outline" size={24} color="black" />
					<Text style={styles.text}>{support.email}</Text>
				</View>

				<View style={styles.textWrap}>
					<PhoneIcon width={17} height={17}  color="black" />
					<Text style={styles.text}>{support.phone}</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		padding: 10,
	},
	textWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		fontSize: 14,
		fontFamily:getFontFamily("Urbanist")
	},
	title: {
		fontFamily:getFontFamily("Urbanist",500),
		fontSize: 24,
		textAlign: 'center',
	},
});
