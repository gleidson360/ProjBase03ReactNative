import React, { useEffect, useState } from "react"
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import MapView, { Marker } from "react-native-maps"
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

  return <View style={ styles.tela }>
    <StatusBar barStyle="light-content" backgroundColor="#144272"/>

    { Object.keys(localizacao).length > 0 &&
      <>
        <View style={ styles.indicador }>
          <Text style={ styles.indicadorTexto }> EXPLORAR NOVOS MAPAS </Text>
          <Text style={ styles.indicadorTexto }> Latitude: { localizacao.coords.latitude } </Text>
          <Text style={ styles.indicadorTexto }> Longitude: { localizacao.coords.longitude } </Text>
          <Text style={ styles.indicadorTexto }> Altitude: { localizacao.coords.altitude } </Text>
        </View>

        <MapView
          initialRegion={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={ styles.mapa }>

          <Marker 
            key={ 0 }
            coordinate={{
            latitude: localizacao.coords.latitude,
            longitude: localizacao.coords.longitude 
            }}
            title="Título"
            description="Descrição" />
          </MapView>
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
  tela: { 
    flex: 1 
  },
  indicador: { 
    backgroundColor: "#144272", padding: 32 
  },
  indicadorTexto: { 
    color: "white", fontSize: 20 
  },
  mapa: { 
    height: "100%", width: "100%" 
  }
});
