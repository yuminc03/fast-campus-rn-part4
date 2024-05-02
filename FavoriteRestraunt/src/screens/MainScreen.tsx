import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {Header} from '../components/Header/Header';
import Geolocation from '@react-native-community/geolocation';

export const MainScreen: React.FC = () => {
  const [currentRegion, setCrurentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.560214,
    longitude: 126.9775521,
  });

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      setCrurentRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MAIN" />
      </Header>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <Marker
        coordinate={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
        }}
      />
    </View>
  );
};
