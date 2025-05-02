import React, { useEffect, useState, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
	SafeAreaView,
	StatusBar,
	Text,
	Image,
	Animated,
	TouchableOpacity,
	View,
	StyleSheet,
	Pressable,
	Alert,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	AntDesign,
	Entypo,
	EvilIcons,
	Feather,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import colors from '@/constants/color';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/authContext';
import { fetchIssue } from '@/api/index';
import LoaderModal from '@/components/LoaderModal';
import Replies from '@/components/issue/Replies';
import axios from 'axios';
import { getErrorMessage } from '@/utils/getAxiosError';
import moment from 'moment';
import Menu from '@/components/issue/Menu';
import StatusBtn from '@/components/issue/StatusBtn';
import Toast from 'react-native-toast-message';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;

export default function Index() {
	const [isReply, setIsReply] = useState<boolean>(false);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [replies, setReplies] = useState<any>([]);
	const { id } = useLocalSearchParams();
	const [loading, setLoading] = useState(false);
	const { token } = useAuth();
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery({
		queryKey: ['issues', id],
		queryFn: async () => fetchIssue(token, id),
	});
	const handelPress = (id: string) => {
		router.push({
			pathname: '/issues',
			params: { id },
		});
	};
	const [menuHeight, setMenuHeight] = useState(0); // State to store the height of the menu content
	const animatedHeight = useRef(new Animated.Value(0)).current;
	const animatedOpacity = useRef(new Animated.Value(0)).current;

	const toggleMenu = () => {
		if (isMenuOpen) {
			// Close the menu
			Animated.parallel([
				Animated.timing(animatedHeight, {
					toValue: 0,
					duration: 200,
					useNativeDriver: false,
				}),
				Animated.timing(animatedOpacity, {
					toValue: 0,
					duration: 200,
					useNativeDriver: false,
				}),
			]).start(() => setIsMenuOpen(false));
		} else {
			// Open the menu
			setIsMenuOpen(true);
			Animated.parallel([
				Animated.timing(animatedHeight, {
					toValue: 162, // Use the dynamically measured height
					duration: 200,
					useNativeDriver: false,
				}),
				Animated.timing(animatedOpacity, {
					toValue: 1,
					duration: 200,
					useNativeDriver: false,
				}),
			]).start();
		}
	};

	const closeMenu = () => {
		if (isMenuOpen) {
			toggleMenu();
		}
	};

	// Measure the height of the menu content
	const onMenuLayout = (event: any) => {
		const { height } = event.nativeEvent.layout;
		setMenuHeight(() => height);
	};

	useEffect(() => {
		if (data) {
			console.log('data', data?.reportedBy);
			if (data.replies) {
				setReplies(data.replies);
			}
			// console.log('data ghjkl;kjhkl', data);
		}
	}, [data]);

	const mutation = useMutation({
		mutationFn: async (message: string) => {
			return axios.post(
				`${apiUrl}/reports/${id}/reply`,
				{
					message
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['reports', 'issues', id]
			});
			Toast.show({
				type: 'success',
				text1: 'Report sent',
				text2: 'Incident reported successfully',
			});
			// router.push('/(app)/issues'); // Reset form after success
		},
		onError: (error) => {
			const message = getErrorMessage(error);
			console.log(message);
			Toast.show({
				type: 'error',
				text1: 'Something went wrong',
				text2: message,
			});
		},
	});
	const updateMutation = useMutation({
		mutationFn: async (status: string) => {
			return axios.patch(
				`${apiUrl}/reports`,

				{ reportId: id, action: status },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['reports', 'issues', id],
			});
			Toast.show({
				type: 'success',
				text1: 'Report updated',
				text2: 'Report updated successfully',
			});
			// router.push('/(app)/issues'); // Reset form after success
		},
		onError: (error) => {
			const message = getErrorMessage(error);
			console.log(message);
			Toast.show({
				type: 'error',
				text1: 'Something went wrong',
				text2: message,
			});
		},
	});

	const handelSend = async () => {
		try {
			if (!message) {
				return Alert.alert('Error', 'Please enter a message');
			}

			console.log('message', message);
			setLoading(true);
			await mutation.mutateAsync(message);
		} catch (error) {
			const message = getErrorMessage(error);
			console.log(message);
			Toast.show({
				type: 'error',
				text1: 'Something went wrong',
				text2: message,
			});
			router.push('/(app)/issues');
		} finally {
			setLoading(false);
		}
	};
	const handelUpdate = async (status: string) => {
		try {
			setLoading(true);
			toggleMenu();
			console.log('status', status);
			await updateMutation.mutateAsync(status);
		} catch (error) {
			const message = getErrorMessage(error);
			console.log(message);
			Alert.alert('Something went wrong', message || 'Something went wrong');
			router.replace('/(app)/issues');
		} finally {
			setLoading(false);
		}
	};
	return (
		<TouchableWithoutFeedback onPress={closeMenu}>
			<SafeAreaView style={styles.container}>
				<View
					style={{
						padding: 10,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginTop: 10,
						}}
					>
						<TouchableOpacity onPress={() => router.navigate('/(app)/issues')}>
							<AntDesign name="left" size={24} color={colors.black} />
						</TouchableOpacity>
						<Text style={styles.title}>Issue Details</Text>
						<View
							style={{
								flexDirection: 'row',
								gap: 10,
								alignItems: 'center',
								zIndex: 1000,
							}}
						>
							<TouchableOpacity onPress={toggleMenu}>
								<MaterialCommunityIcons
									name="dots-vertical-circle-outline"
									size={20}
									color="black"
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => router.navigate('/(app)/issues')}
							>
								<AntDesign name="sharealt" size={20} color={colors.black} />
							</TouchableOpacity>
						</View>
					</View>

					{/* Dropdown Menu */}
					<Animated.View
						style={[
							styles.menu,
							{
								height: animatedHeight,
								opacity: animatedOpacity,
							},
						]}
					>
						<View onLayout={onMenuLayout} style={styles.menuContent}>
							<TouchableOpacity
								style={styles.menuItem}
								onPress={() => handelUpdate('resolved')}
							>
								<Text style={styles.menuText}>Mark as resolved</Text>
								<AntDesign
									name="checkcircleo"
									size={16}
									color={colors.success}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.menuItem}
								onPress={() => handelUpdate('inprogress')}
							>
								<Text style={styles.menuText}>Mark In progress</Text>
								<EvilIcons name="spinner" size={24} color={colors.black} />
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.menuItem}
								onPress={() => handelUpdate('delete')}
							>
								<Text style={styles.menuText}>Delete Issue</Text>
								<Feather name="x" size={24} color="red" />
							</TouchableOpacity>
						</View>
					</Animated.View>
					<View style={styles.itemContainer}>
						<View style={styles.userContainer}>
							<View style={styles.imageContainer}>
								<Image
									source={{
										uri:
											data?.reportedBy?.profileImage?.url ||
											`https://ui-avatars.com/api/?name=${data?.reportedBy?.name}&&length=1`,
									}}
									style={{
										height: 48,
										width: 48,
										borderRadius: 24,
										borderWidth: 0.5,
										// borderColor: COLORS.secondary,
									}}
								/>
							</View>
							<View>
								<Text style={styles.name}>
									{data?.reportedBy?.name || 'Abdul'}
								</Text>
								<Text
									style={{
										...styles.text,
										textTransform: 'capitalize',
									}}
								>
									{data?.reportedBy?.role || 'Tenant'}
								</Text>
							</View>
						</View>
						<Pressable
							onPress={() => handelPress(data.reportedBy._id)}
							style={{
								...styles.submitButton,
								backgroundColor: colors.primary,
							}}
						>
							<Text style={styles.submitText}>View Account</Text>
						</Pressable>
					</View>
					<View>
						<Text style={styles.headerText}>{data?.category}</Text>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								gap: 5,
								justifyContent: 'space-between',
							}}
						>
							<View
								style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
							>
								<Feather name="loader" size={16} color={colors.primary} />
								<Text>Status</Text>
							</View>
							{/* <Text style={styles.statusText}>{data?.status}</Text> */}

							<StatusBtn status={data?.status} />
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								gap: 5,
								justifyContent: 'space-between',
								paddingVertical: 5,
								marginTop: 5,
							}}
						>
							<View
								style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
							>
								<Feather name="clock" size={16} color={colors.primary} />
								<Text>Date</Text>
							</View>
							<Text style={styles.text}>
								{moment(data?.createdAt).format('ll')}
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',
							// width: '100%'

							gap: 2,
						}}
					>
						<TouchableOpacity
							style={{
								...styles.tabButton,
								borderBottomColor: isReply ? colors.deepDeem : colors.primary,
							}}
							onPress={() => setIsReply(false)}
						>
							<Text
								style={{
									...styles.tabText,
									color: isReply ? '' : colors.primary,
								}}
							>
								Descriptions
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...styles.tabButton,
								borderBottomColor: !isReply ? colors.deepDeem : colors.primary,
							}}
							onPress={() => setIsReply(true)}
						>
							<Text
								style={{
									...styles.tabText,
									color: !isReply ? '' : colors.primary,
								}}
							>
								Reply
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						padding: 10,
					}}
				>
					{isReply ? (
						<Replies
							replies={replies}
							message={message}
							setMessage={setMessage}
							handelSend={handelSend}
						/>
					) : (
						<View style={styles.descriptionsContainer}>
							<Text style={styles.descriptionsText}>{data?.reason}</Text>
						</View>
					)}
				</View>
				{isLoading ||
					(loading && <LoaderModal loading={isLoading} text="loading" />)}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		padding: 10,
		flexDirection: 'column',
	},
	header: {
		flex: 1,
		padding: 10,
		// flexDirection: 'column',
		// justifyContent: 'space-between',
		// alignItems: 'center',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
		paddingVertical: 10,
		marginTop: 10,
		borderBottomColor: '#ccc',
		borderBottomWidth: 0.5,
		zIndex: 1000,
	},
	menu: {
		position: 'absolute',
		top: 70, // Adjust based on your header height
		right: 10,
		backgroundColor: 'white',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ccc',
		// overflow: 'hidden',
		// width: 130,
		zIndex: 100000,
	},
	menuContent: {
		padding: 10,
		zIndex: 1000,
	},
	menuItem: {
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
	},
	menuText: {
		fontSize: 16,
		paddingVertical: 5,
		// color: '#333',
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 2,
		flex: 1,
	},
	imageContainer: {
		borderRadius: '50%',
		marginRight: 5,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	text: {},
	submitButton: {
		backgroundColor: colors.black,
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
		zIndex: 120,
	},
	submitText: {
		color: '#fff',
		fontWeight: 'semibold',
		fontSize: 12,
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
		marginVertical: 10,
		textTransform: 'capitalize',
	},
	statusText: {
		fontSize: 16,
	},
	tabButton: {
		flex: 1,
		borderBottomWidth: 1,
		padding: 10,
		marginBottom: 10,
	},
	tabText: {
		color: colors.deepDeem,
		fontSize: 16,
		textAlign: 'center',
	},
	replyContainer: {},

	descriptionsContainer: {
		padding: 10,
		backgroundColor: '#fff',
		borderRadius: 5,
		borderColor: colors.grey,
		borderWidth: 1,
	},
	descriptionsText: {
		fontSize: 16,
		minHeight: 250,
	},
});
