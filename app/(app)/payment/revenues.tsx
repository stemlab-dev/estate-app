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
import { fetchUserPayments } from '@/api/index';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import LoaderModal from '@/components/LoaderModal';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
	const { id } = useLocalSearchParams();
	const { token } = useAuth();
	const { data, isLoading, error } = useQuery({
		queryKey: ['payment-history'],
		queryFn: async () => fetchUserPayments(token, id),
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
				<TouchableOpacity onPress={() => router.push('/(app)')}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Revenues</Text>
				{/* <AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/> */}
			</View>
			<View style={{ padding: 10 }}>
				<Pressable
					onPress={() => router.navigate('/(app)')}
					style={styles.pressable}
				>
					<View style={styles.item}>
						<View style={styles.iconContainer}>
							<Feather name="alert-circle" size={16} color={colors.primary} />
						</View>
						<Text style={[styles.text, { color: colors.text }]}>Payment</Text>
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

export default index;

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
		flex: 1,
	},
	iconContainer: {
		paddingHorizontal: 10,
		paddingVertical: 12,
		borderRadius: 10,
	},

	text: {
		fontWeight: '600',
		fontSize: 14,
		color: 'white',
	},
});
