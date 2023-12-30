import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constans/colors';

export default function Button({onPress, children}) {
  return (
    <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: COLORS.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowRadius: 2,
    borderRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15
  },
  pressed: {
    opacity: .7
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.primary50
  }
})