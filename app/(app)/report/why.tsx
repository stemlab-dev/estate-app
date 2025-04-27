import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Pressable,
	StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import colors from '@/constants/color';

const issues = [
	{
		id: '0',
		title: 'Personal Complaints',
	},
	{
		id: '1',
		title: 'Official Complaints',
	},
];

const Index = () => {
	const [category, setCategory] = useState<string | null>(null);

	const handleReport = () => {
		if (!category) {
			return;
		}
		router.push({
			pathname: '/report/send-report',
			params: { category },
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => router.back()}>
					<Text style={styles.cancelButton}>Cancel</Text>
				</Pressable>
				<Text style={styles.title}>Why are you reporting this issue?</Text>
				{issues.map((issue) => (
					<Pressable
						key={issue.id}
						style={styles.optionContainer}
						onPress={() => setCategory(issue.title)}
					>
						{/* Radio Button */}
						<Text style={styles.optionText}>{issue.title}</Text>
						<View style={styles.radioButton}>
							{category === issue.title && (
								<View style={styles.radioSelected} />
							)}
						</View>
					</Pressable>
				))}
			</View>
			<View style={{ width: '100%' }}>
				<Pressable
					style={{ ...styles.submitButton, backgroundColor:  category ? '#333' : colors.disable}}
					onPress={handleReport}
				>
					<Text style={styles.submitText}>Next</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

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
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 26,
	},
	optionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	radioButton: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#555',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	radioSelected: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: '#555',
	},
	optionText: {
		fontSize: 16,
		color: '#333',
	},
	submitButton: {
		backgroundColor: '#333',
		padding: 15,
		borderRadius: 8,
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 20,
		alignSelf: 'center',
		width: '100%',
	},
	submitText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
});

export default Index;
