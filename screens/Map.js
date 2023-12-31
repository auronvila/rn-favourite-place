import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Alert, StyleSheet} from 'react-native';
import {useCallback, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconButton from '../components/UI/IconButton';

export default function Map() {
  const route = useRoute()
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  }
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)
  const navigation = useNavigation()


  const region = {
    latitude: initialLocation ? initialLocation.lat : 42.6026,
    longitude: initialLocation ? initialLocation.lng : 20.9030,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  function selectLocationHandler(event) {
    if (initialLocation) {
      return
    }
    const selectedLatitude = event.nativeEvent.coordinate.latitude
    const selectedLongitude = event.nativeEvent.coordinate.longitude
    setSelectedLocation({
      latitude: selectedLatitude,
      longitude: selectedLongitude
    })
  }


  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location Picked', 'to save the location you have to tap on the map')
      return
    }

    navigation.navigate('AddPlace', {pickedLat: selectedLocation.latitude, pickedLng: selectedLocation.longitude})

  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    if (initialLocation) {
      return
    }

    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton size={25} iconName={'save'} onPress={savePickedLocationHandler} color={tintColor}/>
      )
    })
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      showsUserLocation
      showsMyLocationButton
      provider={PROVIDER_GOOGLE}
      onPress={selectLocationHandler}
      style={styles.map}
      initialRegion={region}
    >
      {selectedLocation && <Marker
        title={'picked location'}
        coordinate={{
          latitude: initialLocation ? selectedLocation.lat : selectedLocation.latitude,
          longitude: initialLocation ? selectedLocation.lng : selectedLocation.longitude
        }}/>}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})