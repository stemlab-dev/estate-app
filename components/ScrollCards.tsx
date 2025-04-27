import colors from '@/constants/color';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	StyleSheet,
	NativeScrollEvent,
	Image,
	NativeSyntheticEvent,
	LayoutChangeEvent,
	Pressable,
} from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width

const images = [
	{
		image: require('../assets/images/slide001.png'),
		link: '/payments',
	},
	{
		image: require('../assets/images/slide002.png'),
		link: '/profile/faqs',
	},
	{
		image: require('../assets/images/slide003.png'),
		link: '/report',
	},
];
export const ScrollCards = () => {
	const scrollViewRef = useRef<ScrollView | null>(null);
	const [scrollViewWidth, setScrollViewWidth] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);

	// Get ScrollView width dynamically
	const handleLayout = (event: LayoutChangeEvent) => {
		setScrollViewWidth(event.nativeEvent.layout.width);
	};

	// Track active slide index
	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const newIndex = Math.round(
			event.nativeEvent.contentOffset.x / scrollViewWidth
		);
		setActiveIndex(newIndex);
	};

	// Auto-scroll at intervals
	useEffect(() => {
		const interval = setInterval(() => {
			if (scrollViewRef.current) {
				let nextIndex = (activeIndex + 1) % images.length;
				scrollViewRef.current.scrollTo({
					x: nextIndex * scrollViewWidth,
					animated: true,
				});
				setActiveIndex(nextIndex);
			}
		}, 4000); // Scroll every 4 seconds

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, [activeIndex, scrollViewWidth]);
	const imageHeight = (scrollViewWidth / 344) * 108;
	return (
		<View>
			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onLayout={handleLayout} // Capture width when layout changes
				onScroll={handleScroll}
				scrollEventThrottle={16}
				style={{ width: '100%', height: imageHeight }}
			>
				{images.map((slide, index) => {
					return (
						<Pressable onPress={() => router.navigate(slide.link)} key={index}>
							<Image
								source={slide.image}
								style={[
									styles.slide,
									{
										resizeMode: 'contain',
										width: scrollViewWidth,
										height: imageHeight,
									},
								]}
							/>
						</Pressable>
					);
				})}
			</ScrollView>
			<View style={styles.pagination}>
				{images.map((_, index) => (
					<View
						key={index}
						style={[styles.dot, index === activeIndex && styles.activeDot]}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	slide: {
		width, // Takes full screen width
		// height: 200,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 24,
		color: 'white',
	},
	pagination: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 2,
		alignItems: 'center',
	},
	dot: {
		width: 14,
		height: 4,
		borderRadius: 10,
		backgroundColor: colors.primary100,
	},
	activeDot: {
		backgroundColor: colors.primary,
	},
});

export default ScrollCards;
