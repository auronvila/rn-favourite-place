import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constans/colors';

export default function PlaceItem({place, onSelect}) {
  return (
    <Pressable style={({pressed}) => [styles.item, pressed && styles.pressed]} onPress={onSelect.bind(this, place.item.id)}>
      <Image style={styles.image} source={{uri: place.item.imageUri}}/>
      <View style={styles.info}>
        <Text style={styles.title}>{place.item.title}</Text>
        <Text style={styles.address}>{place.item.address}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: COLORS.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15
  },
  pressed: {
    opacity: .8
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.gray700
  },
  address: {
    fontSize: 12,
    color: COLORS.gray700
  }
})

