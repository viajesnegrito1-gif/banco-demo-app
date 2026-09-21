import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '../constants/theme';

interface DemoBadgeProps {
  label?: string;
}

export function DemoBadge({ label = 'DEMO' }: DemoBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});
