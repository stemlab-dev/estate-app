import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import colors from '@/constants/color';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

const OnboardingScreen = () => {
	const flatListRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);
	// const isFirstTime = SecureStore.getItem('isFirstTime');
	// useEffect(() => {
	// 	if (isFirstTime) {
	// 		router.push('/(auth)/login');
	// 	}
	// }, [isFirstTime]);

	const data = [
		{
			id: 1,
			title: 'Simplify Your Homeowner Experience',
			description:
				'Pay dues, track invoices, report issues, and stay connected with your HOA—all in one app.',
			image: require('@/assets/images/eclipse.png'), // replace with your image path
			// image: require('@/assets/images/p4.jpg'), // replace with your image path
		},

		{
			id: 2,
			title: 'Effortless Payments & Dues Tracking',
			description:
				'Pay your HOA dues instantly, track invoices, and set reminders—never miss a payment.',
			image: require('@/assets/images/bills.png'), // replace with your image path
		},

		{
			id: 3,
			title: 'Stay Informed & Report Issues',
			description:
				'Receive community updates, report maintenance issues, and get quick responses from your HOA.',
			image: require('@/assets/images/phone.png'), // replace with your image path
		},
	];
	const handelSkipPress = async () => {
		await SecureStore.setItemAsync('isFirstTime', 'isFirstTime');
		router.replace({
			pathname: '/(auth)/login',
		});
	};

	const handelPress = async () => {
		if (activeIndex !== data.length - 1) {
			flatListRef?.current.scrollToIndex({ index: activeIndex + 1 });
			return;
		}
		// await SecureStore.setItemAsync('isFirstTime', 'isFirstTime');
		router.replace({
			pathname: '/(auth)/login',
		});
	};

	const renderItem = ({ item }) => (
		<View style={styles.slide}>
			{/* {item.id === 1 ? (
				<Animated.View
					entering={FadeInUp.duration(500).springify()}
					style={styles.imageContainer}
				>
					<Image source={item.image} style={styles.halfImage} />
					<Image source={item.image1} style={styles.halfImage} />
				</Animated.View>
			) : (
			)} */}
			<Image source={item.image} style={styles.image} />
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.description}>{item.description}</Text>
		</View>
	);

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveIndex(viewableItems[0].index);
		}
	}).current;

	const viewabilityConfig = {
		itemVisiblePercentThreshold: 50,
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handelSkipPress} style={styles.skipButton}>
				<Text style={styles.skipText}>Skip</Text>
			</TouchableOpacity>
			<FlatList
				data={data}
				renderItem={renderItem}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				ref={flatListRef}
				// style={{
				// 	width: '95%',
				// 	alignContent: 'center',
				// 	alignSelf: 'center',
				// 	gap: 10,
				// }}
			/>

			<View style={styles.dotContainer}>
				{data.map((_, index) => (
					<View
						key={index}
						style={[styles.dot, { opacity: activeIndex === index ? 1 : 0.3 }]}
					/>
				))}
			</View>

			<TouchableOpacity style={styles.button} onPress={handelPress}>
				<Text style={styles.buttonText}>
					{activeIndex !== data.length - 1 ? 'Next' : 'Get Started'}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	skipButton: {
		position: 'absolute',
		top: 50,
		right: 20,
		zIndex: 1,
	},
	skipText: {
		color: '#0066FF',
		fontSize: 16,
	},
	slide: {
		width: screenWidth,
		alignItems: 'center',
		padding: 20,
		marginTop: 80,
	},
	imageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	halfImage: {
		width: 140,
		height: 380,
		marginHorizontal: 5,
		// resizeMode: 'contain',
		borderRadius: 10,
		marginBottom: 20,
	},
	image: {
		// width: screenWidth * 1,
		// height: screenWidth * 1,
		borderRadius: 20,
		// marginBottom: 20,
		width: 380,
		height: 380,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
		// color: colors.primary,
		textAlign: 'center',
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
		color: '#707070',
		textAlign: 'center',
		paddingHorizontal: 20,
		marginBottom: 30,
	},
	dotContainer: {
		flexDirection: 'row',
		marginBottom: 30,
	},
	dot: {
		width: 20,
		height: 5,
		borderRadius: 5,
		backgroundColor: colors.primary,
		marginHorizontal: 5,
	},
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 20,
		marginBottom: 20,
		width: '95%',
		alignSelf: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center',
	},
});
