import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Alert,
	StatusBar,
	ActivityIndicator,
} from 'react-native';
import React, { useMemo, useState, useRef, useCallback } from 'react';
import Button from '@/components/ui/Button';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import {
	userCheckOptions,
	frequencies,
	types,
	statues,
} from '@/constants/data';
import axios from 'axios';
import colors from '@/constants/color';
import { useAuth } from '@/context/authContext';
import { fetchUsers } from '@/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import UsersModal from '@/components/payment/UsersModal';
import ConfirmBottomSheet from '@/components/payment/ConfirmBottomSheet';
import InputField from '@/components/auth/InputField';
import SelectField from '@/components/auth/SelectField';
import { getErrorMessage } from '@/utils/getAxiosError';
import Toast from 'react-native-toast-message';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;

const Account = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [isUsersType, setUsersType] = useState(userCheckOptions[0].id);
	const { type: category } = useLocalSearchParams();
	const [members, setMembers] = useState([]);
	const bottomSheetRef = useRef(null);
	const usersSheetRef = useRef(null);
	const modalSheetRef = useRef(null);
	const snapPoints = useMemo(() => ['40%'], []);
	const usersSnapPoints = useMemo(() => ['100%'], []);
	const modalSnapPoints = useMemo(() => ['100%'], []);
	const { token } = useAuth();

	const queryClient = useQueryClient();
	const { data: users } = useQuery({
		queryKey: ['users'],
		queryFn: async () => fetchUsers(token),
	});
	const clearFeilds = {
		name: '',
		amount: '',
		frequency: '',
		type: category || '',
		status: '',
		dueDate: '',
	};
	const [formData, setFormData] = useState(clearFeilds);
	const [errors, setErrors] = useState({
		name: '',
		amount: '',
		frequency: '',
		type: '',
		status: '',
	});

	const handleValidate = useCallback(() => {
		const newErrors = {};
		let isValid = true;

		const requiredFields = ['name', 'amount', 'frequency', 'type', 'status'];
		requiredFields.forEach((field) => {
			if (!formData[field]?.trim()) {
				newErrors[field] = `${
					field.charAt(0).toUpperCase() + field.slice(1)
				} is required`;
				isValid = false;
			}
		});

		setErrors(newErrors);
		return isValid;
	}, [formData]);

	const handleCreateDues = async () => {
		try {
			if (!handleValidate()) return;
			setLoading(true);
			const { data } = await axios.post(
				`${apiUrl}/admins/dues`,
				{ ...formData, members },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			console.log('data received', data);
			setMembers([]);
			setLoading(false);
			setFormData(clearFeilds);
			queryClient.invalidateQueries({
				queryKey: ['payments', 'reports', 'notifications'],
			});
			router.push({
				pathname: '/success-page',
				params: {
					link: '/payments',
					message: 'Invoice created successfully!',
				},
			});
		} catch (error) {
			// console.error('Error creating invoice:', error);
			const message = getErrorMessage(error);
			Toast.show({
				type: 'error',
				text1: 'Error creating invoice',
				text2: message,
			});
		} finally {
			setLoading(false);
			usersSheetRef?.current?.close();
			modalSheetRef?.current?.close();
		}
	};

	const handleConfirmUser = () => {
		bottomSheetRef?.current?.expand();
		usersSheetRef?.current?.close();
	};

	const handelConfirm = useCallback(() => {
		if (!users) return;
		const selectedUsers = users?.filter((user) => user._id) || [];
		if (isUsersType !== 'AllUsers') {
			if (members.length <= 0) {
				// showToast('error', 'Select payment members!');
				// Toast.show({
				// 	type: 'error',
				// 	text1: 'Select payment members!',
				// 	position: 'bottom',
				// });
				bottomSheetRef?.current?.close();
				usersSheetRef?.current?.expand();
				return;
			}
			setMembers(selectedUsers);
			bottomSheetRef?.current?.close();
			usersSheetRef?.current?.close();
			handleCreateDues();
			return;
		}
		setMembers(() => users);
		bottomSheetRef?.current?.close();
		handleCreateDues();
		return;
	}, [isUsersType, members, users]);
	const handlePress = () => {
		if (!handleValidate()) return;
		bottomSheetRef?.current?.expand();
	};
	const handleOpenUsersModal = () => {
		usersSheetRef?.current?.expand();
	};

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				{...props}
			/>
		),
		[]
	);

	return (
		<GestureHandlerRootView style={styles.container}>
			{/* <StatusBar style="auto" backgroundColor={colors.background} /> */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Set a new Payment</Text>
			</View>
			{/* create form component */}
			<View style={styles.formCard}>
				<View style={{ flex: 1 }}>
					<InputField
						label="Name"
						value={formData.name}
						onChange={(text) =>
							setFormData((prev) => ({ ...prev, name: text }))
						}
						placeholder="Electricity bills"
						error={errors.name}
					/>
					<SelectField
						label="Frequency"
						data={frequencies}
						value={formData.frequency}
						setValue={(value) =>
							setFormData((prev) => ({ ...prev, frequency: value }))
						}
						error={errors.frequency}
					/>
					<InputField
						label="Amount"
						value={formData.amount}
						onChange={(text) =>
							setFormData((prev) => ({ ...prev, amount: text }))
						}
						placeholder="10000"
						error={errors.amount}
					/>
					<SelectField
						label="Type"
						data={types}
						value={formData.type}
						setValue={(value) =>
							setFormData((prev) => ({ ...prev, type: value }))
						}
						error={errors.type}
					/>
					<SelectField
						label="Status"
						data={statues}
						value={formData.status}
						setValue={(value) =>
							setFormData((prev) => ({ ...prev, status: value }))
						}
						error={errors.status}
					/>
				</View>
				<Button
					text="Add Invoice"
					loading={loading}
					bgColor={colors.primary}
					textColor="#FFF"
					handlePress={handlePress}
				/>
			</View>
			{/* <LoaderModal loading={loading} text="loading..." /> */}
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				backdropComponent={renderBackdrop}
				enablePanDownToClose={true}
				index={-1}
				backgroundStyle={{
					borderRadius: 50,
				}}
			>
				<ConfirmBottomSheet
					selectedId={isUsersType}
					handelConfirm={handelConfirm}
					handelSelectType={setUsersType}
					handleOpenUsersModal={handleOpenUsersModal}
					selectedUsers={members?.length || 0}
					allUsers={users?.length || 0}
				/>
			</BottomSheet>
			<BottomSheet
				ref={usersSheetRef}
				snapPoints={usersSnapPoints}
				enablePanDownToClose={true}
				index={-1}
			>
				<UsersModal
					data={users}
					members={members}
					setMembers={setMembers}
					handleSubmit={handleConfirmUser}
				/>
			</BottomSheet>
			<BottomSheet
				ref={modalSheetRef}
				snapPoints={modalSnapPoints}
				enablePanDownToClose={false}
				index={-1}
			>
				<BottomSheetView>
					<ActivityIndicator />
				</BottomSheetView>
			</BottomSheet>

			<Toast />
		</GestureHandlerRootView>
	);
};

export default Account;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		padding: 10,
		flexDirection: 'column',
		height: '100%',
		backgroundColor: 'white',
	},
	header: {
		marginTop: 10,
		// marginBottom: 26,
		padding: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
	},
	formCard: {
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		flex: 1,
	},
});
