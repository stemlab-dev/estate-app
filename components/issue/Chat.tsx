import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '@/constants/color';

const Chat = ({ reply, isUserChat }) => {
	console.log(reply);
  return (
		<View style={{alignSelf: isUserChat ? 'flex-end' : 'flex-start'}}>
			<Text key={reply._id} style={isUserChat ? styles.message : styles.reply}>
				{isUserChat ? 'USER: ' : 'ADMIN: '}
				{reply.message}
			</Text>
		</View>
	);
}

export default Chat

const styles = StyleSheet.create({
	message: {
		backgroundColor: '#d1e7dd',
		padding: 10,
		borderRadius: 8,
		marginBottom: 8,
		alignSelf: 'flex-end',
		color: '#155724',
	},
	reply: {
		backgroundColor: colors.greyBackground,
		padding: 10,
		borderRadius: 8,
		marginBottom: 8,
		alignSelf: 'flex-start',
		color: colors.greyText,
	},
});