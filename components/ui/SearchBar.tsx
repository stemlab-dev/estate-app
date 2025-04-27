import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/color';
import { FilterIcon, SearchIcon } from '@/assets/svg';
import { getFontFamily } from '@/utils';

const SearchBar = ({
	setFilteredDatas,
	filteredDatas,
	filterData,
	query,
	setQuery,
	filterBy,
	placeholder,
}: {
	setFilteredDatas: (item: any[]) => void;
	filteredDatas: any[];
	filterData: (searchText: string, category: string) => void;
	query: string;
	setQuery: (text: string) => void;
	filterBy: string;
	placeholder: string;
}) => {
	const [sortBy, setSortBy] = useState<string>(''); // For sorting options
	const [isSortBy, setIsSortBy] = useState<boolean>(false); // For sorting options

	// Handle search input change
	const handleSearchChange = (text: string) => {
		setQuery(text);
		filterData(text, filterBy);
	};
	// Sorting Logic
	const handleSort = (option: string) => {
		let sortedUsers = [...filteredDatas];
		switch (option) {
			case 'A-Z':
				sortedUsers.sort((a, b) => a?.name.localeCompare(b?.name));
				break;
			case 'Z-A':
				sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case 'Last Activity':
				sortedUsers.sort(
					(a, b) =>
						new Date(b.lastActivity).getTime() -
						new Date(a.lastActivity).getTime()
				);
				break;
			case 'Date of Joining':
				sortedUsers.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				break;
			default:
				break;
		}
		setFilteredDatas(sortedUsers);
		setSortBy(option);
	};
	return (
		<>
			<View style={styles.searchSectionWrapper}>
				<View style={styles.searchBar}>
					<SearchIcon
						color={colors.black}
						style={{ marginLeft: 8 }}
					/>
					<TextInput
						style={styles.searchInput}
						placeholder={placeholder || "Search users.."}
						value={query}
						onChangeText={handleSearchChange}
					/>
				</View>
				<TouchableOpacity
					onPress={() => setIsSortBy(!isSortBy)}
					style={styles.optionBtn}
				>
					<FilterIcon color={colors.black} />
				</TouchableOpacity>
			</View>
			{isSortBy && (
				<View style={styles.sortOptions}>
					{['A-Z', 'Z-A', 'Last Activity', 'Date of Joining'].map((option) => (
						<TouchableOpacity
							key={option}
							style={{
								...styles.sortButton,
								backgroundColor: sortBy === option ?  colors.primary : colors.grey,
							}}
							onPress={() => handleSort(option)}
						>
							<Text style={styles.sortText}>{option}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	searchSectionWrapper: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center',
		gap: 12,
	},
	searchBar: {
		flexDirection: 'row',
		backgroundColor: "transparent",
		height:"100%",
		alignItems: 'center',
		flex: 1,

		borderColor: '#BDC0CE',
		borderWidth: 1,
		borderRadius: 8,
		overflow: 'hidden',
	},
	searchInput: {
		paddingHorizontal: 10,
		paddingVertical:9,
		height:44
	},
	optionBtn: {
		padding: 8,
		borderColor: '#ccc',
		height:"100%",
		width: 44,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 8,
	},
	sortOptions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
	},
	sortButton: { padding: 10, borderRadius: 5 },
	sortText: { fontSize: 14, color:colors.dark,fontFamily:getFontFamily() },
});
