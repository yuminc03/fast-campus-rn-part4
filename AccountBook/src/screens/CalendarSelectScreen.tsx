import React from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {convertToDateString} from '../utils/DetailUtils';

const today = new Date();
today.setHours(0);
today.setMinutes(0);

export const CalendarSelectScreen: React.FC = () => {
  const navigation = useRootNavigation<'CalendarSelect'>();
  const routes = useRootRoute<'CalendarSelect'>();

  console.log(convertToDateString(today.getTime()));

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="날짜 선택" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>
      <Calendar
        onDayPress={day => {
          routes.params.onSelectDay(day.timestamp);
          navigation.goBack();
        }}
        maxDate={convertToDateString(today.getTime())}
      />
    </View>
  );
};
