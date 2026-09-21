import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '../constants/theme';

interface SettingRowProps {
  label: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export function SettingRow({ label, subtitle, icon, onPress }: SettingRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Ionicons color={colors.cardDark} name={icon} size={18} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.label}>{label}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <Ionicons color={colors.textMuted} name="chevron-forward" size={18} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  pressed: {
    opacity: 0.95,
  },
  left: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginRight: 12,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.pill,
    height: 38,
    justifyContent: 'center',
    marginRight: 12,
    width: 38,
  },
  copy: {
    flex: 1,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
});
