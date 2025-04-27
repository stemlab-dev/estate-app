import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import colors from '@/constants/color';
import { spacing, borderRadius, typography, shadows } from '@/constants/designSystem';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
  containerStyle?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Account Info',
  showBackButton = true,
  rightComponent,
  onBackPress,
  containerStyle,
}) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.header, containerStyle]}>
      {showBackButton ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <AntDesign name="arrowleft" size={24} color={colors.black} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <Text style={styles.headerTitle}>{title}</Text>
      
      {rightComponent ? (
        rightComponent
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.black,
    fontFamily: typography.fontFamily.bold,
  },
  backButton: {
    padding: spacing.md,
    borderRadius: borderRadius.round,
    backgroundColor: colors.grey[100],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: shadows.light.shadowColor,
    shadowOffset: shadows.light.shadowOffset,
    shadowOpacity: shadows.light.shadowOpacity,
    shadowRadius: shadows.light.shadowRadius,
    elevation: shadows.light.elevation,
  },
  placeholder: {
    width: 54, // Same width as backButton to ensure title stays centered
    height: 54,
  },
});
