import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {RootStackNavigation} from './src/navigation/RootStackNavigation';

GoogleSignin.configure({
  webClientId:
    '863715169235-o5388ue1kubmeru0gkqfvdvsoi4lo1fm.apps.googleusercontent.com',
});

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
