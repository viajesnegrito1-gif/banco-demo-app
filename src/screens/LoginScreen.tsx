import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppLogo } from '../components/AppLogo';
import { DemoBadge } from '../components/DemoBadge';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, radii, shadows } from '../constants/theme';
import { TEST_USER } from '../data/mock';
import { useAuth } from '../context/AuthContext';

export function LoginScreen() {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState(TEST_USER.email);
  const [password, setPassword] = useState(TEST_USER.password);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ identifier?: string; password?: string; form?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    const nextErrors: typeof fieldErrors = {};

    if (!identifier.trim()) {
      nextErrors.identifier = 'Ingresa el usuario o correo DEMO.';
    }

    if (!password.trim()) {
      nextErrors.password = 'Ingresa la clave DEMO.';
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    const result = await login(identifier, password);
    setIsSubmitting(false);

    if (!result.success) {
      setFieldErrors({ form: result.error });
    }
  };

  return (
    <LinearGradient colors={['#FFDD00', '#FFE971', '#F6F7F9']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.hero}>
            <DemoBadge label="SIMULADOR" />
            <View style={styles.heroSpacer} />
            <AppLogo />
            <Text style={styles.title}>Bienvenido a tu banca digital DEMO</Text>
            <Text style={styles.subtitle}>
              Accede con un usuario ficticio local. Esta aplicacion no solicita ni almacena
              credenciales bancarias reales.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.formTitle}>Iniciar sesion</Text>
            <Text style={styles.formSubtitle}>
              Usuario DEMO: {TEST_USER.email} | Clave: {TEST_USER.password}
            </Text>

            <InputField
              autoCapitalize="none"
              error={fieldErrors.identifier}
              icon="mail-outline"
              label="Usuario o correo"
              placeholder="demo@bancoflow.app"
              value={identifier}
              onChangeText={setIdentifier}
            />

            <InputField
              error={fieldErrors.password}
              icon="lock-closed-outline"
              label="Contrasena"
              placeholder="Ingresa tu clave DEMO"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onToggleSecure={() => setShowPassword((current) => !current)}
            />

            {fieldErrors.form ? <Text style={styles.formError}>{fieldErrors.form}</Text> : null}

            <PrimaryButton loading={isSubmitting} title="Iniciar sesion" onPress={handleLogin} />

            <Text style={styles.forgotPassword}>¿Olvidaste tu contrasena?</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  hero: {
    marginBottom: 20,
  },
  heroSpacer: {
    height: 18,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
    marginTop: 28,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  card: {
    ...shadows.card,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 20,
  },
  formTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  formSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 18,
  },
  formError: {
    color: colors.danger,
    fontSize: 13,
    marginBottom: 12,
  },
  forgotPassword: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 18,
    textAlign: 'center',
  },
});
