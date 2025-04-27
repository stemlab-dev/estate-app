import SelectDropDown from '@/components/ui/Select';
import { StyleSheet, Text, View } from 'react-native';
const SelectField = ({
	label,
	data,
	value,
	setValue,
	error,
}: {
	data: any;
	value: string;
	label: string;
	setValue: (value: string) => void;
	error: string | null;
}) => (
	<View>
		<Text style={styles.label}>{label}</Text>
		<SelectDropDown
			placeholder="Select item.."
			data={data}
			setValue={setValue}
			value={value}
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
		paddingVertical: 8,
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
export default SelectField;
