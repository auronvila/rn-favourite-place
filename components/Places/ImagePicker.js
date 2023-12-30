import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker';
import {useState} from 'react';
import {COLORS} from '../../constans/colors';
import OutlinedButton from '../UI/OutlinedButton';
import * as GalleryOpener from 'expo-image-picker';

export default function ImagePicker({onTakenImage}) {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [imageSrc, setImageSrc] = useState(null);

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestPermission();
      return permissionRes.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app');
      return false;
    }

    return true;
  }

  async function openCameraHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const {assets, canceled} = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (canceled) {
      return;
    }

    const selectedAsset = assets.length > 0 ? assets[0] : null;

    if (selectedAsset) {
      setImageSrc(selectedAsset.uri);
      onTakenImage(selectedAsset.uri)
    }
  }

  const pickImage = async () => {
    let result = await GalleryOpener.launchImageLibraryAsync({
      mediaTypes: GalleryOpener.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImageSrc(result.assets[0].uri);
      onTakenImage(result.assets[0].uri)
    }
  };

  return (
    <View>
      <View style={styles.imagePreviewStyle}>
        {imageSrc ? <Image style={styles.image} source={{uri: imageSrc}}/> : <Text>No Image Taken Yet</Text>}
      </View>
      <OutlinedButton iconName={'camera'} onPress={openCameraHandler}>Open Cam</OutlinedButton>
      <OutlinedButton iconName={'image'} onPress={pickImage}>Pick From Gallery</OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreviewStyle: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
