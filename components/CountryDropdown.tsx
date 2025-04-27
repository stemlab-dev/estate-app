import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/color';
import { spacing, borderRadius, typography } from '@/constants/designSystem';

interface DropdownItem {
  label: string;
  value: string;
  key?: string;
  [key: string]: any;
}

interface CountryDropdownProps {
  data: DropdownItem[];
  onSelect: (value: string) => void;
  label?: string;
  placeholder: string;
  error?: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  data,
  onSelect,
  label,
  placeholder,
  error,
  containerStyle,
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.container,
        error ? styles.containerError : null,
        disabled ? styles.containerDisabled : null
      ]}>
        <RNPickerSelect
          onValueChange={(value) => {
            setSelectedValue(value);
            onSelect(value);
          }}
          items={data}
          value={selectedValue}
          style={pickerSelectStyles}
          placeholder={{ label: placeholder, value: null }}
          useNativeAndroidPickerStyle={false}
          disabled={disabled}
          Icon={() => (
            <Ionicons 
              name="chevron-down" 
              size={20} 
              color={colors.grey[500]} 
              style={styles.icon} 
            />
          )}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
    width: '100%',
  },
  container: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.input,
    height: 50,
    justifyContent: 'center',
  },
  containerError: {
    borderColor: colors.error,
  },
  containerDisabled: {
    backgroundColor: colors.disable,
    borderColor: colors.grey[300],
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.grey[500],
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.regular,
  },
  icon: {
    marginRight: spacing.md,
    marginTop: spacing.sm,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: typography.fontSize.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    color: colors.textDark,
    fontFamily: typography.fontFamily.regular,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: typography.fontSize.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    color: colors.textDark,
    fontFamily: typography.fontFamily.regular,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: colors.text,
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

export default CountryDropdown;
