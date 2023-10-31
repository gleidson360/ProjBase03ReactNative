import React, { useEffect, useState } from "react"
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import MapView from "react-native-maps"
import * as Location from "expo-location"

export default function App() {

  const [ localizacao, definirLocalizacao ] = useState({})

  useEffect(function() {
    async function ObterLocalizacao() {
      await Location.requestForegroundPermissionsAsync()
      definirLocalizacao(await Location.getCurrentPositionAsync( {} ))
    }

    ObterLocalizacao()
  }, [])
  
  return <View>
    <StatusBar barStyle="light-content" backgroundColor="#144272"/>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
