import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radii } from '../constants/theme';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  autoCapitalize?: 'none' | 'words' | 'sentences' | 'characters';
}

export function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry,
  onToggleSecure,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, error && styles.fieldError]}>
        <Ionicons color={colors.textMuted} name={icon} size={18} />
        <TextInput
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
        {onToggleSecure ? (
          <Pressable onPress={onToggleSecure} style={styles.toggleButton}>
            <Text style={styles.toggleText}>{secureTextEntry ? 'Mostrar' : 'Ocultar'}</Text>
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  field: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 54,
    paddingHorizontal: 14,
  },
  fieldError: {
    borderColor: colors.danger,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
  },
  toggleButton: {
    paddingLeft: 10,
  },
  toggleText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 6,
  },
});
