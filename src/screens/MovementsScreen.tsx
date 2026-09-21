import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DemoBadge } from '../components/DemoBadge';
import { MovementCard } from '../components/MovementCard';
import { colors, radii } from '../constants/theme';
import { MOCK_MOVEMENTS } from '../data/mock';

export function MovementsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Movimientos</Text>
          <Text style={styles.subtitle}>Historial completamente ficticio para demostracion.</Text>
        </View>
        <DemoBadge />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Actividad reciente</Text>
        <Text style={styles.summaryText}>
          Compras, transferencias, pagos y depositos generados solo para el simulador.
        </Text>
      </View>

      {MOCK_MOVEMENTS.map((item) => (
        <MovementCard item={item} key={item.id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 110,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 8,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 6,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    maxWidth: 250,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginBottom: 18,
    padding: 18,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  summaryText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
});
