import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  RootStackNavigation,
  TypeRootStackNavigationParams,
} from './src/navigation/RootStackNavigation';
import {Provider} from 'react-redux';
import store from './src/store';

GoogleSignin.configure({
  webClientId:
    '863715169235-o5388ue1kubmeru0gkqfvdvsoi4lo1fm.apps.googleusercontent.com',
});

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer<TypeRootStackNavigationParams>
            linking={{
              prefixes: ['mydog://'],
              config: {
                screens: {
                  HistoryList: '/history',
                  Main: {
                    path: '/',
                    screens: {
                      Main: '/main',
                      My: '/my',
                    },
                  },
                },
              },
            }}>
            <RootStackNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
