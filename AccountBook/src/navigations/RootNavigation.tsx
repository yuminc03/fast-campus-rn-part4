import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {MainScreen} from '../screens/MainScreen';
import {AddUpdateScreen} from '../screens/AddUpdateScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {MonthlyScreen} from '../screens/MonthlyScreen';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {CalendarSelectScreen} from '../screens/CalendarSelectScreen';

type ScreenParams = {
  Add: undefined;
  Main: undefined;
  Update: {item: AccountBookHistory};
  Detail: {item: AccountBookHistory};
  MonthlyAverage: undefined;
  CalendarSelect: {onSelectDay: (date: number) => void};
};

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'containedModal'}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddUpdateScreen} />
      <Stack.Screen name="Update" component={AddUpdateScreen} />
      <Stack.Screen name="MonthlyAverage" component={MonthlyScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="CalendarSelect" component={CalendarSelectScreen} />
    </Stack.Navigator>
  );
};

// RouteName은 ScreenParams의 key들만 받을 수 있음
export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();
