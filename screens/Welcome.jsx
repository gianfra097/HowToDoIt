import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image, ImageBackground, Animated} from 'react-native';
import HomeButton from '../src/components/HomeButton';

const Welcome = ({ navigation }) => {
  //Costanti per memorizzare riferimento all'oggetto di animazione del testo e immagine
  const fadeAnimText = useRef(new Animated.Value(0)).current;
  const fadeAnimImage = useRef(new Animated.Value(0)).current;

  //Hook utilizzato per avviare l'animazione dell'immagine di benvenuto una volta che il componente è stato montato
  useEffect(() => {  
    Animated.timing( //Fade per il testo con durata 1500
      fadeAnimText,
      {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }
    ).start();

    Animated.timing(  //Fade per immagine con durata 2000
      fadeAnimImage,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }
    ).start(); //Montato quando viene aperta la pagina Welcome

  }, []);

  //Avviato con opacity: fadeAnim...
  return (
    <ImageBackground source={require('../src/assets/images/waveBackground.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Animated.Text allowFontScaling={false} style={[styles.text1, {
          opacity: fadeAnimText,
          transform: [{
            translateY: fadeAnimText.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0]
            }),
          }],
          }]}> {/* allowFontScaling={false} evita font troppo grande se visualizzazione testo è High su altri dispositivi */}
          <Text style={{ color: 'black' }}>HOW TO </Text>
          <Text style={{ color: '#00bea5' }}>DO IT</Text>
        </Animated.Text>
        <Animated.Text allowFontScaling={false} style={[styles.text2, {
          opacity: fadeAnimText,
          transform: [{
            translateY: fadeAnimText.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0]
            }),
          }],
          }]}>IMPARA, OVUNQUE TU SIA!</Animated.Text>
        <Animated.Image source={require('../src/assets/images/manWelcome.png')} style={[styles.imageWelcome, {
          opacity: fadeAnimText,
          transform: [{
            translateY: fadeAnimText.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0]
            }),
          }],
          }]}/>
        <HomeButton allowFontScaling={false}  title="CONTINUA" onPress={() => navigation.navigate("Home")}/>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ImageBackground>
  );
  
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 38,
    fontFamily: 'DelaGothic',
  },
  text2: {
    fontSize: 20,
    fontFamily: 'NotoSans-Medium',
  },
  imageWelcome: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});

export default Welcome;