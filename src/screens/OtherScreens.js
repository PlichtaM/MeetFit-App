import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function OtherScreens() {
  const navigation = useNavigation();
  return (    
    <View style={{margin:50}}> 
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

export default OtherScreens;
