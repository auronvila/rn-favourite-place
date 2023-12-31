import {StatusBar} from 'expo-status-bar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import {COLORS} from './constans/colors';
import Map from './screens/Map';
import {useEffect, useState} from 'react';
import {init} from './util/database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator()

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false)

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true)
    }).catch((e) => console.log(e))
  }, []);

  if (!dbInitialized) {
    return <AppLoading/>
  }

  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: COLORS.primary500},
          headerTintColor: COLORS.gray700,
          contentStyle: {backgroundColor: COLORS.gray700}
        }} initialRouteName={'AllPlaces'}>
          <Stack.Screen
            name={'AllPlaces'} component={AllPlaces}/>
          <Stack.Screen options={{title: 'Add a new place'}} name={'AddPlace'} component={AddPlace}/>
          <Stack.Screen name={'Map'} component={Map}/>
          <Stack.Screen options={{title: 'Loading Place...'}} name={'PlaceDetails'} component={PlaceDetails}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
