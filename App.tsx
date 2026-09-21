import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/context/AuthContext';
import { DemoDataProvider } from './src/context/DemoDataContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DemoDataProvider>
          <StatusBar style="dark" />
          <AppNavigator />
        </DemoDataProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
