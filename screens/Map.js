import MapView, {Marker} from 'react-native-maps';
import {Alert, StyleSheet} from 'react-native';
import {useCallback, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import IconButton from '../components/UI/IconButton';

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState()
  const navigation = useNavigation()

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  function selectLocationHandler(event) {
    const selectedLatitude = event.nativeEvent.coordinate.latitude
    const selectedLongitude = event.nativeEvent.coordinate.longitude
    setSelectedLocation({
      latitude: selectedLatitude,
      longitude: selectedLongitude
    })
  }



  const savePickedLocationHandler = useCallback(() => {
    console.log(selectedLocation)
    if (!selectedLocation) {
      Alert.alert('No location Picked', 'to save the location you have to tap on the map')
      return
    }

    navigation.navigate('AddPlace', {pickedLat: selectedLocation.latitude, pickedLng: selectedLocation.longitude})

  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton size={25} iconName={'save'} onPress={savePickedLocationHandler} color={tintColor}/>
      )
    })
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      onPress={selectLocationHandler}
      style={styles.map}
      initialRegion={region}
    >
      {selectedLocation && <Marker
        title={'picked location'}
        coordinate={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude
        }}/>}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})