import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DemoBadge } from '../components/DemoBadge';
import { PrimaryButton } from '../components/PrimaryButton';
import { SettingRow } from '../components/SettingRow';
import { colors, radii } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useDemoData } from '../context/DemoDataContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getInitials } from '../utils/formatters';

export function ProfileScreen() {
  const { user, logout } = useAuth();
  const { data } = useDemoData();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>Cuenta ficticia para uso exclusivo de demostracion.</Text>
        </View>
        <DemoBadge />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(data.holderName)}</Text>
        </View>
        <Text style={styles.name}>{data.holderName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <SettingRow
        icon="settings-outline"
        label="Configuracion"
        subtitle="Opciones visuales del simulador"
        onPress={() => Alert.alert('Configuracion', 'Pantalla demostrativa sin conexion a servicios reales.')}
      />
      <SettingRow
        icon="color-wand-outline"
        label="Configuracion de datos DEMO"
        subtitle="Edita titular, saldo, cuenta y tarjeta"
        onPress={() => navigation.navigate('DemoSettings')}
      />

      <PrimaryButton title="Cerrar sesion" onPress={() => void logout()} />
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
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginBottom: 18,
    padding: 24,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    height: 84,
    justifyContent: 'center',
    marginBottom: 16,
    width: 84,
  },
  avatarText: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
  },
  email: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
