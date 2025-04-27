import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	ScrollView,
	Platform,
} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/constants/color';
import moment from 'moment';
import { getFontFamily } from '@/utils';
import generateReceiptHtml from './generateReceiptHtml';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const receipt = () => {
	const { id, name, amount, status, date } = useLocalSearchParams();
	const handlePrint = async () => {
		const html = generateReceiptHtml({ id, amount, status, name, date });
		const { uri } = await Print.printToFileAsync({ html });
		console.log('Printed receipt saved at:', uri);

		// Show the print preview dialog (if supported)
		await Print.printAsync({ uri });
	};

	const handleShare = async () => {
		const { id, name, amount, status, date } = useLocalSearchParams();
		const html = generateReceiptHtml(id, amount, status, name, date);
		const { uri } = await Print.printToFileAsync({ html });
		if (await Sharing.isAvailableAsync()) { 
			await Sharing.shareAsync(uri);
		} else {
			console.log('Sharing is not available on this device.');
		}
	};

	return (
		<SafeAreaView style={{ padding: 20, backgroundColor: colors.gray2 }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 20,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.title}>Receipt</Text>
				<AntDesign
					name="search1"
					size={24}
					color="black"
					style={{ opacity: 0 }}
				/>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 80, position: 'relative' }}
			>
				<View
					style={{
						backgroundColor: colors.white,
						marginVertical: 10,
						padding: 20,
						borderRadius: 10,
					}}
				>
					<View>
						<View
							style={{
								paddingHorizontal: 20,
								paddingVertical: 10,
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<Image
								source={require('@/assets/images/success.png')}
								style={{ width: 60, height: 60, alignSelf: 'center' }}
							/>
							<Text
								style={{
									fontFamily: getFontFamily('Urbanist', 500),
									fontSize: 20,
									textAlign: 'center',
									marginTop: 10,
								}}
							>
								{status !== 'paid' ? 'Payment Invoice' : 'Payment Successful'}
							</Text>
						</View>
						<View style={styles.textWrap}>
							<Text style={styles.textTitle}>Order ID: </Text>
							<Text style={styles.textContent}>{id}</Text>
						</View>
						<View style={styles.textWrap}>
							<Text style={styles.textTitle}>Date:</Text>
							<Text style={styles.textContent}>
								{moment(date).format('D MMM YY')}
							</Text>
						</View>
						<View style={styles.textWrap}>
							<Text style={styles.textTitle}>Time:</Text>
							<Text style={styles.textContent}>
								{moment(date).format('hh:mma')}
							</Text>
						</View>
						{status === 'paid' && (
							<View style={styles.textWrap}>
								<Text style={styles.textTitle}>Payment Method:</Text>
								<Text style={styles.textContent}>Credit Card</Text>
							</View>
						)}
						<View
							style={{
								...styles.textWrap,
								borderTopColor: '#e5e5e5',
								borderTopWidth: 1,
								marginTop: 12,
							}}
						>
							<Text style={styles.textTitle}>Amount:</Text>
							<Text style={{ fontWeight: 'bold' }}>₦{amount}.00</Text>{' '}
						</View>
					</View>
					<View style={styles.divider}>
						<View style={styles.line}></View>
					</View>
					<View
						style={{
							padding: 10,
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 10,
						}}
					>
						<Image
							source={require('@/assets/images/receipt.png')}
							style={{ width: 169, height: 169 }}
						/>
					</View>
				</View>
				<TouchableOpacity onPress={handlePrint} style={styles.button}>
					<Text style={styles.buttonText}>Download Receipt</Text>
				</TouchableOpacity>
				<View style={[styles.ticketCircle, { left: -25 }]}></View>
				<View style={[styles.ticketCircle, { right: -25 }]}></View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default receipt;

const styles = StyleSheet.create({
	title: {
		fontFamily: getFontFamily('Urbanist', 500),
		fontSize: 24,
		textAlign: 'center',
	},
	textTitle: {
		fontFamily: getFontFamily('DMSans', 600),
		color: colors.dark,
		opacity: 0.62,
	},
	textContent: {
		fontFamily: getFontFamily('DMSans', 600),
		color: colors.dark,
	},
	textWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		fontFamily: getFontFamily('Urbanist', 500),
	},
	divider: {
		width: '100%',
		marginTop: 54,
	},
	line: {
		width: '100%',
		height: 1,
		borderColor: '#e5e5e5',
		borderTopWidth: 1,
		...(Platform.OS === 'ios' ? {} : { borderStyle: 'dashed' }),
	},
	button: {
		marginTop: 20,
		borderRadius: 8,
		backgroundColor: colors.primary,
	},

	buttonText: {
		color: colors.white,
		fontSize: 16,
		fontWeight: '600',
		padding: 15,
		textAlign: 'center',
		lineHeight: 26,
	},
	ticketCircle: {
		position: 'absolute',
		top: 375,
		width: 50,
		height: 50,
		backgroundColor: colors.gray2,
		borderRadius: 50,
	},
});
