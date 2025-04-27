import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getStatusColor } from '@/utils/getStatusColor';

const StatusBtn = ({ status }: {status: string}) => {
	const statusColor = getStatusColor(status);
	return (
		<Text
			style={{
				paddingVertical: 5,
				paddingHorizontal: 10,
				borderRadius: 10,
				color: statusColor.textColor,
				backgroundColor: statusColor.bgColor,
				textTransform: 'capitalize',
				fontSize: 12,
			}}
		>
			{status}
		</Text>
	);
};

export default StatusBtn;
