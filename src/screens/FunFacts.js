import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import FunFactsData from '../tempAPI/FunFacts.json';
import FunFactsStyles from '../styles/FunFactsStyles';

const FunFacts = () => {
  const [expanded, setExpanded] = useState({});

  const handleReadMore = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <ScrollView style={FunFactsStyles.container}>
      {FunFactsData.map((fact, index) => (
        <View key={index}>
          <View style={FunFactsStyles.factBox}>
            <View style={FunFactsStyles.titleContainer}>
              <Text style={FunFactsStyles.title}>{fact.title}</Text>
            </View>
            <View style={{ ...FunFactsStyles.factContainer, height: expanded[index] ? 'auto' : 180 }}>
              <Image source={{ uri: fact.icon }} style={FunFactsStyles.icon} />
              <View style={FunFactsStyles.textContainer}>
                <Text style={FunFactsStyles.text}>
                  {expanded[index] ? fact.text : fact.text.substring(0, 100) + '...'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleReadMore(index)} style={FunFactsStyles.button}>
              <Text style={FunFactsStyles.buttonText}>{expanded[index] ? 'Zwiń' : 'Czytaj więcej'}</Text>
            </TouchableOpacity>
            {index < FunFactsData.length - 1 && <View style={FunFactsStyles.line} />}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FunFacts;
