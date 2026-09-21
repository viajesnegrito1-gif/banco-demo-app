import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { AppLogo } from '../components/AppLogo';
import { colors } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useDemoData } from '../context/DemoDataContext';
import { CardsScreen } from '../screens/CardsScreen';
import { DemoSettingsScreen } from '../screens/DemoSettingsScreen';
import { DigitalCardScreen } from '../screens/DigitalCardScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { MovementsScreen } from '../screens/MovementsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  DigitalCard: undefined;
  DemoSettings: undefined;
};

export type MainTabParamList = {
  Inicio: undefined;
  Movimientos: undefined;
  Tarjetas: undefined;
  Perfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <AppLogo />
      <ActivityIndicator color={colors.cardDark} size="large" style={styles.loader} />
      <Text style={styles.loadingText}>Preparando simulador bancario DEMO...</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ color, focused, size }) => {
          const iconMap: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            Inicio: focused ? 'home' : 'home-outline',
            Movimientos: focused ? 'swap-horizontal' : 'swap-horizontal-outline',
            Tarjetas: focused ? 'card' : 'card-outline',
            Perfil: focused ? 'person-circle' : 'person-circle-outline',
          };

          return <Ionicons color={color} name={iconMap[route.name]} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Movimientos" component={MovementsScreen} />
      <Tab.Screen name="Tarjetas" component={CardsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isLoading: demoLoading } = useDemoData();

  if (authLoading || demoLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          card: colors.surface,
          primary: colors.primary,
          text: colors.text,
          border: colors.border,
        },
      }}
    >
      {isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.background },
            headerTitleStyle: { color: colors.text, fontWeight: '800' },
          }}
        >
          <Stack.Screen component={MainTabs} name="MainTabs" options={{ headerShown: false }} />
          <Stack.Screen
            component={DigitalCardScreen}
            name="DigitalCard"
            options={{ title: 'Tarjeta digital' }}
          />
          <Stack.Screen
            component={DemoSettingsScreen}
            name="DemoSettings"
            options={{ title: 'Configuracion DEMO' }}
          />
        </Stack.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loader: {
    marginTop: 24,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 14,
    textAlign: 'center',
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    height: 78,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
});
