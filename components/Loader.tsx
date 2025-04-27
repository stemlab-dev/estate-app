import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Loader = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
			}}
		>
			<ActivityIndicator size="large" color="blue" />
		</View>
	);
};

export default Loader;
