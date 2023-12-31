import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import OutlinedButton from '../components/UI/OutlinedButton';
import {COLORS} from '../constans/colors';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import fetPlaceDetails from '../util/database';

export default function PlaceDetails() {
  const route = useRoute()
  const navigation = useNavigation()
  const [fetchedPlace, setFetchedPlace] = useState()

  function showOnMapHandler() {
    navigation.navigate('Map',
      {
        initialLat: fetchedPlace.location.lat,
        initialLng: fetchedPlace.location.lng
      }
    )
  }

  const selectedPlaceId = route.params.placeId

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetPlaceDetails(selectedPlaceId)
      setFetchedPlace(place)
      navigation.setOptions({
        title: place.title
      })
    }

    loadPlaceData()
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return <View style={styles.fallback}>
      <Text>Loading Place Data...</Text>
    </View>
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton iconName={'map'} onPress={showOnMapHandler}>VIEW ON MAP</OutlinedButton>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: COLORS.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})
