import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { AntDesign, Feather, Fontisto } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/constants/color';
import { useAuth } from '@/context/authContext';
import Button from '@/components/ui/Button';
import { getFontFamily } from '@/utils';

const index = () => {
	const { token, profile, setProfile } = useAuth();
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					gap:25,
					alignItems: 'center',
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Settings</Text>
				<AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/>
			</View>
			<Text style={{ fontFamily: getFontFamily("DMSans",600), fontSize:16, textAlign: 'left', marginTop: 54 }}>
				Information
			</Text>
			<View
				style={{
					padding: 5,
					marginTop: 5,
					borderRadius: 10,
					borderColor: 'ddd',
					backgroundColor: 'white',
				}}
			>
				<View style={styles.infoWrap}>
					<View style={styles.textWrap}>
						<Feather name="user" size={16} color="black" />
						<Text style={styles.text}>Name</Text>
					</View>
					<Text style={styles.text}>{profile.name}</Text>
				</View>
				<View style={styles.infoWrap}>
					<View style={styles.textWrap}>
						<Fontisto name="email" size={16} color="black" />
						<Text style={styles.text}>Email</Text>
					</View>
					<Text style={styles.text}>{profile.email}</Text>
				</View>
				<View style={styles.infoWrap}>
					<View style={styles.textWrap}>
						<Feather name="phone" size={16} color="black" />
						<Text style={styles.text}>Phone</Text>
					</View>
					<Text style={styles.text}>{profile.phone}</Text>
				</View>
				<View style={styles.infoWrap}>
					<View style={styles.textWrap}>
						<AntDesign name="home" size={16} color="black" />
						<Text style={styles.text}>Address</Text>
					</View>
					<Text style={styles.text}>{profile.address}</Text>
				</View>
				{/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}> */}
				<Button
					text="Edit Information"
					handlePress={() => router.push('/profile/edit-profile')}
				/>
				{/* </View> */}
			</View>
		</SafeAreaView>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		// backgroundColor: 'white',
	},
	title: {
		fontFamily:getFontFamily("Urbanist",500),
		fontSize: 24,
		textAlign: 'center',
	},
	infoWrap: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
	},
	textWrap: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	text: {
		fontSize: 14,
		fontFamily:getFontFamily("DMSans")
	},
	submitButton: {
		backgroundColor: colors.primary,
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
		paddingVertical: 5,
		paddingHorizontal: 20,
	},
});
