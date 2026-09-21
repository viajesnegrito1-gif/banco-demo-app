import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows } from '../constants/theme';

interface ProductCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export function ProductCard({ title, subtitle, icon, onPress }: ProductCardProps) {
  return (
    <Pressable disabled={!onPress} onPress={onPress} style={({ pressed }) => [styles.card, pressed && onPress && styles.pressed]}>
      <View style={styles.iconWrap}>
        <Ionicons color={colors.cardDark} name={icon} size={20} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadows.card,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    flex: 1,
    minHeight: 118,
    padding: 16,
  },
  pressed: {
    opacity: 0.94,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
    height: 42,
    justifyContent: 'center',
    marginBottom: 14,
    width: 42,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
});
