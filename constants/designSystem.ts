import { Dimensions } from 'react-native';
import colors from './color';

const { width, height } = Dimensions.get('window');

// Spacing system
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

// Border radius system
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 9999
};

// Shadow system
export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6
  }
};

// Typography system
export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700'
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8
  },
  fontFamily: {
    regular: 'Urbanist-Regular',
    bold: 'Urbanist-Bold',
    italic: 'Urbanist-Italic'
  }
};

// Responsive utilities
export const responsive = {
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 768,
  isLargeDevice: width >= 768,
  widthPercentage: (percentage: number) => width * (percentage / 100),
  heightPercentage: (percentage: number) => height * (percentage / 100),
  moderateScale: (size: number, factor: number = 0.5) => {
    return size + (responsive.widthPercentage(size) - size) * factor;
  }
};

// Common component styles
export const componentStyles = {
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.white
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.light
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.md,
    backgroundColor: colors.input
  },
  button: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.lg,
      alignItems: 'center' as const,
      justifyContent: 'center' as const
    },
    secondary: {
      backgroundColor: colors.white,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: 'center' as const,
      justifyContent: 'center' as const
    },
    disabled: {
      backgroundColor: colors.disable,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.lg,
      alignItems: 'center' as const,
      justifyContent: 'center' as const
    }
  },
  buttonText: {
    primary: {
      color: colors.white,
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.semiBold
    },
    secondary: {
      color: colors.primary,
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.semiBold
    },
    disabled: {
      color: colors.text,
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.semiBold
    }
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md
  },
  section: {
    marginVertical: spacing.md
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    marginBottom: spacing.sm
  }
};
