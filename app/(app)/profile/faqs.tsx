import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { getFontFamily } from '@/utils';
import colors from '@/constants/color';

const FAQPage = () => {
	const [expandedIds, setExpandedIds] = useState<string[]>([]);

	// FAQ data
	const faqData = [
		{
			id: '1',
			question: 'Is this app nationwide?',
			answer:
				'React Native is a framework for building mobile apps using JavaScript and React.',
		},
		{
			id: '2',
			question: 'What is Expo?',
			answer:
				'Expo is a toolchain built around React Native to help you quickly start and build apps.',
		},
		{
			id: '3',
			question: 'How do I install Expo?',
			answer: 'You can install Expo CLI using npm: `npm install -g expo-cli`.',
		},
	];

	// Handle accordion expansion
	const handlePress = (id:string) => {
		if (expandedIds.includes(id)) {
			setExpandedIds(expandedIds.filter((item) => item !== id)); // Collapse
		} else {
			setExpandedIds([id]); // Expand
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					gap:25,
					alignItems: 'center',
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>FAQs</Text>
			</View>
			<ScrollView style={{ flex: 1, marginTop: 48 }}>
				{faqData.map((item) =>{ 
					const expanded=expandedIds.includes(item.id)
					return(
					<List.Accordion
						key={item.id}
						titleStyle={{ fontFamily:getFontFamily("DMSans",600), fontSize: 16,color:colors.dark,padding:0 }}
						style={[styles.accordion,expanded? styles.accordionOpen : {marginBottom:8}]}
						title={item.question}
						descriptionStyle={{ fontFamily:getFontFamily("Urbanist",500), fontSize: 14 }}
						expanded={expanded}
						onPress={() => handlePress(item.id)}
					>
						<List.Item
							title={item.answer}
							titleNumberOfLines={10} // Allow multiple lines for the answer
							style={styles.answer}
						/>
					</List.Accordion>
				)})}
			</ScrollView>
		</SafeAreaView>
	);
};

export default FAQPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#f5f5f5',
	},
	answer: {
		paddingLeft: 16,
		backgroundColor:colors.white,
		marginBottom: 8,
		borderWidth: 1,
		borderTopColor:'transparent',
		borderRadius:8,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		borderColor:'#B0B0B0',
		marginTop:-6,
	},
	title: {
		fontFamily:getFontFamily("Urbanist",500),
		fontSize: 24,
		textAlign: 'center',
	},
	accordionOpen:{
		borderWidth: 1,
		borderBottomColor:'transparent',
		borderRadius:8,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderColor:'#B0B0B0',
	},
	accordion:{
		backgroundColor:colors.white,
		padding:0,
		borderWidth: 1,
		borderRadius:8,
		borderColor:'#B0B0B0',
	},
});
