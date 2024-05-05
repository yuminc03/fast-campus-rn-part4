import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {RootStackNavigation} from './src/navigation/RootStackNavigation';
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
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
