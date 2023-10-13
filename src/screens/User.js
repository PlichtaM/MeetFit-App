import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function User() {
  const navigation = useNavigation();

  return (
    <View>
      <Button title="Statystyki" onPress={() => navigation.navigate('Statystyki')} />
      <Button title="Moje Wydarzenia" onPress={() => navigation.navigate('Moje Wydarzenia')} />
    </View>
  );
}

export default User;
