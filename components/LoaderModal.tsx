import React, { useEffect, useRef } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import colors from '@/constants/color';
import { spacing, borderRadius, responsive } from '@/constants/designSystem';

interface LoaderModalProps {
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const LoaderModal: React.FC<LoaderModalProps> = ({ 
  loading = true,
  size = 'medium'
}) => {
  // Create an animated value for the pulse effect
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation function
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2, // Scale up
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1, // Scale down
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Start the pulse animation when the component mounts or when `loading` changes
  useEffect(() => {
    if (loading) {
      startPulseAnimation();
    } else {
      pulseAnim.setValue(1); // Reset the animation when not loading
    }
  }, [loading]);

  // Determine logo size based on screen size and prop
  const getLogoSize = () => {
    const baseSize = size === 'small' ? 80 : size === 'large' ? 160 : 120;
    return responsive.isSmallDevice ? baseSize * 0.8 : baseSize;
  };

  const logoSize = getLogoSize();

  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <BlurView intensity={50} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Animated.Image
            source={require('../assets/logo.png')}
            style={[
              styles.logo,
              {
                width: logoSize,
                height: logoSize,
                transform: [{ scale: pulseAnim }], // Apply the pulse animation
              },
            ]}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(73, 72, 72, 0.4)',
},
modalContent: {
	// backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    width: responsive.widthPercentage(80),
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
});

export default LoaderModal;
