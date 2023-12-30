import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import {COLORS} from '../../constans/colors';
import {useForegroundPermissions, PermissionStatus, getCurrentPositionAsync} from 'expo-location';
import {useEffect, useState} from 'react';
import {getAddress, getMapPreview} from '../../util/location';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

export default function LocationPicker({onPickedLocation}) {
  const [locationPermissionInfo, reqPermission] = useForegroundPermissions()
  const [pickedLocation, setPickedLocation] = useState(null)
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPicketLocation = route.params ? {lat: route.params.pickedLat, lng: route.params.pickedLng} : null
      setPickedLocation(mapPicketLocation)

    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
        onPickedLocation({...pickedLocation, address: address})
      }
    }

    handleLocation()

  }, [pickedLocation, onPickedLocation]);

  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await reqPermission();
      return permissionRes.granted;
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app');
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
  }


  function pickOnMapHandler() {
    navigation.navigate('Map')
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ?
          <Image style={styles.mapPreviewImage} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}/>
          :
          <Text>No Location Picked Yet</Text>}
      </View>
      <View style={styles.actions}>
        <OutlinedButton onPress={getLocationHandler} iconName={'location'}>Locate User</OutlinedButton>
        <OutlinedButton onPress={pickOnMapHandler} iconName={'map'}>Pick on Map</OutlinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  mapPreviewImage: {
    borderRadius: 6,
    width: '100%',
    height: '100%'
  }
})