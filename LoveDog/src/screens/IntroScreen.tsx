import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import database from '@react-native-firebase/database';

import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootStackNavigation';

export const IntroScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Intro'>();
  const safeArea = useSafeAreaInsets();
  const [visibleGoogleSigninBtn, setVisibleGoogleSigninBtn] = useState(true);
  const checkUserLoginOnce = useCallback(async () => {
    const isSignin = await GoogleSignin.isSignedIn();

    if (!isSignin) {
      setVisibleGoogleSigninBtn(true);
      return;
    }

    setVisibleGoogleSigninBtn(false);

    const result = await GoogleSignin.signInSilently();
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);
    const uid = authResult.user.uid;

    const currentTime = new Date();
    const referenece = database().ref(`member/${uid}`);
    await referenece.update({
      lastLoginAt: currentTime.toISOString(),
    });
    rootNavigation.reset({
      routes: [{name: 'Main'}],
    });
  }, [rootNavigation]);

  const onPressGoogleSignin = useCallback(async () => {
    const isSignIn = await GoogleSignin.isSignedIn();
    if (isSignIn) {
      await GoogleSignin.signOut();
    }

    const result = await GoogleSignin.signIn({});
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);

    rootNavigation.push('Signup', {
      screen: 'InputEmail',
      params: {
        preInput: {
          email: result.user.email,
          name: result.user.name ?? 'Unknown',
          profileImage: result.user.photo ?? '',
        },
        uid: authResult.user.uid,
      },
    });
  }, [rootNavigation]);

  useEffect(() => {
    checkUserLoginOnce();
  }, [checkUserLoginOnce]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="IntroSceen" />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 32 + safeArea.bottom,
        }}>
        {visibleGoogleSigninBtn && (
          <GoogleSigninButton onPress={onPressGoogleSignin} />
        )}
      </View>
    </View>
  );
};
