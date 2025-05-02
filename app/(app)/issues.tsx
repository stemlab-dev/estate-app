import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import {
	FlatList,
	RefreshControl,
	StatusBar,
	StyleSheet,
	Text,
	Pressable,
	View,
	SafeAreaView,
} from 'react-native';
import moment from 'moment';
import { useAuth } from '@/context/authContext';
import { getErrorMessage } from '@/utils/getAxiosError';
import { useQuery } from '@tanstack/react-query';
import colors from '@/constants/color';
import LoaderModal from '@/components/LoaderModal';
import MenuTab from '@/components/ui/MenuTab';
import SearchBar from '@/components/ui/SearchBar';
import { fetchIssues } from '@/api/index';
import { getStatusColor } from '@/utils/getStatusColor';
import StatusBtn from '@/components/issue/StatusBtn';

const Index = () => {
	const [issues, setIssues] = useState([]);
	const [filteredIssues, setFilteredIssues] = useState<any>([]); // Filtered users to display
	const [query, setQuery] = useState<string>(''); // Search query
	const [filterBy, setFilterBy] = useState<string>('All'); // Active filter
	const [refreshing, setRefreshing] = useState(false);
	const { token, role } = useAuth();
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['issues'],
		queryFn: async () => fetchIssues(token),
	});

		const onRefresh = useCallback(async () => {
			setRefreshing(true);
			await refetch(); // This re-fetches the issues
			setRefreshing(false);
		}, [refetch]);

	// Populate the users and filtered users list when data is fetched
	useEffect(() => {
		if (data) {
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
			filtered = filtered.filter((item: any) =>
				item?.name?.toLowerCase().includes(searchText.toLowerCase())
			);
		}

		// Apply category filter
		if (category !== 'All') {
			filtered = filtered?.filter(
				(item: any) => item?.status?.toLowerCase() === category?.toLowerCase()
			);
		}

		setFilteredIssues(filtered);
	};

	const handelPress = (id: string) => {
		router.push({
			pathname: '/issue/issue-details',
			params: { id },
		});
	};
	const filterTypes = ['All', 'Pending', 'Resolved', 'In progress'];

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Maintain Issues</Text>
				<SearchBar
					setFilteredDatas={filteredIssues}
					filterData={filterData}
					filteredDatas={filteredIssues}
					setQuery={setQuery}
					query={query}
					filterBy={filterBy}
					placeholder="Search issues..."
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
				data={filteredIssues}
				refreshing={refreshing}
				onRefresh={onRefresh}
				renderItem={({ item }) => {
					return (
						<View style={styles.itemContainer} key={item?._id}>
							<Text style={styles.title}>{item.category}</Text>
							<Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
								{item.reason}
							</Text>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									marginTop: 5,
								}}
							>
								<View
									style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
								>
									<Feather name="clock" size={18} color="black" />
									<Text>{moment(item.createdAt).format('ll')}</Text>
								</View>
								<StatusBtn status={item?.status} />
							</View>
							<Pressable
								style={styles.submitButton}
								onPress={() => handelPress(item?._id)}
							>
								<Text>Reply now</Text>
							</Pressable>
						</View>
					);
				}}
				ListEmptyComponent={() => (
					<Text style={{ padding: 10, textAlign: 'center' }}>No Issues</Text>
				)}
			/>

			{isLoading && <LoaderModal loading={isLoading} />}
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
		fontSize: 18,
		fontWeight: '600',
		marginVertical: 10,
		textTransform: 'capitalize',
	},
	text: {
		fontSize: 14,
		textTransform: 'capitalize',
	},

	itemContainer: {
		gap: 2,
		padding: 10,
		marginTop: 10,
		borderRadius: 10,
		borderColor: '#ddd',
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
