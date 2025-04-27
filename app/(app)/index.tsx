import React, {
	useEffect,
	useCallback,
	useState,
	useMemo,
	useRef,
} from 'react';
import Colors from '@/constants/color';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	StatusBar,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BellSlashIcon, MapMarkerIcon, MessageAltIcon } from '@/assets/svg';
import { router } from 'expo-router';
import { menuItems } from '@/constants/data';
import { getStatusColor } from '@/utils/getStatusColor';
import { Role, useAuth } from '@/context/authContext';
import { getFontFamily, greeting } from '@/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchHome } from '@/api/index';
import AdminScreen from '@/components/home/AdminScreen';
import Notification from '@/components/ui/Notification';
import BottomSheet from '@gorhom/bottom-sheet';
import EstateBottomSheet from '@/components/ui/EstateBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Overlay from '@/components/ui/Overlay';
import moment from 'moment';
import colors from '@/constants/color';
import ScrollCards from '@/components/ScrollCards';
import Toast from 'react-native-toast-message';
import Info from '@/components/Info';
import ProfileModal from '@/components/ProfileModal';

export default function HomeScreen() {
	const { profile, role, token } = useAuth();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// const [isProfile, setIsProfile] = useState<boolean>(false);
	const [estates, setEstate] = useState<any>([]);
	useEffect(() => {
		console.log('Profile verified', profile, profile?.profileVerified);
		if (!profile?.profileVerified) {
			router.navigate('/(auth)/address');
			// setIsProfile(true);
		}
	}, [profile]);
	const { data, isLoading, error } = useQuery({
		queryKey: ['index'],
		queryFn: async () => fetchHome(token as string),
	});
	useEffect(() => {
		if (data) {
			// console.log('data?.announcements', data?.announcements);
			setEstate(data?.estates || data?.hoas?.estates);
		}
	}, [data]);
	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);

	// const snapPoints = ['50%', '90%'];
	const snapPoints = useMemo(() => ['15%', '95%'], []);

	// callbacks
	const handlePress = useCallback((index: number) => {
		console.log('index data', index);
		bottomSheetRef.current?.snapToIndex(index);
		setIsOpen(true);
	}, []);

	// const handleEstatePress = () => {
	// 	if (role !== Role.ADMIN) {

	// 		return;
	// 	}
	// 	handlePress(2);
	// };
	const handleClickPress = (id: string) => {
		bottomSheetRef.current?.close();
		setIsOpen(false);
		console.log(id);
	};
	// const handleContinue = () => {
	// 	router.navigate('/(auth)/address');
	// };
	return (
		<GestureHandlerRootView style={styles.container}>
			<SafeAreaView
				style={{
					flex: 1,
					// backgroundColor: '#eee',
					backgroundColor:
						role === Role.ADMIN ? colors.white : colors.background,
					paddingHorizontal: 14,
				}}
			>
				<View style={styles.header}>
					<View>
						<Text style={{ ...styles.text, fontSize: 12 }}>Location</Text>
						<Pressable style={styles.location} onPress={() => handlePress(2)}>
							<MapMarkerIcon color={colors.primary} />
							<TouchableOpacity style={{ paddingRight: 4 }}>
								<Text style={styles.subTitle}>
									{data?.hoa?.name?.substring(0, 20) || 'Western Estate'}
								</Text>
							</TouchableOpacity>
							<AntDesign name="down" size={12} color="black" />
						</Pressable>
					</View>
					<Notification isNotification={data?.notifications} />
				</View>
				<View style={styles.titleContainer}>
					<Text
						style={{
							...styles.title,
							fontWeight: 500,
							fontSize: 24,
							fontFamily: getFontFamily('Urbanist', '500'),
						}}
					>
						{greeting()} {profile?.name || 'Guest'}
					</Text>
				</View>
				<Info
					role={role || 'Tenant'}
					id={profile?.uniqueId || '0009'}
					house={'No. 3 Lane II'}
				/>
				{role === Role.ADMIN ? (
					<AdminScreen data={data} />
				) : (
					<>
						<View style={styles.menuContainer}>
							{menuItems.map((item, index) => (
								<Pressable
									key={index}
									style={styles.menuBtn}
									onPress={() => router.navigate(item.href as any)}
								>
									<item.iconName color="black" />
									<Text style={styles.menuBtnText}>{item.name}</Text>
								</Pressable>
							))}
						</View>
						{/* carousel here */}
						<ScrollCards />
						{/* carousel here */}
						<ScrollView showsVerticalScrollIndicator={false}>
							<View style={styles.section}>
								<View style={styles.sectionTitleContainer}>
									<Text style={styles.sectionTitle}>Dues</Text>
									<Pressable
										style={{
											padding: 0,
											margin: 0,
										}}
										onPress={() => router.navigate('/bills')}
									>
										<Text style={styles.sectionText}>
											View Request{' '}
											{data?.totalPending > 0 ? `(${data?.totalPending})` : ''}
										</Text>
									</Pressable>
								</View>
								{data?.payments?.length > 0 ? (
									<>
										{data?.payments?.map((item: IPayment, index: number) => {
											const statusColor = getStatusColor(
												item?.dueId?.status?.toLowerCase()
											);
											return (
												<Pressable
													key={index}
													style={styles.sectionMenu}
													onPress={() => router.navigate('/bills')}
												>
													<View style={styles.menuWrap}>
														<View style={styles.menuIcon}>
															<Entypo
																name="tools"
																size={24}
																color={colors.primary}
															/>
														</View>
														<View style={styles.textWrap}>
															<Text style={styles.textTitle}>
																{item?.dueId?.name?.length > 30
																	? `${item?.dueId?.name.substring(0, 30)}...`
																	: item?.dueId?.name}
															</Text>
															<Text style={styles.text}>
																{moment(item?.createdAt).format('ll')}
															</Text>
														</View>
													</View>
													<Text
														style={{
															...styles.menuText,
															color: statusColor.textColor,
															backgroundColor: statusColor.bgColor,
														}}
													>
														{item.dueId?.status}
													</Text>
												</Pressable>
											);
										})}
									</>
								) : (
									<View style={styles.cover}>
										<MessageAltIcon
											width={80.37}
											height={80.37}
											color={'#BDC0CE'}
										/>
										<Text style={styles.message}>No dues yet</Text>
									</View>
								)}
								<View style={styles.sectionTitleContainer}>
									<Text style={styles.sectionTitle}>Announcements</Text>
									<Pressable
										style={{
											padding: 0,
											margin: 0,
										}}
										onPress={() => router.navigate('/notifications')}
									>
										<Text style={styles.sectionText}>
											See All{' '}
											{data?.totalPending > 0 ? `(${data?.totalPending})` : ''}
										</Text>
									</Pressable>
								</View>
							</View>
							{data?.announcements?.length > 0 ? (
								<>
									{data?.announcements?.map(
										(item: IAnnouncement, index: number) => {
											return (
												<Pressable
													key={index}
													style={styles.sectionMenu}
													onPress={() => router.navigate('/notifications')}
												>
													<View
														style={{
															flexDirection: 'row',
															alignItems: 'center',
															gap: 5,
														}}
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
																<Text style={styles.textTitle}>
																	{item?.title}
																</Text>
																<Text style={styles.text}>
																	{moment(item.createdAt).format('ll')}
																</Text>
															</View>
															<Text style={styles.text}>{item?.message}</Text>
														</View>
													</View>
												</Pressable>
											);
										}
									)}
								</>
							) : (
								<View style={styles.cover}>
									<BellSlashIcon
										width={80.37}
										height={80.37}
										color={'#BDC0CE'}
									/>
									<Text style={styles.message}>No announcement yet</Text>
								</View>
							)}
						</ScrollView>
					</>
				)}
				{isOpen && <Overlay />}
				<BottomSheet
					ref={bottomSheetRef}
					snapPoints={snapPoints}
					onClose={() => setIsOpen(false)}
					enablePanDownToClose={true}
					index={-1}
				>
					<EstateBottomSheet data={estates} />
				</BottomSheet>
			</SafeAreaView>
			<Toast />
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		paddingTop: StatusBar.currentHeight,
		// marginTop: 10,
		paddingVertical: 5,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	location: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleContainer: {
		paddingVertical: 2,
	},
	title: {
		fontSize: 24,
		marginTop: 10,
		textTransform: 'capitalize',
	},
	subTitle: {
		fontSize: 14,
		fontWeight: 600,
		fontFamily: getFontFamily('Urbanist'),
	},
	menuBtnText: {
		fontSize: 12,
		fontFamily: getFontFamily('Urbanist', 600),
	},

	title2: {
		fontSize: 14,
		fontWeight: 'bold',
		flex: 1,
	},
	subTitle2: {
		fontSize: 13,
		color: '#000',
		marginBottom: 2,
		fontWeight: '500',
	},
	textTitle: {
		fontSize: 16,
		marginTop: 10,
		fontFamily: getFontFamily('Urbanist', 500),
		textTransform: 'capitalize',
	},
	text: {
		fontSize: 14,
		color: colors.text,
		lineHeight: 20,
		fontFamily: getFontFamily('Urbanist'),
	},
	menuContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 4,
		gap: 6,
		padding: 4,
		paddingVertical: 8,
		marginBottom: 20,
	},
	section: {},
	sectionTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 5,
	},
	sectionTitle: {
		fontSize: 14,
		fontFamily: getFontFamily('Urbanist', 500),
	},
	sectionText: {
		color: Colors.primary,
		fontFamily: getFontFamily('Urbanist', 500),
	},
	sectionLink: {
		fontSize: 16,
		color: 'blue',
	},
	sectionMenu: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 8,
		gap: 10,
		padding: 12,
		backgroundColor: colors.white,
		borderRadius: 14,
	},
	menuWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 10,
		flex: 1,
	},
	menuBtn: {
		// backgroundColor: 'ghostwhite',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
		flex: 1,
		width: 'auto',
		backgroundColor: colors.white,
		borderColor: colors.grey,
		borderWidth: 1,
		borderRadius: 16,
		paddingVertical: 14,
		paddingHorizontal: 5,
	},
	textWrap: {},
	menuTitle: {},
	menuIcon: {
		backgroundColor: '#EFF4FF',
		padding: 14,
		borderRadius: '50%',
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	menuText: {
		padding: 2,
		paddingHorizontal: 10,
		fontFamily: getFontFamily('Urbanist', 500),
		textTransform: 'capitalize',
		borderRadius: 12,
	},
	wrap: {
		flex: 1,
		// flexDirection: 'row',
		// alignItems: 'center',
		// justifyContent: 'space-between',
	},
	textFlex: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	message: {
		fontSize: 16,
		fontFamily: getFontFamily('Urbanist', 500),
		marginTop: 3,
	},
	cover: {
		flex: 1,
		height: 124,
		marginBottom: 70,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

// shift + option arrowDown
