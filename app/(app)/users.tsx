import {
	AntDesign,
	FontAwesome,
	FontAwesome6,
	MaterialIcons,
	Ionicons,
} from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import {
	FlatList,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	Pressable,
	View,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import { getErrorMessage } from '@/utils/getAxiosError';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/api/index';
import colors from '@/constants/color';
import LoaderModal from '@/components/LoaderModal';
import { ScrollView } from 'moti';
import MenuTab from '@/components/ui/MenuTab';
import SearchBar from '@/components/ui/SearchBar';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;

const Index = () => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState<any>([]); // Filtered users to display
	const [query, setQuery] = useState<string>(''); // Search query
	const [filterBy, setFilterBy] = useState<string>('All'); // Active filter
	const { token } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: async () => fetchUsers(token),
	});

	// Populate the users and filtered users list when data is fetched
	useEffect(() => {
		if (data) {
			setUsers(data);
			setFilteredUsers(data);
		}
	}, [data]);

	// Handle category filtering
	const handleCategoryChange = (category: string) => {
		setFilterBy(category);
		filterData(query, category);
	};

	// Function to filter data based on query and category
	const filterData = (searchText: string, category: string) => {
		let filtered = users;

		// Apply search filter
		if (searchText) {
			filtered = filtered.filter((user: any) =>
				user?.name?.toLowerCase()?.includes(searchText.toLowerCase())
			);
		}

		// Apply category filter
		if (category !== 'All') {
			filtered = filtered.filter(
				(user: any) => user?.status?.toLowerCase() === category?.toLowerCase()
			);
		}

		setFilteredUsers(filtered);
	};

	const handelPress = (id: string) => {
		router.push({
			pathname: '/user/user-details',
			params: { id },
		});
	};
	const filterTypes = ['All', 'New', 'Reviewed', 'Inactive'];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Manage Users</Text>
				<SearchBar
					setFilteredDatas={setFilteredUsers}
					filterData={filterData}
					filteredDatas={filteredUsers}
					setQuery={setQuery}
					query={query}
					filterBy={filterBy}
					placeholder="Search user..."
				/>
				<MenuTab
					handleCategoryChange={handleCategoryChange}
					filterTypes={filterTypes}
					filterBy={filterBy}
				/>
			</View>
			<FlatList
				keyExtractor={(item: any) => item?._id.toString()}
				showsVerticalScrollIndicator={false}
				data={filteredUsers}
				// renderItem={renderItems}
				contentContainerStyle={{padding: 10}}
				renderItem={({ item }) => (
					<Pressable
						key={item?._id}
						onPress={() => handelPress(item?._id)}
						style={styles.itemContainer}
					>
						<View style={styles.userContainer}>
							<View style={styles.imageContainer}>
								<Image
									source={{
										uri:
											item?.profileImage?.url ||
											`https://ui-avatars.com/api/?name=${item?.name}&&length=1&&background=random`,
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
								<Text style={styles.name}>{item?.name}</Text>
								<Text
									style={{
										...styles.text,
										textTransform: 'capitalize',
									}}
								>
									{item?.role}
								</Text>
							</View>
						</View>
						<View
							style={{
								...styles.submitButton,
								backgroundColor: colors.primary,
							}}
						>
							<Text style={styles.submitText}>View Account</Text>
						</View>
					</Pressable>
				)}
				ListEmptyComponent={() => (
					<Text style={{ padding: 10, textAlign: 'center' }}>No User</Text>
				)}
			/>

			{isLoading && <LoaderModal loading={isLoading} text="loading..." />}
		</SafeAreaView>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#f5f5f5',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	header: {
		marginBottom: 10,
	},
	cancelButton: {
		marginVertical: 20,
		paddingVertical: 10,
		fontSize: 18,
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	text: {
		fontSize: 14,
	},

	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 2,
		paddingVertical: 10,
		marginTop: 10,
		borderBottomColor: '#ccc',
		borderBottomWidth: 0.5,
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
	submitButton: {
		backgroundColor: colors.black,
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
	},
	submitText: {
		color: '#fff',
		fontWeight: 'semibold',
		fontSize: 12,
	},
	label: {
		fontSize: 18,
		marginBottom: 10,
	},

	menuWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 2,
		// paddingVertical: 10,
		// marginTop: 4,
	},
});
