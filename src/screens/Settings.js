import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Settings() {
  const navigation = useNavigation();
  return (    
    <View> 
      <Button title="Użytkownik" onPress={() => navigation.navigate('Użytkownik')} />
      <Button title="Ciekawostki" onPress={() => navigation.navigate('Ciekawostki')} />
      <Button title="Ustawienia" onPress={() => navigation.navigate('Ustawienia')} />
      <Button title="Ekran Ładowania" onPress={() => navigation.navigate('Ekran Ładowania')} />
      <Button title="Ekran Rejestracji" onPress={() => navigation.navigate('Ekran Rejestracji')} />
      <Button title="Ekran Logowania" onPress={() => navigation.navigate('Ekran Logowania')} />
      <Button title="Ekran Przywracania" onPress={() => navigation.navigate('Ekran Przywracania')} />
      <Button title="Ekran Zmiany Hasła" onPress={() => navigation.navigate('Ekran Zmiany Hasła')} />
      <Button title="Ekran Pomyślnej Zmiany Hasła" onPress={() => navigation.navigate('Ekran Pomyślnej Zmiany Hasła')} />
      <Button title="Ekran Zweryfikowanego Konta" onPress={() => navigation.navigate('Ekran Zweryfikowanego Konta')} />
    </View>
  );
}

export default Settings;
