import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import getRankingStyles from '../styles/RankingStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAllStepsCount } from '../../services/api';
import LoadingScreen from "./Loading";

const Ranking = ({navigation}) => {
  const { theme, themeStyles } = useTheme();
  const styles = getRankingStyles(themeStyles);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllStepsCount();
        const sortedSteps = response.data.sort((a, b) => b.stepsCount - a.stepsCount);
        setSteps(sortedSteps.map((user, index) => ({
          ...user,
          miejsce: index + 1
        })));
        setLoading(false);
      } catch (error) {
        //console.error('Error fetching steps count:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigation]);

  if (loading) {
    return <LoadingScreen />;
  }

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

    const pictureUrl = (profile) => "https://meetfitapp.pl" + profile;

    return (
      <>
        {index >= 4 && theme === 'light' && (
          <View style={{ width: 359, height: 3, backgroundColor: '#D9D9D9', alignSelf: 'center' }} />
        )}
        <View style={[styles.userItem, { backgroundColor }]}>
          <Text style={[styles.rank, { color: textColor }]}>{item.miejsce}</Text>
          <Image source={{ uri: pictureUrl(item.profilePictureUrl) }} style={styles.avatar} />
          <Text style={[styles.userName, { color: textColor }]}>{`${item.userName}`}</Text>
          <Text style={[styles.steps, { color: textColor }]}>{`${item.stepsCount}`}</Text>
          <MaterialCommunityIcons name="foot-print" size={24} color={textColor} />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={steps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUserItem}
      />
    </View>
  );
};

export default Ranking;
