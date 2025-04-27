import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { AntDesign, Feather, Ionicons, Octicons } from '@expo/vector-icons';
import { adminMenuItems } from '@/constants/data';
import { router } from 'expo-router';
import colors from '@/constants/color';

const Admin = ({ data }: { data: any }) => {
	const iconSize = 22;
	return (
		<View style={styles.container}>
			<View style={styles.menuContainer}>
				<TouchableOpacity
					onPress={() => router.navigate('/users')}
					style={styles.menuItem}
				>
					<View>
						<Feather name="users" size={iconSize} style={styles.menuIcon} />
					</View>
					<Text style={styles.text}>Members</Text>
					<Text style={styles.menuText}>{data?.totalUsers}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => router.navigate('/dues')}
					style={styles.menuItem}
				>
					<Octicons
						name="credit-card"
						size={iconSize}
						style={styles.menuIcon}
					/>
					<Text style={styles.text}>Pending Payment</Text>
					<Text style={styles.menuText}>₦{data?.pendingPayments}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.menuContainer}>
				<TouchableOpacity
					onPress={() => router.navigate('/issues')}
					style={styles.menuItem}
				>
					<Feather
						name="alert-triangle"
						size={iconSize}
						style={styles.menuIcon}
					/>
					<Text style={styles.text}>Reported Issues</Text>
					<Text style={styles.menuText}>{data?.totalIssues}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => router.navigate('/payment/revenues')}
					style={styles.menuItem}
				>
					<Feather name="credit-card" size={iconSize} style={styles.menuIcon} />
					<Text style={styles.text}>Monthly Revenue</Text>
					<Text style={styles.menuText}>₦{data?.totalRevenue}</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.menuWrap}>
				<Text style={styles.subTitle}>Accounts</Text>
				<Pressable
					style={styles.bankBtn}
					onPress={() => router.navigate('/payment/bank')}
				>
					<View
						style={{
							padding: 10,
							borderRadius: 10,
							borderWidth: 2,
							borderStyle: 'dashed',
							borderColor: '#ddd',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<AntDesign
							name="plus"
							size={iconSize}
							style={{ textAlign: 'center' }}
						/>
						<Text style={styles.bankText}>Add a bank account</Text>
					</View>
				</Pressable>
			</View>
			<View style={styles.menuWrap}>
				<Text style={styles.subTitle}>Quick Action</Text>
				<View style={styles.menuContainer}>
					{adminMenuItems.map((item, index) => (
						<Pressable
							key={index}
							style={styles.menuBtn}
							onPress={() => router.navigate(item.href)}
						>
							<item.iconName name={item.icon} size={iconSize} color="black" />
							<Text style={styles.subTitle}>{item.name}</Text>
						</Pressable>
					))}
				</View>
			</View>
		</View>
	);
};

export default Admin;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
		backgroundColor: colors.white,
	},
	menuContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 10,
		marginTop: 10,
		width: '100%',
	},
	menuItem: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		borderColor: colors.borderLight,
		backgroundColor: colors.white,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
	},
	menuIcon: {
		padding: 10,
		borderRadius: 20,
		color: colors.primary,
		backgroundColor: '#EFF4FF',
		alignSelf: 'flex-start',
	},
	text: {
		marginVertical: 8,
	},
	menuText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	menuWrap: {
		marginTop: 16,
	},
	bankBtn: {
		borderColor: colors.borderLight,
		backgroundColor: colors.white,
		width: 'auto',
		borderRadius: 10,
		borderWidth: 1,
		padding: 5,
		marginTop: 10,
	},
	bankText: {
		// color: 'white',
		fontSize: 18,
		fontWeight: 'semibold',
		textAlign: 'center',
	},
	menuBtn: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
		paddingVertical: 10,
		paddingHorizontal: 20,
		width: 'auto',
		borderColor: colors.borderLight,
		backgroundColor: colors.white,
		borderWidth: 1,
		borderRadius: 12,
	},
	icon: {
		padding: 10,
		borderRadius: 5,
	},
	subTitle: {
		fontSize: 14,
		fontWeight: '600',
	},
});
