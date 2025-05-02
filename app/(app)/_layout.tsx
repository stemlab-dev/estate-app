import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Role, useAuth } from '@/context/authContext';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import colors from '@/constants/color';
import { CardIcon, HomeIcon, InfoHexagonIcon, UserIcon } from '@/assets/svg';

export default function TabLayout() {
	const { role, token } = useAuth();
	useEffect(() => {
		if (!token) {
			router.push('/login');
		}
	}, [token]);

	if (role === Role.ADMIN) {
		return (
			<Tabs
				screenOptions={{
					// tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
					headerShown: false,
					tabBarButton: HapticTab,
					tabBarBackground: TabBarBackground,
					tabBarStyle: Platform.select({
						ios: {
							// Use a transparent background on iOS to show the blur effect
							position: 'absolute',
						},
						default: {},
					}),
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: 'Home',
						tabBarIcon: ({ color }: { color: string }) => (
							<Ionicons
								name="home-outline"
								size={24}
								// color={focused ? colors.primary : '#999'}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="users"
					options={{
						title: 'Users',
						tabBarIcon: ({ color }: { color: string }) => (
							<Feather size={24} name="users" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="payments"
					options={{
						title: 'Payments',
						tabBarIcon: ({ color }: { color: string }) => (
							<Feather size={24} name="credit-card" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="dues"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="reports"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="issues"
					options={{
						title: 'Reports',
						tabBarIcon: ({ color }: { color: string }) => (
							<MaterialIcons size={24} name="crisis-alert" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: 'Profile',
						tabBarIcon: ({ color }: { color: string }) => (
							<MaterialIcons size={24} name="person" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="payment"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="bills"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="report"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="user"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="issue"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="notifications"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="success-page"
					options={{
						href: null,
					}}
				/>
			</Tabs>
		);
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.black,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {
						padding: 15,
					},
				}),
				
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }: { color: string }) => (
						<HomeIcon width={24} height={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="bills"
				options={{
					title: 'Payment',
					tabBarIcon: ({ color }: { color: string }) => (
						<CardIcon width={24} height={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="reports"
				options={{
					title: 'Reports',
					tabBarIcon: ({ color }: { color: string }) => (
						<InfoHexagonIcon width={24} height={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }: { color: string }) => (
						<UserIcon width={24} height={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="payment"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="dues"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="payments"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="report"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="users"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="user"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="issues"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="issue"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="success-page"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
}
