import React from 'react';
import { View } from 'react-native'
import { ThemeProvider, useTheme } from './src/components/ThemeContext';

import Nav from './src/components/Nav';

export default function App() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1}}>
       <Nav/>
      </View>
    </ThemeProvider>
  );
}
