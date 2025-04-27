import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Overlay = () => {
	return <View style={styles.shadow}></View>;
};

export default Overlay;

const styles = StyleSheet.create({
	shadow: {
		backgroundColor: 'black',
		// backgroundColor: 'rgba(73, 72, 72, 0.5)',
		flex: 1,
		position: 'absolute',
		zIndex: 10,
		top: 0,
		left: 0,
		width: '100%',
		borderColor: 'red',
		borderWidth: 1,
	},
	text: {
		color: 'blue',
	},
});
