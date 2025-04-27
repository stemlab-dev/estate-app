import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	StatusBar,
	TouchableOpacity,
	RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
// import { payments } from '@/constants/data';
import colors from '@/constants/color';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import LoaderModal from '@/components/LoaderModal';
import { fetchPayments } from '@/api';
import PendingPayments from '@/components/payment/PendingPayments';
import SearchBar from '@/components/ui/SearchBar';

const App = () => {
	const [payments, setPayments] = useState<any>([]);
	const [filteredPayments, setFilteredPayments] = useState<any>([]); // Filtered users to display
	const [query, setQuery] = useState<string>(''); // Search query
	const [filterBy, setFilterBy] = useState<string>('All'); // Active filter
	const { token } = useAuth();
	const { data, isLoading } = useQuery({
		queryKey: ['pendingpayments'],
		queryFn: async () => fetchPendingayments(token),
	});
	useEffect(() => {
		if (data) {
			setPayments(data);
		}
	}, [data]);
	const filterData = (searchText: string, category: string) => {
		let filtered = payments;

		// Apply search filter
		if (searchText) {
			filtered = filtered?.filter((user: any) =>
				user.name.toLowerCase().includes(searchText.toLowerCase())
			);
		}

		// Apply category filter
		if (category !== 'All') {
			filtered = filtered.filter(
				(user: any) => user.status.toLowerCase() === category.toLowerCase()
			);
		}

		setPayments(filtered);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: 10,
					marginTop: 10,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Pending payments</Text>
				<AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/>
			</View>
			<View
				style={{
					padding: 10,
				}}
			>
				<SearchBar
					setFilteredDatas={setFilteredPayments}
					filterData={filterData}
					filteredDatas={filteredPayments}
					setQuery={setQuery}
					query={query}
					filterBy={filterBy}
					placeholder="Search payments..."
				/>
			</View>
			<View style={{ flex: 1 }}>
				<PendingPayments payments={payments} />
			</View>

			{isLoading && <LoaderModal loading={isLoading} text="loading..." />}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		// padding: 5,
		backgroundColor: '#f5f5f5',
	},
	title: {
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},

	sectionMenu: {
		// width: '100%',
		gap: 10,
		backgroundColor: '#F8F9fC',
		padding: 20,
		paddingVertical: 10,
		marginVertical: 4,
	},
	textWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
	},
	textFlex: {},
	textTitle: {
		fontSize: 16,
		color: colors.text,
	},
	dot: {
		backgroundColor: colors.primary,
		width: 8,
		height: 8,
		borderRadius: 4,
		marginRight: 5,
		marginLeft: 5,
		borderWidth: 1,
		borderColor: 'white',
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	btnContainer: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: 10,
		borderTopColor: '#333',
		borderTopWidth: 0.4,
		paddingVertical: 10,
	},
	btn: {
		padding: 10,
		borderRadius: 8,
		minWidth: 140,
	},
	btnText: {
		fontSize: 14,
		fontWeight: '600',
		color: 'white',
		textAlign: 'center',
	},
});

export default App;
