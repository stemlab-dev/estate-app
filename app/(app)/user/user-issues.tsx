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
				<Text style={styles.title}>User Issues</Text>
				{/* <AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/> */}
			</View>
			<View style={{ paddingTop: 10 }}>
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
			</View>
			{isLoading && <LoaderModal loading={isLoading} text="Loading..." />}
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
