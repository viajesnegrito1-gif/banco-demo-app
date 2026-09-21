import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DemoBadge } from '../components/DemoBadge';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, radii, shadows } from '../constants/theme';
import { useDemoData } from '../context/DemoDataContext';
import { formatCurrency } from '../utils/currency';
import { buildDemoCardNumber, maskCardNumber, maskCvv } from '../utils/formatters';

export function DigitalCardScreen() {
  const { data, toggleCardStatus } = useDemoData();
  const [showNumber, setShowNumber] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const cardNumber = buildDemoCardNumber(data.cardLast4);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(cardNumber);
    Alert.alert('Numero copiado', 'Se copio la tarjeta ficticia DEMO al portapapeles.');
  };

  const handleDetails = () => {
    Alert.alert(
      'Detalles DEMO',
      `Titular: ${data.holderName}\nCuenta: ${data.accountNumber}\nEstado: ${data.cardStatus}\nSaldo: ${formatCurrency(data.balance)}`,
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <LinearGradient colors={['#16181C', '#2A2E34']} style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.brand}>Banco Flow</Text>
            <Text style={styles.brandType}>{data.cardType}</Text>
          </View>
          <DemoBadge />
        </View>

        <Text style={styles.cardNumber}>{maskCardNumber(cardNumber, showNumber)}</Text>

        <View style={styles.metaGrid}>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Titular</Text>
            <Text style={styles.metaValue}>{data.holderName}</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Vence</Text>
            <Text style={styles.metaValue}>{data.expiryDate}</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>CVV</Text>
            <Text style={styles.metaValue}>{maskCvv(data.cvv, showCvv)}</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>Ultimos 4</Text>
            <Text style={styles.metaValue}>{data.cardLast4}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.metaLabel}>Saldo disponible</Text>
            <Text style={styles.balance}>{formatCurrency(data.balance)}</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>Estado</Text>
            <Text style={styles.state}>{data.cardStatus}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.controls}>
        <PrimaryButton
          title={showNumber ? 'Ocultar numero' : 'Mostrar numero'}
          variant="secondary"
          onPress={() => setShowNumber((current) => !current)}
        />
        <View style={styles.controlGap} />
        <PrimaryButton
          title={showCvv ? 'Ocultar CVV' : 'Mostrar CVV'}
          variant="secondary"
          onPress={() => setShowCvv((current) => !current)}
        />
      </View>

      <View style={styles.controls}>
        <PrimaryButton
          title={data.cardStatus === 'Activa' ? 'Bloquear tarjeta' : 'Desbloquear tarjeta'}
          variant="primary"
          onPress={toggleCardStatus}
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Controles DEMO</Text>
        <Text style={styles.infoText}>
          Toda la informacion es ficticia. No se usan tarjetas reales ni se conecta a procesadores de pago.
        </Text>
      </View>

      <View style={styles.controls}>
        <PrimaryButton title="Copiar numero ficticio" variant="secondary" onPress={handleCopy} />
        <View style={styles.controlGap} />
        <PrimaryButton title="Ver detalles" variant="secondary" onPress={handleDetails} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    ...shadows.card,
    borderRadius: radii.lg,
    marginBottom: 20,
    padding: 22,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  brand: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 2,
  },
  brandType: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  cardNumber: {
    color: colors.surface,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 28,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metaBlock: {
    marginBottom: 18,
    width: '48%',
  },
  metaLabel: {
    color: '#C8CDD6',
    fontSize: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  metaValue: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '800',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balance: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  state: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'right',
  },
  controls: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  controlGap: {
    width: 12,
  },
  infoCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.lg,
    marginBottom: 14,
    padding: 18,
  },
  infoTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
});
