import React from 'react';
import {ScrollView, View} from 'react-native';

import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import {convertToDateString} from '../utils/DetailUtils';
import {Icon} from '../components/Icons';
import {RemoteImage} from '../components/RemoteImage';
import {Button} from '../components/Button';

export const DetailScreen: React.FC = () => {
  const navigation = useRootNavigation<'Detail'>();
  const routes = useRootRoute<'Detail'>();

  const {item} = routes.params;

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail SCREEN" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 32, paddingHorizontal: 24}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: item.type === '사용' ? 'black' : 'white',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              }}>
              <Typography
                fontSize={16}
                color={item.type === '사용' ? 'white' : 'black'}>
                사용
              </Typography>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: item.type === '수입' ? 'black' : 'white',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
              }}>
              <Typography
                fontSize={16}
                color={item.type === '수입' ? 'white' : 'black'}>
                수입
              </Typography>
            </View>
          </View>
        </View>

        <Spacer space={20} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 4,
              }}>
              <Typography
                fontSize={16}
                color={item.date === 0 ? 'lightgray' : 'gray'}>
                {item.price.toString() + '원'}
              </Typography>
            </View>

            <Spacer space={24} />

            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 4,
              }}>
              <Typography
                fontSize={16}
                color={item.date === 0 ? 'lightgray' : 'gray'}>
                {convertToDateString(item.date)}
              </Typography>
            </View>
          </View>

          <View style={{marginLeft: 24}}>
            {item.photoUrl ? (
              <RemoteImage
                url={item.photoUrl}
                width={100}
                height={100}
                style={{borderRadius: 12}}
              />
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  backgroundColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="add" size={24} color="gray" />
              </View>
            )}
          </View>
        </View>

        <Spacer space={12} />
        <View
          style={{
            alignSelf: 'stretch',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'gray',
            height: 100,
          }}>
          <Typography fontSize={20}>{item.comment}</Typography>
        </View>

        <Spacer space={64} />

        <Button onPress={onPressSave}>
          <View
            style={{
              paddingVertical: 12,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 9,
            }}>
            <Typography color="white" fontSize={16}>
              {'수정하기'}
            </Typography>
          </View>
        </Button>
      </ScrollView>
    </View>
  );
};
