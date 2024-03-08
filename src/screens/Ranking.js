import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import getRankingStyles from '../styles/RankingStyles'; // Upewnij się, że RankingStyles.js jest funkcją, jak omówiono wcześniej
import users from '../tempAPI/userlist.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Ranking = () => {
  const { theme, themeStyles } = useTheme();
  const styles = getRankingStyles(themeStyles);

  // Posortuj użytkowników według liczby kroków w kolejności malejącej
  // Następnie przypisz miejsca w rankingu
  const rankedUsers = [...users] // Kopia, żeby nie modyfikować oryginalnej tablicy
    .sort((a, b) => b.liczba_kroków - a.liczba_kroków)
    .map((user, index) => ({
      ...user,
      miejsce: index + 1
    }));

  const renderUserItem = ({ item, index }) => {
    let backgroundColor, textColor;

    switch (item.miejsce) {
      case 1:
        backgroundColor = '#FFA438';
        textColor = themeStyles.text2;
        break;
      case 2:
        backgroundColor = '#C3C3C3';
        textColor = themeStyles.text2;
        break;
      case 3:
        backgroundColor = '#BE5B00';
        textColor = themeStyles.text2;
        break;
      default:
        backgroundColor = 'transparent';
        textColor = themeStyles.text;
    }

    return (
      <>
        {index >= 4 && theme === 'dark' && (
          <View style={{ width: 359, height: 3, backgroundColor: 'white', alignSelf: 'center' }} />
        )}
        {index >= 4 && theme === 'light' && (
          <View style={{ width: 359, height: 3, backgroundColor: '#D9D9D9', alignSelf: 'center' }} />
        )}
        <View style={[styles.userItem, { backgroundColor }]}>
          <Text style={[styles.rank, { color: textColor }]}>{item.miejsce}</Text>
          <Image source={{ uri: item.zdjecie_profilowe }} style={styles.avatar} />
          <Text style={[styles.userName, { color: textColor }]}>{`${item.imie} ${item.Nazwisko}`}</Text>
          <Text style={[styles.steps, { color: textColor }]}>{`${item.liczba_kroków}`}</Text>
          <MaterialCommunityIcons name="foot-print" size={24} color={textColor} />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rankedUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUserItem}
      />
    </View>
  );
};

export default Ranking;
