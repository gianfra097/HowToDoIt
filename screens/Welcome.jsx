import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image, ImageBackground, Animated, Dimensions} from 'react-native';
import WelcomeButton from '../src/components/WelcomeButton';

const { width } = Dimensions.get('window')

const Welcome = ({ navigation }) => {
  //Costanti per memorizzare riferimento all'oggetto di animazione del testo e immagine
  const fadeAnimText = useRef(new Animated.Value(0)).current;
  const fadeAnimImage = useRef(new Animated.Value(0)).current;
  const delayButton = useRef(new Animated.Value(0)).current;

  //Hook utilizzato per avviare l'animazione dell'immagine di benvenuto una volta che il componente è stato montato
  useEffect(() => {  
    Animated.timing( //Fade per il testo con durata 1500
      fadeAnimText,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();

    Animated.timing(  //Fade per immagine con durata 2000
      fadeAnimImage,
      {
        toValue: 1,
        duration: 300,
        delay: 400,
        useNativeDriver: true,
      }
    ).start(); //Montato quando viene aperta la pagina Welcome

    Animated.timing( //Solo delay per il button
      delayButton,
      {
        toValue: 1,
        duration: 800,
        delay: 450,
        useNativeDriver: true
      }
    ).start();

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
          opacity: fadeAnimImage,
          transform: [{
            translateY: fadeAnimText.interpolate({
              inputRange: [0, 1],
              outputRange: [-80, 0]
            }),
          }],
          }]}/>
        <Animated.View style={{
        transform: [{
          translateY: delayButton.interpolate({
            inputRange: [0, 0.5, 0.8, 1],
            outputRange: [-70, 10, 2, 0]
          }),
        }],
        }}>
          <WelcomeButton allowFontScaling={false}  title="CONTINUA" onPress={() => navigation.navigate("Home")}/>
        </Animated.View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ImageBackground>
  );
  
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: "100%",
    height: Dimensions.get('screen').height,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: width / 10,
    fontFamily: 'DelaGothic',
  },
  text2: {
    fontSize: width / 20,
    fontFamily: 'Satoshi-Medium',
  },
  imageWelcome: {
    width: "100%",
    height: "60%",
    resizeMode: "cover"
  },
});

export default Welcome;