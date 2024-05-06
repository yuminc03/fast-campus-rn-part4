import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {IntroScreen} from '../screens/IntroScreen';
import {SignupNavigation, TypeSignupNavigation} from './SignupNavigation';
import {BottomTabNavigation} from './BottomTabNavigation';
import {HistoryListScreen} from '../screens/HistoryListScreen';
import {TakePhotoScreen} from '../screens/TakePhotoScreen';
import {TypeRootReducer} from '../store';

export type TypeRootStackNavigationParams = {
  Intro: undefined;
  Signup: NavigatorScreenParams<TypeSignupNavigation>;
  Main: undefined;
  HistoryList: undefined;
  TakePhoto: {onTakePhoto: (uri: string) => void};
};
const Stack = createNativeStackNavigator();

export const RootStackNavigation: React.FC = () => {
  const isSignIn = useSelector<TypeRootReducer, boolean>(
    state => state.user.user !== null,
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      {!isSignIn && <Stack.Screen name="Signup" component={SignupNavigation} />}
      {isSignIn && (
        <>
          <Stack.Screen name="Main" component={BottomTabNavigation} />
          <Stack.Screen name="HistoryList" component={HistoryListScreen} />
        </>
      )}
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <
  RouteName extends keyof TypeRootStackNavigationParams,
>() =>
  useNavigation<
    NativeStackNavigationProp<TypeRootStackNavigationParams, RouteName>
  >();

export const useRootRoute = <
  RouteName extends keyof TypeRootStackNavigationParams,
>() => useRoute<RouteProp<TypeRootStackNavigationParams, RouteName>>();
