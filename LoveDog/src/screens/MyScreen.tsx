import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {TypeRootReducer} from '../store';

import {Header} from '../components/Header/Header';
import {Button} from '../components/Button';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootStackNavigation';
import {Icon} from '../components/Icons';
import {TypeUser} from '../data/TypeUser';
import {RemoteImage} from '../components/RemoteImage';
import {Spacer} from '../components/Spacer';

export const MyScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Main'>();
  const userInfo = useSelector<TypeRootReducer, TypeUser | null>(
    state => state.user.user,
  );

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MyScreen" />
      </Header>

      <View style={{flex: 1}}>
        <Button
          onPress={() => {
            rootNavigation.push('HistoryList');
          }}>
          <View
            style={{
              paddingVertical: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={16}>히스토리 화면으로 이동</Typography>
            <Icon name="chevron-forward" size={16} color="gray" />
            <RemoteImage
              url={userInfo.profileImage}
              width={100}
              height={100}
              style={{borderRadius: 50}}
            />

            <Spacer space={20} />
            <Typography>{userInfo.userName}</Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};
