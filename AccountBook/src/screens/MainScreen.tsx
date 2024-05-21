import React, {useState} from 'react';
import {View} from 'react-native';

import {Header} from '../components/Header/Header';
import {AccountBookHistory} from '../data/AccountBookHistory';

const now = new Date().getTime();

export const MainScreen: React.FC = () => {
  const [list] = useState<AccountBookHistory[]>([
    {
      id: 0,
      type: '사용',
      price: 10000,
      comment: 'TEST_01',
      createdAt: now,
      updatedAt: now,
      photoUrl: null,
    },
    {
      id: 1,
      type: '수입',
      price: 10000,
      comment: 'TEST_02',
      createdAt: now,
      updatedAt: now,
      photoUrl:
        'https://docs.expo.dev/static/images/tutorial/background-image.png',
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main SCREEN" />
      </Header>
    </View>
  );
};
