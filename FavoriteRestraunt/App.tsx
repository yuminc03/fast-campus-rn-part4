import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Icon} from './src/components/Icons';

export const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Icon name="arrow-back" size={24} color="blue" />
      </View>
    </SafeAreaView>
  );
};

export default App;
