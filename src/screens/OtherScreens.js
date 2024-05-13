import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function OtherScreens() {
const navigation = useNavigation()
 
    return (
      <View style={{ margin: 50,flex:1, justifyContent: 'space-evenly' }}>
        <Button title="Ekran Ładowania" onPress={() => navigation.navigate('Loading')} />
        <Button title="Ekran Rejestracji" onPress={() => navigation.navigate('RegisterScreen')} />
        <Button title="Ekran Logowania" onPress={() => navigation.navigate('LoginScreen')} />
        <Button title="Ekran Przywracania" onPress={() => navigation.navigate('ForgotPasswordScreen')} />
        <Button title="Ekran Zmiany Hasła" onPress={() => navigation.navigate('ChangePasswordScreen')} />
        <Button title="Ekran Pomyślnej Zmiany Hasła" onPress={() => navigation.navigate('CorrectChangedPasswordScreen')} />
        <Button title="Ekran Zweryfikowanego Konta" onPress={() => navigation.navigate('VerifiedScreen')} />
        <Button title="Ekran ConfirmMail" onPress={() => navigation.navigate('ConfirmMail')} />
      </View>
    );
  
}

export default OtherScreens;
