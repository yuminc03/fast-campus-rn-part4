import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {Header} from '../components/Header/Header';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {AccountHistoryListItemView} from '../components/AccountHistoryListItemView';
import {useRootNavigation} from '../navigations/RootNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../components/Button';
import {Icon} from '../components/Icons';
import {useAccountBookHistoryItem} from '../hooks/useAccountBookHistoryItem';

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const {getList} = useAccountBookHistoryItem();

  const [list, setList] = useState<AccountBookHistory[]>([]);

  const fetchList = useCallback(async () => {
    const data = await getList();
    setList(data);
  }, [getList]);

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [fetchList]),
  );

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
