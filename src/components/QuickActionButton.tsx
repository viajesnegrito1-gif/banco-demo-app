import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, shadows } from '../constants/theme';

interface QuickActionButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export function QuickActionButton({ label, icon, onPress }: QuickActionButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.iconWrap}>
        <Ionicons color={colors.cardDark} name={icon} size={20} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadows.card,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    flex: 1,
    marginRight: 10,
    minHeight: 98,
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  pressed: {
    opacity: 0.92,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
    height: 46,
    justifyContent: 'center',
    marginBottom: 12,
    width: 46,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
