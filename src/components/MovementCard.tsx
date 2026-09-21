import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '../constants/theme';
import { MovementItem } from '../types/demo';
import { formatCurrency } from '../utils/currency';

interface MovementCardProps {
  item: MovementItem;
}

export function MovementCard({ item }: MovementCardProps) {
  const isCredit = item.amount > 0;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={[styles.dot, isCredit ? styles.creditDot : styles.debitDot]} />
        <View style={styles.textWrap}>
          <Text style={styles.title}>{item.description}</Text>
          <Text style={styles.meta}>
            {item.type} • {item.date}
          </Text>
        </View>
      </View>
      <Text style={[styles.amount, isCredit ? styles.credit : styles.debit]}>
        {isCredit ? '+' : ''}
        {formatCurrency(item.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  left: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginRight: 12,
  },
  dot: {
    borderRadius: radii.pill,
    height: 10,
    marginRight: 12,
    width: 10,
  },
  creditDot: {
    backgroundColor: colors.success,
  },
  debitDot: {
    backgroundColor: colors.danger,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  amount: {
    fontSize: 14,
    fontWeight: '800',
  },
  credit: {
    color: colors.success,
  },
  debit: {
    color: colors.text,
  },
});
