import { Text, View } from 'react-native';
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import Pagina1 from './screens/Pagina1';

const Stack = createNativeStackNavigator();  //Navigator per spostarmi nelle pagine con i buttons

export default function App() {
  const [fontsLoaded] = useFonts({  //Importo i fonts
    'DelaGothic': require('./src/assets/fonts/DelaGothic.ttf'),
    'NotoSans-Regular': require('./src/assets/fonts/NotoSans-Regular.ttf'),
    'NotoSans-Bold': require('./src/assets/fonts/NotoSans-Bold.ttf'),
    'NotoSans-Medium': require('./src/assets/fonts/NotoSans-Medium.ttf'),
    'NotoSans-ExtraBold': require('./src/assets/fonts/NotoSans-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Visualizza un indicatore di caricamento fino a quando il font non è stato caricato
  }
  //Gestisco le pagine che poi verranno utilizzate dai button nei vari file .jsx
  //headerShown: false, serve per evitare che si veda in alto il nome della pagina in cui ci si trova
  //gestureEnabled: false, server per evitare che si torni nella pagina Welcome dalla pagina Home
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Pagina1" component={Pagina1} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};