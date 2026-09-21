import { Platform } from 'react-native';

export const colors = {
  primary: '#FFDD00',
  primaryPressed: '#F2CF00',
  primarySoft: '#FFF6BF',
  background: '#F6F7F9',
  surface: '#FFFFFF',
  surfaceAlt: '#FFFCEE',
  text: '#171717',
  textSecondary: '#5F6570',
  textMuted: '#7B8491',
  border: '#E4E7EC',
  cardDark: '#171A1F',
  cardMid: '#2B2F36',
  success: '#1F9D55',
  danger: '#D64545',
  info: '#2573D5',
  shadow: '#101828',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 12,
  md: 18,
  lg: 24,
  pill: 999,
};

export const shadows = {
  card: Platform.select({
    ios: {
      shadowColor: colors.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
};

export const typography = {
  title: 30,
  heading: 22,
  subheading: 18,
  body: 15,
  caption: 13,
};
