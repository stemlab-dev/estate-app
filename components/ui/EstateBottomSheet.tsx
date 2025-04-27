import {
	TouchableOpacity,
	StyleSheet,
	Text,
	TextInput,
	View,
	ActivityIndicator,
	Image,
} from 'react-native';
import React, { useCallback, useState, useMemo } from 'react';
import { BottomSheetView, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '@/constants/color';
import { Role, useAuth } from '@/context/authContext';
import { router } from 'expo-router';
import { getFontFamily } from '@/utils';

interface User {
	_id: string;
	name: string;
}

interface EstateBottomSheetProps {
	data: User[];
}

const EstateBottomSheet: React.FC<EstateBottomSheetProps> = ({ data }) => {
	const { profile, role } = useAuth();
	const [query, setQuery] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);

	const newData = useMemo(() => data, [data]);

	const filteredData = useMemo(() => {
		if (!query) return newData;
		return newData.filter((user: any) =>
			user?.name?.toLowerCase()?.includes(query.toLowerCase())
		);
	}, [newData, query]);
	const handelPress = (item: any) => {
		router.push({
			pathname: '/estate',
			params: { ...item, logo: item.logo.url, members: item?.members?.length },
		});
	};

	const renderItem = useCallback(({ item }: any) => {
		console.log('item', item);
		return (
			<TouchableOpacity
				key={item._id}
				style={styles.buttonContainer}
				onPress={() => handelPress(item)}
			>
				<Image
					source={{
						uri:
							item?.logo?.url ||
							`https://ui-avatars.com/api/?name=${item?.name}&&length=1&&background=random`,
					}}
					style={{ width: 80, height: 80, borderRadius: 10 }}
				/>
				<Text style={{ fontSize: 16, textAlign: 'center', fontFamily: getFontFamily('Urbanist',500), marginTop: 5 }}>
					{item.name}
				</Text>
			</TouchableOpacity>
		);
	}, []);

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
		);
	}

	if (filteredData?.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>No estates found.</Text>
			</View>
		);
	}

	return (
		<BottomSheetView style={styles.contentContainer}>
			<Text style={{ ...styles.title, paddingBottom: 38, textAlign: 'center' }}>
				Select your Estate
			</Text>
			<View style={styles.searchBar}>
				<Ionicons
					name="search"
					size={16}
					color={colors.black}
					style={styles.icon}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder="Search estate.."
					value={query}
					onChangeText={setQuery}
				/>
			</View>
			<Text style={{ ...styles.title, paddingTop: 5, paddingBottom: 5 }}>
				Recommended Estates
			</Text>
			<BottomSheetFlatList
				data={filteredData}
				keyExtractor={(i) => i._id.toString()}
				numColumns={2} // Set to two columns
				columnWrapperStyle={{ justifyContent: 'space-between', gap: 2 }}
				renderItem={renderItem}
				contentContainerStyle={styles.itemsContainer}
			/>
		</BottomSheetView>
	);
};

export default EstateBottomSheet;

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		padding: 10,
		paddingHorizontal: 14,
		borderRadius: 30,
		backgroundColor: colors.white,
	},
	searchBar: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 20,
	},
	searchInput: {
		// paddingHorizontal: 20,
		height:44,
		flex: 1,
		paddingLeft: 32,
		fontSize: 16,
	},
	icon: {
		marginLeft: 10,
		position: 'absolute',
	},
	itemsContainer: {
		backgroundColor: 'white',
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		margin: 5,
		padding: 10,
		backgroundColor: '#f8f9fa',
		justifyContent: 'space-between',
		marginVertical: 5,
		// padding: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 10,
		// backgroundColor: '#ccc',
	},
	title: {
		fontFamily:getFontFamily("Urbanist"),
		fontSize: 16,
		color: colors.black,
	},
	cardContainer: {
		padding: 5,
	},
	name: {
		fontWeight: 'bold',
		fontSize: 16,
		color: colors.black,
	},
	text: {
		fontSize: 14,
		color: colors.gray,
	},
	moreButton: {
		padding: 8,
	},
	button: {
		backgroundColor: colors.primary,
		padding: 10,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 16,
		color: colors.gray,
	},
});
