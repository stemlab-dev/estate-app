import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import {
	FlatList,
	StatusBar,
	StyleSheet,
	Text,
	Pressable,
	View,
	TouchableOpacity,
	RefreshControl,
} from 'react-native';
import moment from 'moment';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import colors from '@/constants/color';
import LoaderModal from '@/components/LoaderModal';
import MenuTab from '@/components/ui/MenuTab';
import SearchBar from '@/components/ui/SearchBar';
import { fetchIssues } from '@/api/index';
import { getStatusColor } from '@/utils/getStatusColor';
import StatusBtn from '@/components/issue/StatusBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFontFamily } from '@/utils';

const Index = () => {
	const [issues, setIssues] = useState([]);
	const [filteredIssues, setFilteredIssues] = useState<any>([]); // Filtered users to display
	const [query, setQuery] = useState<string>(''); // Search query
	const [filterBy, setFilterBy] = useState<string>('All'); // Active filter
	const [refreshing, setRefreshing] = useState(false);
	const { token } = useAuth();
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['issues'],
		queryFn: async () => fetchIssues(token as string),
	});

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch(); // This re-fetches the issues
		setRefreshing(false);
	}, [refetch]);

	// Populate the users and filtered users list when data is fetched
	useEffect(() => {
		if (data) {
			// console.log('issues', data);
			setIssues(data);
			setFilteredIssues(data);
		}
	}, [data]);

	// Handle category filtering
	const handleCategoryChange = (category: string) => {
		setFilterBy(category);
		filterData(query, category);
	};

	// Function to filter data based on query and category
	const filterData = (searchText: string, category: string) => {
		let filtered = issues;

		// Apply search filter
		if (searchText) {
			filtered = filtered.filter((user: any) =>
				user.name.toLowerCase().includes(searchText.toLowerCase())
			);
		}

		// Apply category filter
		if (category === 'Payments') {
			filtered = filtered.filter(
				(item: any) => (item: any) =>
					item.category.toLowerCase() === 'payment issue'
			);
		} else if (category === 'Issues') {
			filtered = filtered.filter(
				(item: any) => item.category.toLowerCase() === 'official complaint'
			);
		} else if (category === 'Users') {
			filtered = filtered.filter((item: any) =>
				['billing issue', 'receipt issue'].includes(item.category.toLowerCase())
			);
		} else if (category !== 'All') {
			filtered = filtered.filter(
				(item: any) => item.status.toLowerCase() === category.toLowerCase()
			);
		}

		setFilteredIssues(filtered);
	};

	const handelPress = (id: string) => {
		router.push({
			pathname: '/issue/issue-details',
			// pathname: '/report/report-details',
			params: { id },
		});
	};
	const filterTypes = ['All', 'Payments', 'Issues', 'Users'];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 8,
					}}
				>
					<Text style={styles.title}>Reports</Text>
					<TouchableOpacity
						onPress={() => router.navigate('/reports')}
						style={{ padding: 10 }}
					>
						<Text
							style={{ color: colors.primary, fontFamily: getFontFamily() }}
						>
							Download
						</Text>
					</TouchableOpacity>
				</View>
				<SearchBar
					setFilteredDatas={filteredIssues}
					filterData={filterData}
					filteredDatas={filteredIssues}
					setQuery={setQuery}
					query={query}
					filterBy={filterBy}
					placeholder="Search issues..."
				/>
				<View style={{ marginTop: 10, marginBottom: 10 }}>
					<MenuTab
						handleCategoryChange={handleCategoryChange}
						filterTypes={filterTypes}
						filterBy={filterBy}
					/>
				</View>
			</View>
			<FlatList
				keyExtractor={(item: any) => item?._id.toString()}
				showsVerticalScrollIndicator={false}
				data={filteredIssues}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => {
					const statusColor = getStatusColor(item?.status?.toLowerCase());
					return (
						<Pressable
							key={item?._id}
							// onPress={() => handelPress(item?._id)}
							style={styles.itemContainer}
						>
							<Text
								style={{
									fontSize: 14,
									fontFamily: getFontFamily('Urbanist', 600),
									textAlign: 'left',
								}}
							>
								{item.category.toUpperCase()}
							</Text>
							<Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
								{item.reason}
							</Text>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									marginTop: 16,
								}}
							>
								<View
									style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
								>
									<Feather name="clock" size={18} color="black" />
									<Text style={styles.text}>
										{moment(item.createdAt).format('ll')}
									</Text>
								</View>
								<StatusBtn status={item?.status} />
							</View>
						</Pressable>
					);
				}}
				ListEmptyComponent={() => (
					<Text style={{ padding: 10, textAlign: 'center' }}>No Info</Text>
				)}
			/>

			{isLoading && <LoaderModal loading={isLoading} text="loading" />}
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
		fontFamily: getFontFamily('Urbanist', 500),
		fontSize: 24,
		textAlign: 'center',
	},
	text: {
		fontSize: 14,
		textTransform: 'capitalize',
	},

	itemContainer: {
		gap: 2,
		padding: 10,
		marginTop: 10,
		borderColor: '#ccc',
		borderRadius: 10,
		borderWidth: 0.8,
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
		// backgroundColor: colors.black,
		padding: 10,
		marginTop: 10,
		borderRadius: 10,
		alignItems: 'center',
		borderColor: colors.black,
		borderWidth: 0.6,
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
	},
});
