import React, {useEffect, useState} from 'react';
import {FlatList, View, useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImageView from 'react-native-image-viewing';

import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootStackNavigation';
import {TypeUserDispatch, getUserLikedHistory} from '../actions/user';
import {TypeRootReducer} from '../store';
import {TypeDog} from '../data/TypeDog';
import {Button} from '../components/Button';
import {RemoteImage} from '../components/RemoteImage';

export const HistoryListScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'HistoryList'>();
  const {width} = useWindowDimensions();

  const dispatch = useDispatch<TypeUserDispatch>();
  const likedList = useSelector<TypeRootReducer, TypeDog[]>(
    state => state.user.history,
  );
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    dispatch(getUserLikedHistory());
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="HistoryListScreen" />
        <Header.Icon iconName="close" onPress={rootNavigation.goBack} />
      </Header>
      <FlatList<TypeDog>
        data={likedList}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <Button
              onPress={() => {
                setVisible(true);
                setSelectedIndex(index);
              }}>
              <RemoteImage
                width={width * 0.5}
                height={width * 0.5}
                url={item.photoUrl}
              />
            </Button>
          );
        }}
      />
      <ImageView
        images={likedList.map(item => ({uri: item.photoUrl}))}
        imageIndex={selectedIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};
