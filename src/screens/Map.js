import React from 'react';
import { View, Button, Text } from 'react-native';

function Mapa({ navigation }) {
  return (
    <View>
      <Button title="Użytkownik" onPress={() => navigation.navigate('Użytkownik')} />
      <Button title="Ciekawostki" onPress={() => navigation.navigate('Ciekawostki')} />
      <Button title="Ustawienia" onPress={() => navigation.navigate('Ustawienia')} />
      <Button title="Ekran Ładowania" onPress={() => navigation.navigate('Ekran Ładowania')} />
      <Button title="Ekran Rejestracji" onPress={() => navigation.navigate('Ekran Rejestracji')} />
      <Button title="Ekran Logowania" onPress={() => navigation.navigate('Ekran Logowania')} />
      <Button title="Ekran Przywracania" onPress={() => navigation.navigate('Ekran Przywracania')} />
    </View>
  );
}

export default Mapa;
