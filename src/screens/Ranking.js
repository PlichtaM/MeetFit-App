import React from 'react';
import { View, Text, Image, FlatList, RankingStylesheet } from 'react-native';
import RankingStyles from "../styles/RankingStyles"
import users from '../tempAPI/userlist.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()

const Ranking = () => {
  const renderUserItem = ({ item }) => {
    let backgroundColor, textColor;
  
    switch (item.miejsce) {
      case 1:
        backgroundColor = '#FFA438';
        textColor = colors.text2;
        break;
      case 2:
        backgroundColor = '#C3C3C3';
        textColor = colors.text2;
        break;
      case 3:
        backgroundColor = '#BE5B00';
        textColor = colors.text2;
        break;
      default:
        backgroundColor = 'transparent';
        textColor = colors.text ;
    }
  
    return (
      <View style={{ ...RankingStyles.userItem, backgroundColor }}>
        <Text style={{ ...RankingStyles.rank, color: textColor }}>{item.miejsce}</Text>
        <Image source={{ uri: item.zdjecie_profilowe }} style={RankingStyles.avatar} />
        <Text style={{ ...RankingStyles.userName, color: textColor }}>{`${item.imie} ${item.Nazwisko}`}</Text>
        <Text style={{ ...RankingStyles.steps, color: textColor }}>{`${item.liczba_kroków}`}</Text>
        <MaterialCommunityIcons name="foot-print" size={24} color={colors.secondary} style={RankingStyles.footstepsIcon} />
      </View>
    );
  };  

  const sortedUsers = [...users].sort((a, b) => b.liczba_kroków - a.liczba_kroków);
  const rankedUsers = sortedUsers.map((user, index) => ({ ...user, miejsce: index + 1 }));

  return (
    <View style={RankingStyles.container}>
      <FlatList
        data={rankedUsers}
        keyExtractor={(item) => item.imie}
        renderItem={renderUserItem}
      />
    </View>
  );
};


export default Ranking;
