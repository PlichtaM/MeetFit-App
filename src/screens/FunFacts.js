import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView  } from 'react-native';
import FunFactsData from '../components/FunFacts.json'; // Import Ciekawostek
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
    <ScrollView  style={FunFactsStyles.container}>
      {FunFactsData.map((fact, index) => (
        <View key={index}>
          <View style={FunFactsStyles.factBox}>
            <View style={FunFactsStyles.titleContainer}>
              <Text style={FunFactsStyles.title}>{fact.title}</Text>
            </View>
            <View style={FunFactsStyles.factContainer}>
              <Image source={{ uri: fact.icon }} style={FunFactsStyles.icon} />
              <Text style={FunFactsStyles.text}>
                {expanded[index] ? fact.text : fact.text.substring(0, 50) + '...'}
              </Text>
              <TouchableOpacity onPress={() => handleReadMore(index)} style={FunFactsStyles.button}>
                <Text style={FunFactsStyles.buttonText}>
                  {expanded[index] ? 'Zwiń' : 'Czytaj więcej'}
                </Text>
              </TouchableOpacity>
            </View>
            {index < FunFactsData.length - 1 && <View style={FunFactsStyles.line} />}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FunFacts;
