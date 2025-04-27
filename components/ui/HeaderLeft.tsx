import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const HeaderLeft = ({title, onPress}) => {
  return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<AntDesign
				name="left"
				size={24}
				color="black"
				style={{ opacity: 0 }}
			/>
			<Text style={styles.title}>Notifications</Text>
			<TouchableOpacity onPress={handlePress}>
				<AntDesign name="setting" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
}

export default HeaderLeft

const styles = StyleSheet.create({})