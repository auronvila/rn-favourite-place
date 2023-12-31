import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useCallback, useState} from 'react';
import {COLORS} from '../../constans/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import {Place} from '../../models/place';

export default function PlaceForm({onCreatePlace}) {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [pickedLocation, setPickedLocation] = useState()
  const [selectedImage, setSelectedImage] = useState()


  function imageTakenHandler(imageUri) {
    setSelectedImage(imageUri)
  }

  const pickedLocationHandler = useCallback((location) => {
    setPickedLocation(location)
  }, [])

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation)
    onCreatePlace(placeData)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={(text) => setEnteredTitle(text)} value={enteredTitle}/>
      </View>
      <ImagePicker onTakenImage={imageTakenHandler}/>
      <LocationPicker onPickedLocation={pickedLocationHandler}/>
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: COLORS.primary700,
    borderBottomWidth: 2,
    backgroundColor: COLORS.primary100,
    borderRadius: 8,
  }
})