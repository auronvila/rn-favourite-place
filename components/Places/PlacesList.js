import {FlatList, StyleSheet, Text, View} from 'react-native';
import PlaceItem from './PlaceItem';
import {COLORS} from '../../constans/colors';
import {useNavigation} from '@react-navigation/native';

export default function PlacesList({places}) {
  const navigation = useNavigation()

  function selectPlaceHandler(id) {
    navigation.navigate('PlaceDetails', {placeId: id})
  }

  if (!places || places.length === 0) {
    return <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        No places added yet start adding some
      </Text>
    </View>
  }

  return (
    <FlatList
      style={styles.list}
      keyExtractor={(item) => item.id}
      data={places}
      renderItem={(item) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}/>
  )
}

const styles = StyleSheet.create({
  list: {margin: 24},
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    color: COLORS.primary200,
    fontSize: 16
  }
})
