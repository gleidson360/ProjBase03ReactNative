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

    { Object.keys(localizacao).length > 0 &&
      <>
        <View>
          <Text> EXPLORAR NOVOS MAPAS </Text>
          <Text> Latitude: { localizacao.coords.latitude } </Text>
          <Text> Longitude: { localizacao.coords.longitude } </Text>
          <Text> Altitude: { localizacao.coords.altitude } </Text>
        </View>
      </>
    }
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
