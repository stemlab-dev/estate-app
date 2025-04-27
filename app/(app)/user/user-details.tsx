import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
// import {  } from 'react-native-gesture-handler'
import colors from '@/constants/color';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import { fetchUser } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import LoaderModal from '@/components/LoaderModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
	const { id } = useLocalSearchParams();
	// const router = useRouter();
	useEffect(() => {
		if (!id) {
			router.navigate('/users');
		}
	}, [id]);
	const { token } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['users', id],
		queryFn: async () => fetchUser(token, id),
	});
	useEffect(() => {
		if (data) {
			console.log('data', data);
		}
	}, [data]);
	const handelPress = () => {
		router.push({
			pathname: '/user/payment-history',
			params: { id },
		});
	};
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					// padding: 10,
					gap: 10,
				}}
			>
				<TouchableOpacity onPress={() => router.navigate('/users')}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Users Account</Text>
				{/* <AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/> */}
			</View>
			<View style={{ paddingTop: 10 }}>
				<View
					style={{
						flexDirection: 'row',
						backgroundColor: 'white',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 10,
						padding: 10,
						borderRadius: 10,
						marginTop: 10,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.2,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: 10,
							flex: 1,
						}}
					>
						<Image
							source={{
								uri:
									data?.profileImage?.url ||
									`https://ui-avatars.com/api/?name=${data?.name}&&length=1&&background=random`,
							}}
							style={{
								height: 48,
								width: 48,
								borderRadius: 24,
								borderWidth: 0.5,
								// borderColor: COLORS.secondary,
							}}
						/>
						<View>
							<Text
								style={{
									fontSize: 16,
									fontWeight: 'bold',
									textTransform: 'capitalize',
								}}
							>
								{data?.name}
							</Text>
							<Text style={{ fontSize: 14, color: 'gray' }}>{data?.role}</Text>
							<Text style={{ fontSize: 14, color: 'gray' }}>
								{data?.address || data?.email}
							</Text>
						</View>
					</View>
					<View style={styles.submitButton}>
						<Text style={styles.submitText}>View Account</Text>
					</View>
				</View>
				<View
					style={{
						padding: 10,
						flexDirection: 'row',
						justifyContent: 'flex-end',
						alignItems: 'center',
						marginBottom: 20,
					}}
				>
					<Pressable>
						<Text style={{ color: 'red' }}>Delete Account</Text>
					</Pressable>
				</View>
				<Pressable onPress={handelPress} style={styles.pressable}>
					<View style={styles.item}>
						<View style={styles.iconContainer}>
							<Feather name="activity" size={16} color={colors.primary} />
						</View>
						<Text style={[styles.text, { color: colors.text }]}>
							Issues report
						</Text>
					</View>
					<View style={styles.iconContainer}>
						<AntDesign name="right" size={18} color={colors.text} />
					</View>
				</Pressable>
				<Pressable onPress={handelPress} style={styles.pressable}>
					<View style={styles.item}>
						<View style={styles.iconContainer}>
							<Feather name="alert-circle" size={16} color={colors.primary} />
						</View>
						<Text style={[styles.text, { color: colors.text }]}>
							Due payments
						</Text>
					</View>
					<View style={styles.iconContainer}>
						<AntDesign name="right" size={18} color={colors.text} />
					</View>
				</Pressable>
				<Pressable onPress={handelPress} style={styles.pressable}>
					<View style={styles.item}>
						<View style={styles.iconContainer}>
							<Feather name="activity" size={16} color={colors.primary} />
						</View>
						<Text style={[styles.text, { color: colors.text }]}>
							Payment history
						</Text>
					</View>
					<View style={styles.iconContainer}>
						<AntDesign name="right" size={18} color={colors.text} />
					</View>
				</Pressable>
			</View>
			{isLoading && <LoaderModal loading={isLoading} text="loading..." />}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		padding: 10,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontWeight: '600',
		fontSize: 20,
		textAlign: 'center',
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
	continueButton: {
		backgroundColor: colors.black,
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginVertical: 20,
	},
	submitButton: {
		backgroundColor: colors.black,
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
	},
	submitText: {
		color: '#fff',
		fontWeight: 'semibold',
		fontSize: 12,
	},
	text: {
		fontWeight: '600',
		fontSize: 14,
		color: 'white',
	},
	pressable: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 6,
		borderRadius: 10,
		marginBottom: 2, // added to separate items
		backgroundColor: 'white',
		borderColor: 'gray',
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
export default index;
