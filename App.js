import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font'
import Welcome from './screens/Welcome';

export default function App() {
  const [fontsLoaded] = useFonts({
    'DelaGothic': require('./src/assets/fonts/DelaGothic.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Visualizza un indicatore di caricamento fino a quando il font non è stato caricato
  }

  return (
    <View style={styles.container}>
      <Welcome/>
    </View>
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