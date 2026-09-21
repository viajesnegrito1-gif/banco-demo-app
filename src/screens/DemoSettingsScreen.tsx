import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { DemoBadge } from '../components/DemoBadge';
import { colors, radii } from '../constants/theme';
import { useDemoData } from '../context/DemoDataContext';
import { sanitizeCvv, sanitizeLast4 } from '../utils/formatters';

export function DemoSettingsScreen() {
  const { data, updateDemoData } = useDemoData();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboard}
    >
      <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Configuracion DEMO</Text>
          <DemoBadge />
        </View>

        <Text style={styles.subtitle}>
          Cambia los datos del simulador y se reflejaran de inmediato en Inicio y Tarjeta digital.
        </Text>

        <View style={styles.card}>
          <Field
            label="Nombre del titular"
            value={data.holderName}
            onChangeText={(value) => updateDemoData({ holderName: value || 'Titular DEMO' })}
          />
          <Field
            keyboardType="numeric"
            label="Saldo"
            value={String(data.balance)}
            onChangeText={(value) => {
              const parsed = Number(value.replace(/,/g, '.'));
              if (!Number.isNaN(parsed)) {
                updateDemoData({ balance: parsed });
              }
            }}
          />
          <Field
            label="Numero de cuenta ficticio"
            value={data.accountNumber}
            onChangeText={(value) => updateDemoData({ accountNumber: value || '000-000000-00' })}
          />
          <Field
            keyboardType="numeric"
            label="Ultimos 4 digitos"
            value={data.cardLast4}
            onChangeText={(value) => updateDemoData({ cardLast4: sanitizeLast4(value) })}
          />
          <Field
            label="Fecha de vencimiento"
            value={data.expiryDate}
            onChangeText={(value) => updateDemoData({ expiryDate: value || '00/00' })}
          />
          <Field
            keyboardType="numeric"
            label="CVV ficticio"
            value={data.cvv}
            onChangeText={(value) => updateDemoData({ cvv: sanitizeCvv(value) })}
          />
          <Field
            label="Tipo de tarjeta"
            value={data.cardType}
            onChangeText={(value) => updateDemoData({ cardType: value || 'Tarjeta DEMO' })}
          />
          <Field
            label="Estado de tarjeta"
            value={data.cardStatus}
            onChangeText={(value) =>
              updateDemoData({ cardStatus: value.toLowerCase().includes('bloq') ? 'Bloqueada' : 'Activa' })
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'numeric';
}

function Field({ label, value, onChangeText, keyboardType = 'default' }: FieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  screen: {
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 18,
  },
  fieldWrap: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: 14,
  },
});
