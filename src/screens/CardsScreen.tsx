import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { DemoBadge } from '../components/DemoBadge';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProductCard } from '../components/ProductCard';
import { colors, radii } from '../constants/theme';
import { useDemoData } from '../context/DemoDataContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { buildDemoCardNumber, maskCardNumber } from '../utils/formatters';

export function CardsScreen() {
  const { data } = useDemoData();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const fullCardNumber = buildDemoCardNumber(data.cardLast4);

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Tarjetas</Text>
          <Text style={styles.subtitle}>Gestion visual de tarjetas ficticias del simulador.</Text>
        </View>
        <DemoBadge />
      </View>

      <LinearGradient colors={['#FFDD00', '#F3CB05']} style={styles.preview}>
        <View style={styles.previewTop}>
          <Text style={styles.previewLabel}>{data.cardType}</Text>
          <DemoBadge />
        </View>
        <Text style={styles.previewNumber}>{maskCardNumber(fullCardNumber, false)}</Text>
        <View style={styles.previewBottom}>
          <View>
            <Text style={styles.previewMetaLabel}>Titular</Text>
            <Text style={styles.previewMetaValue}>{data.holderName}</Text>
          </View>
          <View>
            <Text style={styles.previewMetaLabel}>Estado</Text>
            <Text style={styles.previewMetaValue}>{data.cardStatus}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.cardRow}>
        <ProductCard
          icon="eye-outline"
          subtitle="Consulta el numero, CVV, estado y saldo DEMO."
          title="Ver tarjeta"
          onPress={() => navigation.navigate('DigitalCard')}
        />
      </View>

      <View style={styles.cardRow}>
        <ProductCard
          icon="settings-outline"
          subtitle="Modifica nombre, saldo y datos de la tarjeta demo."
          title="Configurar datos DEMO"
          onPress={() => navigation.navigate('DemoSettings')}
        />
      </View>

      <PrimaryButton title="Abrir tarjeta digital" onPress={() => navigation.navigate('DigitalCard')} />
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
  preview: {
    borderRadius: radii.lg,
    marginBottom: 18,
    padding: 20,
  },
  previewTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 34,
  },
  previewLabel: {
    color: colors.cardDark,
    fontSize: 14,
    fontWeight: '800',
  },
  previewNumber: {
    color: colors.cardDark,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 28,
  },
  previewBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewMetaLabel: {
    color: '#424242',
    fontSize: 11,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  previewMetaValue: {
    color: colors.cardDark,
    fontSize: 14,
    fontWeight: '800',
  },
  cardRow: {
    marginBottom: 14,
  },
});
