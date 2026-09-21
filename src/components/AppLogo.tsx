import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '../constants/theme';

export function AppLogo() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.mark}>
        <View style={styles.columnTall} />
        <View style={styles.columnShort} />
        <View style={styles.columnMid} />
      </View>
      <View>
        <Text style={styles.title}>Banco Flow</Text>
        <Text style={styles.subtitle}>SIMULADOR DEMO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  mark: {
    alignItems: 'flex-end',
    backgroundColor: colors.cardDark,
    borderRadius: radii.md,
    flexDirection: 'row',
    gap: 6,
    marginRight: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  columnTall: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    height: 30,
    width: 8,
  },
  columnShort: {
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    height: 18,
    width: 8,
  },
  columnMid: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    height: 24,
    width: 8,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginTop: 2,
  },
});
