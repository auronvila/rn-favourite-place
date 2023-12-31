import PlacesList from '../components/Places/PlacesList';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Text} from 'react-native';
import {useEffect, useLayoutEffect, useState} from 'react';
import IconButton from '../components/UI/IconButton';
import {fetchPlaces} from '../util/database';

export default function AllPlaces() {
  const navigation = useNavigation()
  const route = useRoute()
  const isFocused = useIsFocused()
  const [loadedPlaces, setLoadedPlaces] = useState([])

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces()
      setLoadedPlaces(places)
    }

    if (isFocused) {
      // setLoadedPlaces(currentPlaces => [...currentPlaces, route.params.place])
      loadPlaces()
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Your Favourite Places',
      headerRight: ({tintColor}) => {
        return <IconButton
          iconName={'add'}
          size={28}
          color={tintColor}
          onPress={() => navigation.navigate('AddPlace')}>
          World
        </IconButton>
      }
    })
  }, [navigation]);

  return (
    <PlacesList places={loadedPlaces}/>
  )
}