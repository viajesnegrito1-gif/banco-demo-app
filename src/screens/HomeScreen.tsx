import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

import { DemoBadge } from '../components/DemoBadge';
import { MovementCard } from '../components/MovementCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProductCard } from '../components/ProductCard';
import { QuickActionButton } from '../components/QuickActionButton';
import { colors, radii, shadows } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useDemoData } from '../context/DemoDataContext';
import { MOCK_MOVEMENTS } from '../data/mock';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatCurrency } from '../utils/currency';

export function HomeScreen() {
  const { user } = useAuth();
  const { data } = useDemoData();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola,</Text>
          <Text style={styles.name}>{user?.name ?? data.holderName}</Text>
        </View>
        <DemoBadge />
      </View>

      <LinearGradient colors={['#1A1D22', '#2B3037']} style={styles.balanceCard}>
        <View style={styles.balanceTopRow}>
          <View>
            <Text style={styles.balanceLabel}>Saldo disponible ficticio</Text>
            <Text style={styles.balanceValue}>
              {showBalance ? formatCurrency(data.balance) : 'USD •••••'}
            </Text>
          </View>
          <Pressable onPress={() => setShowBalance((current) => !current)} style={styles.eyeButton}>
            <Ionicons color={colors.primary} name={showBalance ? 'eye-off-outline' : 'eye-outline'} size={18} />
          </Pressable>
        </View>

        <View style={styles.balanceFooter}>
          <Text style={styles.accountLabel}>Cuenta DEMO</Text>
          <Text style={styles.accountValue}>{data.accountNumber}</Text>
        </View>
      </LinearGradient>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Accesos rapidos</Text>
      </View>

      <View style={styles.quickActions}>
        <QuickActionButton label="Transferir" icon="swap-horizontal" onPress={() => Alert.alert('Operacion DEMO', 'Transferencia simulada. No se conecta a bancos reales.')} />
        <QuickActionButton label="Pagar" icon="receipt-outline" onPress={() => Alert.alert('Operacion DEMO', 'Pago simulado solo para demostracion.')} />
        <QuickActionButton label="Recargar" icon="phone-portrait-outline" onPress={() => Alert.alert('Operacion DEMO', 'Recarga simulada.')} />
        <QuickActionButton label="Tarjetas" icon="card-outline" onPress={() => navigation.navigate('DigitalCard')} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mis productos</Text>
      </View>

      <View style={styles.productsRow}>
        <ProductCard icon="wallet-outline" subtitle={`Disponible ${formatCurrency(data.balance)}`} title="Cuenta principal" />
        <View style={styles.productGap} />
        <ProductCard
          icon="card-outline"
          subtitle={`${data.cardType} •••• ${data.cardLast4}`}
          title="Tarjeta digital"
          onPress={() => navigation.navigate('DigitalCard')}
        />
      </View>

      <View style={styles.demoPanel}>
        <View style={styles.demoCopy}>
          <Text style={styles.demoTitle}>Tarjeta digital DEMO</Text>
          <Text style={styles.demoText}>
            Visualiza, copia y bloquea la tarjeta ficticia desde el simulador.
          </Text>
        </View>
        <PrimaryButton
          style={styles.demoButton}
          title="Ver tarjeta"
          onPress={() => navigation.navigate('DigitalCard')}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Ultimos movimientos</Text>
      </View>

      <View style={styles.movementsList}>
        {MOCK_MOVEMENTS.slice(0, 4).map((item) => (
          <MovementCard item={item} key={item.id} />
        ))}
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
    paddingBottom: 110,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 8,
  },
  greeting: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
  },
  balanceCard: {
    borderRadius: radii.lg,
    marginBottom: 24,
    padding: 20,
  },
  balanceTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceLabel: {
    color: '#C8CDD6',
    fontSize: 13,
    marginBottom: 10,
  },
  balanceValue: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: '900',
  },
  eyeButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radii.pill,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  balanceFooter: {
    borderTopColor: 'rgba(255,255,255,0.12)',
    borderTopWidth: 1,
    marginTop: 22,
    paddingTop: 18,
  },
  accountLabel: {
    color: '#C8CDD6',
    fontSize: 12,
    marginBottom: 6,
  },
  accountValue: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  quickActions: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  productsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productGap: {
    width: 12,
  },
  demoPanel: {
    ...shadows.card,
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.lg,
    flexDirection: 'row',
    marginBottom: 24,
    padding: 18,
  },
  demoCopy: {
    flex: 1,
    marginRight: 14,
  },
  demoTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  demoText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  demoButton: {
    minWidth: 120,
  },
  movementsList: {
    marginBottom: 10,
  },
});
