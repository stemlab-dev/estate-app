import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Entypo from '@expo/vector-icons/Entypo';

const BirthdatePicker = ({
	date,
	setDate,
}: {
	date: Date;
	setDate: (date: Date) => void;
}) => {
	const [showPicker, setShowPicker] = useState(false); // Controls the visibility of the date picker

	// Handle date change
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date; // Fallback to the current date if no date is selected
		setShowPicker(Platform.OS === 'ios'); // Hide the picker on Android after selection
		setDate(currentDate);
	};

	// Show the date picker
	const showDatePicker = () => {
		setShowPicker(true);
	};
	return (
		<View style={styles.container}>
			{/* Display the selected date */}
			<TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
				<Text style={styles.dateText}>
					{date.toDateString()} {/* Format the date as a string */}
				</Text>
			</TouchableOpacity>
			<Entypo style={styles.icon} size={16} color="black" />

			{/* Date Picker */}
			{showPicker && (
				<DateTimePicker
					value={date} // Current selected date
					mode="date" // Show only the date picker
					display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Use spinner for iOS
					onChange={onChange} // Handle date change
					maximumDate={new Date()} // Prevent selecting a future date
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		borderRadius: 10,
		borderWidth: 1,
	},
	dateButton: {
		flex: 1,
		// position: 'relative',
		flexDirection: 'column',
		padding: 15,
		borderRadius: 10,
	},
	dateText: {
		color: 'black',
		fontSize: 14,
		top: -10,
		left: -10,
		position: 'absolute',
	},
	icon: {
		position: 'absolute',
		right: -10,
		top: -40,
		zIndex: 10,
	},
});

export default BirthdatePicker;
