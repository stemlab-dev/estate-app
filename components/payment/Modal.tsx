import React, { useState } from 'react';
import { Button, Overlay, Icon } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

type OverlayComponentProps = {};

const OverlayComponent = ({
    show,
	setShow,
	text,
	handelConfirm,
}: {
	show: boolean;
    setShow: (show: boolean) => void
    text: string;
    handelConfirm: () => void
}) => {
	// const [visible, setVisible] = useState(false);

	const toggleOverlay = () => {
		setShow(!show);
	};

	return (
		<Overlay isVisible={show} onBackdropPress={toggleOverlay}>
			<Text style={styles.textPrimary}>Hello!</Text>
			<Text style={styles.textSecondary}>Welcome to React Native Elements</Text>
			<Button
				icon={
					<Icon
						name="wrench"
						type="font-awesome"
						color="white"
						size={25}
						iconStyle={{ marginRight: 10 }}
					/>
				}
				title="Start Building"
				onPress={toggleOverlay}
			/>
		</Overlay>
	);
};

const styles = StyleSheet.create({
	button: {
		margin: 10,
	},
	textPrimary: {
		marginVertical: 20,
		textAlign: 'center',
		fontSize: 20,
	},
	textSecondary: {
		marginBottom: 10,
		textAlign: 'center',
		fontSize: 17,
	},
});

export default OverlayComponent;
