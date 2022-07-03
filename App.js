import { StatusBar } from 'expo-status-bar';
import { NativeModules, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  console.log('App.js...');
  console.log('NativeModules:', NativeModules)

  // console.log('NativeModules.RNExpoReadSms:', NativeModules.RNExpoReadSms.startReadSMS)
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>ExpoReadSMS - Test Application (Expo)</Text>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
