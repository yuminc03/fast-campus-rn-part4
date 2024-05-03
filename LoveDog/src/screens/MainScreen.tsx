import React from 'react';
import {View} from 'react-native';

import {Header} from '../components/Header/Header';

export const MainSceen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MainScreen" />
      </Header>
    </View>
  );
};
