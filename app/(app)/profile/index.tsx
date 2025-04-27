import React, { ReactNode, useState } from 'react';
import {
	Image,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	View,
	Alert,
	ScrollView,
} from 'react-native';
import { RelativePathString, router } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useAuth } from '@/context/authContext';
import { useTheme } from '@react-navigation/native';
import { settingData } from '@/constants/data';
import LogoutModal from '@/components/LogoutModal';
import colors from '@/constants/color';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFontFamily } from '@/utils';
// const apiUrl = process.env.EXPO_PUBLIC_API_URL;
type SettingItem = {
	id: number;
	name: string;
	icon: React.ElementType;
	iconType: boolean;
	link: string;
};

const Index = () => {
	// const { profile, token } = useAuth();
	const theme = useTheme();
	const { profile, logout } = useAuth();
	const [showModal, setShowModal] = useState(false);
	const logoutFn = async () => {
		setShowModal(false);
		await logout();
		// router.back();

		await SecureStore.deleteItemAsync('isFirstTime');
		router.dismissAll();
		router.replace('/onboarding');
		// router.replace('/login');
	};
	const handleLogout = () => {
		// console.log('logout');
		setShowModal(true);
	};

	const SettingItem = ({ item }: { item: SettingItem }) => {
		return (
			<Pressable
				key={item.id}
				onPress={() => router.navigate(item.link as RelativePathString)}
				style={styles.pressable}
			>
				<View style={styles.item}>
					<View style={styles.iconContainer}>

						{item.iconType ? (
							<AntDesign name={item?.icon as any} size={18} color={colors.primary} />
						) : (
							<item.icon width={20} height={20} color={colors.primary} />
						)}
					</View>
					<Text style={[styles.text, { color: theme.colors.text }]}>
						{item.name}
					</Text>
				</View>
				<View style={styles.iconContainer}>
					<AntDesign name="right" size={18} color={theme.colors.text} />
				</View>
			</Pressable>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					marginTop: 15,
					borderRadius: 16,
					backgroundColor: colors.primaryLight,
					paddingTop: 17,
					paddingHorizontal:17,
					paddingBottom:25,
					marginVertical: 10,
				}}
			>
				<View
					style={{
						justifyContent: 'flex-start',
						flexDirection: 'row',
						// backgroundColor: 'white',
						
					}}
				>
					<Pressable
						onPress={() => router.navigate('/profile')}
					>
						<Image
							source={{
								uri:
									profile?.profileImage?.url ||
									`https://ui-avatars.com/api/?name=${profile?.name}&&length=1&&background=random`,
							}}
							style={{
								height: 50,
								width: 50,
								borderRadius: 24,
								borderWidth: 0.5,
								// borderColor: COLORS.secondary,
							}}
						/>
					</Pressable>
					<View style={{ marginLeft: 10 }}>
						<Text
							style={{
								fontSize: 18,
								textTransform: 'capitalize',
								fontFamily:getFontFamily("Urbanist",500)
							}}
						>
							{profile?.name}
						</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 14, color: 'gray',fontFamily:getFontFamily("Urbanist") }}>
								Western Estate
							</Text>
							<View style={styles.dot}></View>
							<Text
								style={{
									fontSize: 14,
									color: 'gray',
									textTransform: 'capitalize',
									fontFamily:getFontFamily("Urbanist")
								}}
							>
								{profile?.role}
							</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Pressable
								onPress={() => router.push('/profile/edit-profile')}
								style={{
									padding: 2,
									borderRadius: 16,
									marginTop: 6,
									paddingHorizontal: 22,
									paddingVertical: 10,
									
									backgroundColor:colors.primary,
									// width: '100%',
									// backgroundColor: colors.primary,
								}}
							>
								<Text style={{ 
									textAlign: 'center',
									color:colors.white,
									fontFamily:getFontFamily("Urbanist",500),
									fontSize:12 }}>Edit Profile</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>
			<ScrollView>
				<View
					style={{
						marginTop: 20,
						borderRadius: 16,
						backgroundColor: colors.primaryLight,
					}}
				>
				{settingData.map((item: any) => (
					<SettingItem key={item.id} item={item} />
				))}
				<Pressable
					onPress={handleLogout}
					style={[
						styles.pressable,
						{
							justifyContent: 'flex-start',
							padding: 6,
							borderRadius: 10,
						},
					]}
				>
					<View
						style={{
							paddingHorizontal: 10,
							paddingVertical: 12,
							borderRadius: 10,
						}}
					>
						<Feather name="log-out" size={18} color="red" />
					</View>
					<Text
						style={[
							styles.text,
							{
								color: 'red',
							},
						]}
					>
						Log out
					</Text>
				</Pressable>
				</View>
			</ScrollView>

			<LogoutModal
				showModal={showModal}
				setShowModal={setShowModal}
				handleContinue={() => logoutFn()}
			/>
		</SafeAreaView>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		backgroundColor:colors.white,
		width: '100%',
		paddingTop: StatusBar.currentHeight,
		padding: 20,
		flex:1,
		fontFamily:getFontFamily("Urbanist")
	},
	headerText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	button: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		borderRadius: 8,
	},
	dot: {
		padding: 5,
		margin: 10,
		backgroundColor: colors.primary,
		borderRadius: 50,
	},
	text: {
		fontFamily:getFontFamily("DMSans"),
		fontSize: 14,
		color: 'white',
	},
	pressable: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 6,
		// marginBottom: 2, // added to separate items

		borderColor: 'gray',
		// borderWidth: 0.3,
		// borderRadius: 5,
		// borderWidth: 1,
		// marginBottom: 20,
	},
	item: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	iconContainer: {
		paddingHorizontal: 10,
		paddingVertical: 12,
		borderRadius: 10,
	},
});
