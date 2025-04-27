import {
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Text,
	Image,Pressable,
	View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { fetchEstates } from '@/api';
import LoaderModal from '@/components/LoaderModal';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import colors from '@/constants/color';
import { AntDesign } from '@expo/vector-icons';

const estates = () => {
	const { address, state } = useLocalSearchParams();
	const { data, isLoading } = useQuery({
		queryKey: ['estates'],
		queryFn: async () => fetchEstates(),
	});
	useEffect(() => {
		console.log('data', data)
	}, [data])
	const handelPress = async (estateId: string) => {
		router.push({
			pathname: '/date-of-birth',
			params: { address, state, estateId },
		});
		return;
	};
	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Pressable onPress={() => router.back()} style={styles.header}>
				<AntDesign name="arrowleft" size={24} color={colors.black} />
			</Pressable>
			<Animated.View
				entering={FadeInDown.delay(600).duration(1000).springify()}
				style={styles.contentContainer}
			>
				<Text style={styles.title}>Select Estate</Text>
			</Animated.View>
			<View
				style={{
					paddingVertical: 10,
					flex: 1,
				}}
			>
				<FlatList
					keyExtractor={(item: any) => item?._id.toString()}
					showsVerticalScrollIndicator={false}
					data={data}
					numColumns={2} // Set to two columns
					columnWrapperStyle={{ justifyContent: 'space-between', gap: 2 }}
					renderItem={({ item }) => (
						<TouchableOpacity
							key={item._id}
							style={styles.buttonContainer}
							onPress={() => handelPress(item._id)}
						>
							<Image
								source={{
									uri:
										item?.logo?.url ||
										`https://ui-avatars.com/api/?name=${item?.name}&&length=1&&background=random`,
								}}
								style={{ width: 80, height: 80, borderRadius: 10 }}
							/>
							<Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5 }}>
								{item.name}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
			{isLoading && <LoaderModal loading={isLoading} />}
		</View>
	);
};

export default estates;

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: '#fff' },
	header: {
		marginTop: 50,
	},
	contentContainer: {
		borderRadius: 10,
	},
	title: {
		fontSize: 26,
		fontWeight: '500',
		marginTop: 20,
		marginBottom: 20,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		margin: 5,
		padding: 10,
		backgroundColor: '#f8f9fa',
		justifyContent: 'space-between',
		marginVertical: 5,
		// padding: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		// backgroundColor: '#ccc',
	},
});
