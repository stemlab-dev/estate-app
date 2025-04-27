import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	Pressable,
	FlatList,
	Image,
} from 'react-native';
import { router } from 'expo-router';
import colors from '@/constants/color';
import moment from 'moment';

const App = ({
	payments,
	refreshing,
	onRefresh,
}: {
	payments: any;
	onRefresh: () => void;
	refreshing: boolean;
}) => {
	const handelPress = (id: string) => {
		router.push({
			pathname: '/payment/payment-details',
			params: { id },
		});
	};
	return (
		<FlatList
			keyExtractor={(item: any) => item?._id.toString()}
			showsVerticalScrollIndicator={false}
			data={payments}
			refreshing={refreshing}
			onRefresh={onRefresh}
			contentContainerStyle={{ padding: 10, flex: 1 }}
			renderItem={({ item }) => (
				<Pressable
					onPress={() => handelPress(item._id)}
					key={item._id}
					style={styles.menuContainer}
				>
					<View style={styles.contentContainer}>
						<View style={styles.imageContainer}>
							<Image
								source={{
									uri:
										item?.user?.profileImage?.url ||
										`https://ui-avatars.com/api/?name=${item?.user?.name}&&length=1&&background=random`,
								}}
								style={styles.image}
							/>
						</View>
						<View style={styles.textWrap}>
							<Text
								style={{ ...styles.textTitle, textTransform: 'capitalize' }}
							>
								{item?.user?.name}
							</Text>
							<Text style={styles.text}>{item?.due?.name}</Text>
						</View>
					</View>
					<View style={styles.textWrap}>
						<Text style={styles.textTitle}>₦{item?.amount}.00</Text>
						<Text style={styles.text}>
							{moment(item?.date).format('D MMM hh:mma')}
						</Text>
					</View>
				</Pressable>
			)}
			ListEmptyComponent={() => (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						// borderColor: '#333',
						// borderWidth: 1,
						paddingTop: 50,
					}}
				>
					<Ionicons name="chatbox-ellipses-outline" size={28} color="black" />
					<Text style={{ fontWeight: '600', fontSize: 16 }}>
						No any payments yet
					</Text>
				</View>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},

	menuContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
		padding: 5
	},
	contentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
	},
	textTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text,
	},
	imageContainer: {
		borderRadius: 50,
		gap: 10,
		borderColor: '#333',
		borderWidth: 0.4,
	},
	image: {
		backgroundColor: colors.primary,
		width: 50,
		height: 50,
		padding: 10,
		borderRadius: 50,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: 'white',
	},
	textWrap: {
		padding: 5
	},
	text: {
		fontSize: 14,
		textTransform: 'capitalize',
	},
	btn: {
		padding: 10,
		borderRadius: 8,
		minWidth: 140,
	},
	btnText: {
		fontSize: 14,
		fontWeight: '600',
		color: 'white',
		textAlign: 'center',
	},
});

export default App;
