import React, { useCallback, useRef, useMemo, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const App = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// hooks
	const sheetRef = useRef<BottomSheet>(null);

	// variables
	const data = useMemo(
		() =>
			Array(50)
				.fill(0)
				.map((_, index) => `index-${index}`),
		[]
	);
	const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
	// callbacks
	const handlePress = useCallback((index: number) => {
		console.log('index data', index);
		sheetRef.current?.snapToIndex(index);
		setIsOpen(true);
	}, []);
	// callbacks
	const handleSheetChange = useCallback((index) => {
		console.log('handleSheetChange', index);
	}, []);
	const handleSnapPress = useCallback((index) => {
		sheetRef.current?.snapToIndex(index);
	}, []);
	const handleClosePress = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	// render
	const renderItem = useCallback(
		({ item }) => (
			<View style={styles.itemContainer}>
				<Text>{item}</Text>
			</View>
		),
		[]
	);
	return (
		<GestureHandlerRootView style={styles.container}>
			<Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
			<Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
			<Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
			<Button title="Close" onPress={() => handleClosePress()} />
			<BottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				enableDynamicSizing={true}
				onChange={handleSheetChange}
				onClose={() => setIsOpen(false)}
				enablePanDownToClose={true}
				index={-1}
			>
				<BottomSheetFlatList
					data={data}
					keyExtractor={(i) => i}
					renderItem={renderItem}
					contentContainerStyle={styles.contentContainer}
				/>
			</BottomSheet>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 200,
	},
	contentContainer: {
		backgroundColor: 'white',
	},
	itemContainer: {
		padding: 6,
		margin: 6,
		backgroundColor: '#eee',
	},
});

export default App;
