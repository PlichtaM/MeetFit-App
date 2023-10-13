import React from 'react';
import { View, Button, Text } from 'react-native';

function Mapa({ navigation }) {
  return (
    <View>
      <Button title="Użytkownik" onPress={() => navigation.navigate('Użytkownik')} />
      <Button title="Ciekawostki" onPress={() => navigation.navigate('Ciekawostki')} />
      <Button title="Ustawienia" onPress={() => navigation.navigate('Ustawienia')} />
    </View>
  );
}

export default Mapa;
