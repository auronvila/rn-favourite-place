import PlaceForm from '../components/Places/PlaceForm';
import {useNavigation} from '@react-navigation/native';

export default function AddPlace() {
  const navigation = useNavigation()

  function createPlaceHandler(place) {
    navigation.navigate('AllPlaces', {place: place})
  }

  return (
    <PlaceForm onCreatePlace={createPlaceHandler}/>
  )
}