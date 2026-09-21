import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, radii } from '../constants/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
}

export function PrimaryButton({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  style,
}: PrimaryButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        variant === 'ghost' && styles.ghost,
        pressed && !disabled && !loading && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.text : colors.cardDark} />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary && styles.primaryText,
            isSecondary && styles.secondaryText,
            variant === 'ghost' && styles.ghostText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radii.md,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 18,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 15,
    fontWeight: '800',
  },
  primaryText: {
    color: colors.text,
  },
  secondaryText: {
    color: colors.cardDark,
  },
  ghostText: {
    color: colors.textSecondary,
  },
});
