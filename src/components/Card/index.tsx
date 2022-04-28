import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { Props } from '../../@types/navigation'

export function Card({ data, onPress }: Props) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  function togglePasswordIsVisible() {
    setPasswordIsVisible(prevState => !prevState);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePasswordIsVisible}>
        <MaterialIcons
          name={passwordIsVisible ? "visibility" : "visibility-off"}
          size={22}
          color="#888D97"
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {data.name}
          </Text>

          {
            passwordIsVisible
              ?
              <Text style={styles.password}>
                {data.password}
              </Text>
              :
              <Text style={styles.email}>
                {data.user}
              </Text>
          }
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <MaterialIcons
          name="delete"
          size={22}
          color="#888D97"
        />
      </TouchableOpacity>
    </View>
  );
}