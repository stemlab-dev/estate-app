import Colors from '@/constants/color';
import {
	AntDesign,
	Entypo,
	EvilIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Pressable,
	StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { menuItems, Dues, Announcement } from '@/constants/data';
import { getStatusColor } from '@/utils/getStatusColor';
import { useAuth } from '@/context/authContext';
import { greating } from '@/utils';
const User = (data: any) => {
	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: 'ghostwhite', padding: 14 }}
		>
			<View style={styles.header}>
				<View>
					<Text style={styles.text}>Location</Text>
					<Pressable style={styles.location}>
						<EvilIcons name="location" size={18} color={Colors.primary} />
						<Text style={{ ...styles.subTitle, paddingRight: 4 }}>
							Western Estate
						</Text>
						<AntDesign name="down" size={16} color="black" />
					</Pressable>
				</View>
				<Pressable
					onPress={() => router.navigate('/notifications')}
					style={styles.notification}
				>
					<MaterialIcons name="notifications-none" size={24} color="black" />
				</Pressable>
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{profile?.name || 'Guest'}</Text>
				{role === 'admin' && <Text>You have admin privileges.</Text>}
				<Text style={styles.text}>Hello {greating()}</Text>
			</View>
			<View style={styles.menuContainer}>
				{menuItems.map((item, index) => (
					<Pressable
						key={index}
						style={styles.menuBtn}
						onPress={() => router.navigate(item.href)}
					>
						<item.iconName name={item.icon} size={24} color="black" />
						<Text style={styles.subTitle}>{item.name}</Text>
					</Pressable>
				))}
			</View>
			<View style={styles.section}>
				<View style={styles.sectionTitleContainer}>
					<Text style={styles.sectionTitle}>Dues</Text>
					<Pressable style={{ padding: 10 }}>
						<Text style={styles.sectionText}>View Request (6)</Text>
					</Pressable>
				</View>
				{Dues.map((item, index) => {
					const statusColor = getStatusColor(item.status.toLowerCase());
					return (
						<Pressable
							key={index}
							style={styles.sectionMenu}
							onPress={() => router.navigate('report/why')}
						>
							<View style={styles.menuWrap}>
								<View style={styles.menuIcon}>
									<Entypo name="tools" size={24} color="blue" />
								</View>
								<View style={styles.textWrap}>
									<Text style={styles.textTitle}>{item.name}</Text>
									<Text style={styles.text}>{item.date}</Text>
								</View>
							</View>
							<Text
								style={{
									...styles.menuText,
									color: statusColor.textColor,
									backgroundColor: statusColor.bgColor,
								}}
							>
								{item.status}
							</Text>
						</Pressable>
					);
				})}
			</View>
			<View style={styles.section}>
				<View style={styles.sectionTitleContainer}>
					<Text style={styles.sectionTitle}>Announcement</Text>
					<Pressable
						style={{ padding: 10 }}
						onPress={() => router.navigate('/notifications')}
					>
						<Text style={styles.sectionText}>See All</Text>
					</Pressable>
				</View>
				{Announcement.map((item, index) => (
					<Pressable
						key={index}
						style={styles.sectionMenu}
						onPress={() => router.navigate('report/report-details')}
					>
						<View style={styles.menuIcon}>
							<Entypo name="bell" size={24} color="blue" />
						</View>
						<View style={styles.wrap}>
							<View style={styles.textFlex}>
								<Text style={styles.textTitle}>{item.title}</Text>
								<Text style={styles.text}>{item.date}</Text>
							</View>
							<Text style={styles.text}>{item.content}</Text>
						</View>
					</Pressable>
				))}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		paddingTop: StatusBar.currentHeight,
		marginTop: 20,
		paddingVertical: 5,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	location: {
		flexDirection: 'row',
		alignItems: 'center',
		// paddingVertical: 10,
	},
	notification: {
		// borderColor: Colors.black,
		padding: 5,
		borderWidth: 1,
		borderRadius: 12,
	},
	notificationAlert: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		color: 'red',
		position: 'absolute',
	},
	titleContainer: {
		paddingVertical: 2,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
		textTransform: 'capitalize',
	},
	subTitle: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	textTitle: {
		fontSize: 16,
		fontWeight: 'semibold',
		marginTop: 10,
	},
	text: {
		fontSize: 14,
		color: Colors.text,
		lineHeight: 20,
	},
	menuContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 4,
		gap: 6,
		backgroundColor: '#F8F9fC',
		padding: 4,
		paddingVertical: 8,
	},
	section: {},
	sectionTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: 'semibold',
		marginTop: 10,
	},
	sectionText: {
		color: Colors.primary,
		fontWeight: 'semibold',
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
		marginVertical: 4,
		gap: 10,
		backgroundColor: '#F8F9fC',
		padding: 2,
		paddingVertical: 6,
	},
	menuWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 10,
		flex: 1,
	},
	menuBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
		flex: 1,
		width: 'auto',
		borderColor: '#666',
		borderWidth: 1,
		borderRadius: 12,
		paddingVertical: 10,
		paddingHorizontal: 20,
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
});

export default User;
