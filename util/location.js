import {Alert} from 'react-native';
import {GOOGLE_API_KEY} from '@env';

export function getMapPreview(lat, lng) {
  try {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
  } catch (e) {
    Alert.alert(e)
  }
}

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  const res = await fetch(url, {
    method: 'GET'
  })
  if (!res.ok) {
    throw new Error('failed to fetch the address')
  }

  const data = await res.json()
  const address = data.results[0].formatted_address

  return address
}
