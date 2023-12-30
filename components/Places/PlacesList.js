import {FlatList, StyleSheet, Text, View} from 'react-native';
import PlaceItem from './PlaceItem';
import {COLORS} from '../../constans/colors';

export default function PlacesList({places}) {

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
      renderItem={(item) => <PlaceItem place={item}/>}/>
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
