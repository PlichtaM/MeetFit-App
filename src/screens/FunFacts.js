import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import FunFactsStyles from '../styles/FunFactsStyles';
import { getFunFacts } from '../../services/api';

function FunFacts({ navigation }) {
  const [funFacts, setFunFacts] = useState([]);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ciekawostki",
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerShadowVisible: false,
    });
  }, []);


  useEffect(() => {
    const fetchFunFacts = async () => {
        const response = await getFunFacts();
        const sortedFunFacts = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFunFacts(sortedFunFacts);
    };

    fetchFunFacts();
  }, []);

  const [expanded, setExpanded] = useState({});

  const handleReadMore = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <ScrollView style={FunFactsStyles.container}>
      {funFacts.map((fact, index) => (
        <View key={index} style={{marginBottom: 20}}>
          <View style={FunFactsStyles.factBox}>
            <View style={FunFactsStyles.titleContainer}>
              <Text style={FunFactsStyles.title}>{fact.name}</Text>
            </View>
            <View style={{ ...FunFactsStyles.factContainer, height: expanded[index] ? 'auto' : 180 }}>
              <Image source={{ uri: fact.funFactPictureUrl }} style={FunFactsStyles.icon} />
              <View style={FunFactsStyles.textContainer}>
                <Text style={FunFactsStyles.text}>
                  {expanded[index] ? fact.description : fact.description.substring(0, 100) + '...'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleReadMore(index)} style={FunFactsStyles.button}>
              <Text style={FunFactsStyles.buttonText}>{expanded[index] ? 'Zwiń' : 'Czytaj więcej'}</Text>
            </TouchableOpacity>
            {index < funFacts.length - 1 && <View style={FunFactsStyles.line} />}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FunFacts;
