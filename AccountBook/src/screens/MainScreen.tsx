import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import {Header} from '../components/Header/Header';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {AccountHistoryListItemView} from '../components/AccountHistoryListItemView';
import {useRootNavigation} from '../navigations/RootNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../components/Button';
import {Icon} from '../components/Icons';

const now = new Date().getTime();

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();

  useEffect(() => {
    SQLite.openDatabase(
      {
        name: 'account_history.db',
        createFromLocation: '~www/account_history.db',
        location: 'default',
      },
      () => {
        console.log('openDatabase success');
      },
      () => {
        console.log('openDatabase failed');
      },
    );
  }, []);

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

      <FlatList
        data={list}
        renderItem={({item}) => {
          return (
            <AccountHistoryListItemView
              item={item}
              onPressItem={clicked => {
                navigation.push('Detail', {item: clicked});
              }}
            />
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12 + safeAreaInset.bottom,
        }}>
        <Button
          onPress={() => {
            navigation.push('Add');
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="add" size={30} color="white" />
          </View>
        </Button>
      </View>
    </View>
  );
};
