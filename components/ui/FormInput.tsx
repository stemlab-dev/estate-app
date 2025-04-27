import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '@/constants/color';
import { spacing, borderRadius, typography, componentStyles } from '@/constants/designSystem';

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  showPasswordToggle = false,
  containerStyle,
  labelStyle,
  inputStyle,
  leftIcon,
  secureTextEntry,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry && showPasswordToggle;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={[
        styles.inputContainer,
        error ? styles.inputError : null,
        inputStyle
      ]}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            isPassword ? styles.inputWithRightIcon : null
          ]}
          secureTextEntry={isPassword ? !showPassword : secureTextEntry}
          placeholderTextColor={colors.text}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesome
              name={showPassword ? 'eye-slash' : 'eye'}
              size={16}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.grey[500],
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.regular,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md,
    backgroundColor: colors.input,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.textDark,
    fontFamily: typography.fontFamily.regular,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: spacing.xl,
  },
  leftIconContainer: {
    paddingLeft: spacing.md,
  },
  eyeIcon: {
    padding: spacing.md,
    position: 'absolute',
    right: 0,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
    fontFamily: typography.fontFamily.regular,
  },
});

export default FormInput;
