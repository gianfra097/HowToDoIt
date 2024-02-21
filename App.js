import { Text, View } from 'react-native';
import { useFonts } from 'expo-font'
import Welcome from './screens/Welcome';

export default function App() {
  const [fontsLoaded] = useFonts({
    'DelaGothic': require('./src/assets/fonts/DelaGothic.ttf'),
    'NotoSans-Regular': require('./src/assets/fonts/NotoSans-Regular.ttf'),
    'NotoSans-Bold': require('./src/assets/fonts/NotoSans-Bold.ttf'),
    'NotoSans-Medium': require('./src/assets/fonts/NotoSans-Medium.ttf'),
    'NotoSans-ExtraBold': require('./src/assets/fonts/NotoSans-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Visualizza un indicatore di caricamento fino a quando il font non è stato caricato
  }

  return (
    <Welcome/>
  );
};