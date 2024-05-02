import React, {useCallback} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import {Button} from '../components/Button';
import {useRootNavigation, useRootRoute} from '../navigation/RootNavigation';

export const DetailScreen: React.FC = () => {
  const navigation = useRootNavigation<'Detail'>();
  const routes = useRootRoute<'Detail'>();

  const onPressKakaoShare = useCallback(() => {

  }, []);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
      <View style={{flex: 1, paddingTop: 24, paddingHorizontal: 24}}>
        <Typography fontSize={16}>가게명</Typography>
        <Spacer space={8} />
        <Typography fontSize={20}>{routes.params.title}</Typography>
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

        <Button onPress={onPressKakaoShare}>
          <View
            style={{
              backgroundColor: 'yellow',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color="black">
              카카오 공유하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};
