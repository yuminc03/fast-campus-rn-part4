import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import {SingleLineInput} from '../components/SingleLineInput';
import {useRootRoute} from '../navigation/RootNavigation';
import {Button} from '../components/Button';

export const AddScreen: React.FC = () => {
  const routes = useRootRoute<'Add'>();
  const [title, setTitle] = useState('');
  const onPressBack = useCallback(() => {}, []);
  const onPressSave = useCallback(() => {}, []);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="ADD" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
      <View style={{flex: 1, paddingTop: 24, paddingHorizontal: 24}}>
        <Typography fontSize={16}>가게명</Typography>
        <Spacer space={8} />
        <SingleLineInput
          value={title}
          placeholder="이름을 입력해 주세요"
          onChangeText={setTitle}
        />
        <Spacer space={24} />

        <Typography fontSize={16}>주소</Typography>
        <Spacer space={8} />
        <Typography fontSize={20}>{routes.params.address}</Typography>

        <Spacer space={24} />
        <Typography fontSize={16}>위치</Typography>
        <Spacer space={8} />
        <MapView
          style={{height: 200}}
          region={{
            latitude: routes.params.latitude,
            longitude: routes.params.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: routes.params.latitude,
              longitude: routes.params.longitude,
            }}
          />
        </MapView>

        <Spacer space={48} />

        <Button onPress={onPressSave}>
          <View
            style={{
              backgroundColor: title === '' ? 'gray' : 'black',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="white">
              저장하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};
