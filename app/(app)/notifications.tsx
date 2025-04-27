import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	SafeAreaView,
	Pressable,
	FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import colors from '@/constants/color';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '@/api';
import LoaderModal from '@/components/LoaderModal';
import moment from 'moment';
import TabButtons from '@/components/ui/TabButtons';

type Notification = {
	_id: string;
	type: string;
	message: string;
	createdAt: string;
};
const notification = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const notificationTabs = ['All', 'Dues', 'Announcement', 'Issues'];
	const [tab, setTab] = useState<string>('All'); // Active filter
	const { token } = useAuth();
	const { data, isLoading } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => fetchNotifications(token),
	});

	useEffect(() => {
		if (data) {
			// console.log('notifications', data)
			setNotifications(data);
		}
	}, [data]);
	const filterData = (category: string) => {
		setTab(() => category);
		let filtered = data;
		// console.log('filtered', data);
		// Apply category filter
		if (category !== 'All') {
			filtered = filtered?.filter(
				(item: any) => item?.type?.toLowerCase() === category.toLowerCase()
			);
		}
		setNotifications(filtered);
	};
	const handelPress = (id: string) => {
		console.log('notification pressed', id);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
						marginBottom:10
					}}
				>
					<AntDesign
						name="search1"
						size={24}
						color="black"
						style={{ opacity: 0 }}
					/>
					<Text style={styles.title}>Notifications</Text>
					<TouchableOpacity onPress={() => router.navigate('/')}>
						<AntDesign name="setting" size={24} color={colors.primary} />
					</TouchableOpacity>
				</View>
				<TabButtons
					screens={notificationTabs}
					tab={tab}
					filterData={filterData}
				/>
			</View>
			<View
				style={{
					paddingVertical: 10,
					flex: 1,
				}}
			>
				<FlatList
					keyExtractor={(item: any) => item?._id.toString()}
					showsVerticalScrollIndicator={false}
					data={notifications}
					renderItem={({ item }) => (
						<Pressable
							key={item?._id}
							onPress={() => handelPress(item?._id)}
							style={styles.itemContainer}
						>
							<View
								style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
							>
								<View style={styles.menuIcon}>
									<Feather
										name="bell"
										size={18}
										color="blue"
										// style={styles.menuIcon}
									/>
								</View>
								<View style={{ flex: 1 }}>
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'space-between',
											gap: 5,
											flex: 1,
										}}
									>
										<Text style={styles.title}>{item?.title}</Text>
										<Text style={styles.text}>
											{moment(item.createdAt).format('ll')}
										</Text>
									</View>
									<Text style={styles.text}>{item?.message}</Text>
								</View>
							</View>
						</Pressable>
					)}
					ListEmptyComponent={() => (
						<View style={styles.cover}>
							<Ionicons
								name="chatbox-ellipses-outline"
								size={28}
								color="black"
							/>
							<Text style={styles.message}>No any notification yet</Text>
						</View>
					)}
				/>
			</View>

			{isLoading && <LoaderModal loading={isLoading} text="loading..." />}
		</SafeAreaView>
	);
};

export default notification;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		padding: 5,
		flexDirection: 'column',
		backgroundColor: '#F8F9fC',
		justifyContent: 'center',
	},
	header: {
		padding: 10,
		marginTop: 15,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 10,
	},
	subTitle: {
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},
	text: {
		fontSize: 16,
	},
	menuWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 2,
		// flex: 1,
		paddingVertical: 10,
		marginTop: 10,
	},
	menuBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
		flex: 1,
		width: 'auto',
		borderColor: '#666',
		borderWidth: 1,
		borderRadius: 8,
		paddingVertical: 8,
		// paddingHorizontal: 20,
	},
	menuIcon: {
		backgroundColor: '#EFF4FF',
		padding: 14,
		borderRadius: '50%',
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemContainer: {
		padding: 10,
		backgroundColor: 'ghostwhite',
		borderRadius: 10,
	},
	message: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
	},
	cover: {
		flex: 1,
		height: 600,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
