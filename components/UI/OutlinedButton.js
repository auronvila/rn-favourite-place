import {Pressable, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from '../../constans/colors';

export default function OutlinedButton({onPress, iconName, children}) {
  return (
    <Pressable android_ripple style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Ionicons style={styles.icon} size={18} color={COLORS.primary500} name={iconName}/>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary500,
    borderRadius: 6,
    elevation: 0.001,
    shadowOpacity: 1,
    shadowColor: COLORS.primary500,
    shadowRadius: 2,
    shadowOffset: {
      height: 2.4,
      width: 2
    }
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 6
  },
  text: {
    color: COLORS.primary500
  }
})
