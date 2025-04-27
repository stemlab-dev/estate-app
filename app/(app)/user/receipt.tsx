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
		queryKey: ['reports'],
		queryFn: async () => fetchUser(token, id),
	});
	useEffect(() => {
		if (data) {
			console.log('data', data);
		}
	}, [data]);
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					padding: 10,
					gap: 10,
				}}
			>
				<TouchableOpacity onPress={() => router.navigate('/users')}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>User Account</Text>
				{/* <AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/> */}
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#f5f5f5',
		padding: 10,
	},
	title: {
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},
});
export default index;
