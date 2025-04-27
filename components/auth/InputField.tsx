import { Text, View, TextInput, StyleSheet } from 'react-native';

const InputField = ({
	label,
	value,
	onChange,
	placeholder,
	error,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	error: string | null;
}) => (
	<View>
		<Text style={styles.label}>{label}</Text>
		<TextInput
			style={styles.input}
			placeholder={placeholder}
			value={value}
			onChangeText={onChange}
		/>
		{error && <Text style={styles.errorText}>{error}</Text>}
	</View>
);

const styles = StyleSheet.create({
	label: {
		fontSize: 18,
		marginBottom: 10,
		fontWeight: 'bold',
	},
	input: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 12,
		marginBottom: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
	},
	errorText: {
		color: 'red',
		fontSize: 10,
		marginTop: 2,
	},
});
export default InputField;
