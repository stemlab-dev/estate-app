import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	TouchableOpacity,
	Pressable,
	FlatList,
	RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import colors from '@/constants/color';
import { fetchInvoices } from '@/api';
import { useQuery } from '@tanstack/react-query';
import LoaderModal from '@/components/LoaderModal';
import { useAuth } from '@/context/authContext';
import TabButtons from '@/components/ui/TabButtons';
import moment from 'moment';
import { ChevronLeftIcon } from '@/assets/svg';
import { getFontFamily } from '@/utils';

const App = () => {
	const [payments, setPayments] = useState<any>([]);
	const [tab, setTab] = useState<string>('All');
	const [refreshing, setRefreshing] = useState(false);
	const { token } = useAuth();
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['payments'],
		queryFn: async () => fetchInvoices(token as string),
	});

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch(); // This re-fetches the issues
		setRefreshing(false);
	}, [refetch]);
	useEffect(() => {
		if (data) {
			console.log('bill payment data', data);
			setPayments(data);
		}
	}, [data]);

	const handelPayNow = (
		id: string,
		amount: number,
		name: string,
		status: string,
		date: string
	) => {
		router.push({
			pathname: '/payment/payment-method',
			params: { id, amount, name, status, date },
		});
	};
	const handelViewRecipt = (
		id: string,
		amount: number,
		name: string,
		status: string,
		date: string
	) => {
		router.push({
			pathname: '/payment/receipt',
			params: { id, amount, name, status, date },
		});
	};

	const paymentTabs = ['All', 'Pending', 'Processing', 'Paid'];
	const filterData = (category: string) => {
		setTab(() => category);
		let filtered = data;
		// Apply category filter
		if (category !== 'All') {
			filtered = filtered?.filter(
				(item: any) => item?.status.toLowerCase() === category.toLowerCase()
			);
		}
		setPayments(filtered);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={{}}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 10,
						marginBottom: 18,
					}}
				>
					<TouchableOpacity onPress={() => router.back()}>
						<ChevronLeftIcon color="black" />
					</TouchableOpacity>
					<Text style={styles.title}>Bills</Text>
					<AntDesign
						name="search1"
						size={24}
						color="black"
						style={{ opacity: 0 }}
					/>
				</View>
				<TabButtons screens={paymentTabs} tab={tab} filterData={filterData} />
			</View>
			<FlatList
				keyExtractor={(item: any) => item?._id.toString()}
				showsVerticalScrollIndicator={false}
				data={payments}
				refreshing={refreshing}
				onRefresh={onRefresh}
				contentContainerStyle={{ padding: 5 }}
				renderItem={({ item }: any) => (
					<Pressable key={item?._id} style={styles.sectionMenu}>
						<View style={styles.textWrap}>
							<View style={{ flexDirection: 'column', gap: 10 }}>
								<View style={styles.textFlex}>
									<Text style={styles.textTitle}>Title</Text>
									<Text style={styles.text}>{item?.dueId?.name}</Text>
								</View>
								<View style={styles.textFlex}>
									<Text style={styles.textTitle}>
										{item?.dueId?.dueDate ? 'Due Date' : 'Created on'}
									</Text>
									<Text style={styles.text}>
										{moment(item?.dueId?.dueDate || item?.createdAt).format(
											'll'
										)}
									</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'column', gap: 10 }}>
								<View style={styles.textFlex}>
									<Text style={styles.textTitle}>Amount</Text>
									<Text style={styles.text}>{item.amount}</Text>
								</View>
								<View style={styles.textFlex}>
									<Text style={styles.textTitle}>Status</Text>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<View style={styles.dot}></View>
										<Text style={styles.text}>{item.status}</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.btnContainer}>
							<Pressable
								style={{
									...styles.btn,
									borderColor: colors.gray,
									borderWidth: 0.5,
									backgroundColor:
										item.status !== 'paid' ? colors.white : colors.grey,
								}}
								onPress={() =>
									handelViewRecipt(
										item?._id,
										item.amount,
										item?.dueId?.name,
										item.status,
										item?.dueId?.dueDate || item?.createdAt
									)
								}
							>
								<Text style={{ ...styles.btnText, color: colors.black }}>
									{item.status !== 'processing' ? 'Download' : 'View payment'}
								</Text>
							</Pressable>
							<Pressable
								style={{
									...styles.btn,
									backgroundColor:
										item.status === 'paid' ? '#0646AF80' : colors.primary,
								}}
								disabled={
									item.status === 'paid' || item.status === 'processing'
								}
								onPress={() =>
									handelPayNow(
										item?._id,
										item.amount,
										item?.dueId?.name,
										item.status,
										item?.dueId?.dueDate || item?.createdAt
									)
								}
							>
								<Text style={styles.btnText}>
									{item.status === 'paid' ? 'Paid' : 'Pay now'}
								</Text>
							</Pressable>
						</View>
					</Pressable>
				)}
				ListEmptyComponent={() => (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							paddingTop: 50,
						}}
					>
						<Ionicons name="chatbox-ellipses-outline" size={28} color="black" />
						<Text style={{ fontWeight: '600', fontSize: 16 }}>
							No bills yet
						</Text>
					</View>
				)}
			/>

			{isLoading && <LoaderModal loading={isLoading} text="loading" />}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		padding: 14,
		backgroundColor: colors.white,
	},
	title: {
		fontSize: 18,
		fontFamily: getFontFamily('Urbanist', 500),
		textAlign: 'center',
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
	sectionMenu: {
		// width: '100%',
		gap: 5,
		backgroundColor: colors.disable,
		paddingHorizontal: 10,
		paddingTop: 23,
		paddingBottom: 15,
		marginVertical: 8,
		borderRadius: 12,
	},
	textWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
	},
	textFlex: {},
	textTitle: {
		fontSize: 12,
		color: '#333',
		fontFamily: getFontFamily('Urbanist'),
	},
	dot: {
		backgroundColor: colors.primary,
		width: 8,
		height: 8,
		borderRadius: 4,
		marginRight: 5,
		borderWidth: 1,
		borderColor: 'white',
	},
	text: {
		fontSize: 14,
		fontFamily: getFontFamily('Urbanist', 600),
		textTransform: 'capitalize',
	},
	btnContainer: {
		marginTop: 10,
		paddingTop: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
		borderTopColor: colors.grey,
		borderTopWidth: 0.4,
	},
	btn: {
		marginTop: 10,
		padding: 10,
		borderRadius: 8,
		minWidth: 140,
	},
	btnText: {
		fontSize: 14,
		// fontWeight: '600',
		color: 'white',
		textAlign: 'center',
	},
});

export default App;
