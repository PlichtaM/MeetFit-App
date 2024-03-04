import React from 'react';
import { View } from 'react-native'
import { AppProvider } from './AppContext';

import Nav from './src/components/Nav';

export default function App() {
  return (
    <AppProvider>
      <View style={{ flex: 1}}>
       <Nav/>
      </View>
    </AppProvider>
  );
}
