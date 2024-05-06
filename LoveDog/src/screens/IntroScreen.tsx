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
import {useDispatch} from 'react-redux';
import {setUser} from '../actions/user';

export const IntroScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Intro'>();
  const dispatch = useDispatch();
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
    const reference = database().ref(`member/${uid}`);

    const lastLoginUserInfo = await reference
      .once('value')
      .then(snapshot => snapshot.val());
    const lastLoginDate = new Date(lastLoginUserInfo.lastLoginAt);
    const isLastLoginBeforeOneDay =
      currentTime.getTime() - lastLoginDate.getTime() >= 1000 * 60 * 60 * 24;

    if (isLastLoginBeforeOneDay) {
      await reference.update({
        availableLikeCount: 5,
        lastLoginAt: currentTime.toISOString(),
      });
    } else {
      await reference.update({
        lastLoginAt: currentTime.toISOString(),
      });
    }

    // 자동 로그인 하는 경우
    const userInfo = await reference
      .once('value')
      .then(snapshot => snapshot.val());
    dispatch(
      setUser({
        uid: uid,
        userEmail: userInfo.email,
        userName: userInfo.name,
        profileImage: userInfo.profile,
        availableLikeCount: userInfo.availableLikeCount ?? 5,
      }),
    );

    rootNavigation.reset({
      routes: [{name: 'Main'}],
    });
  }, [dispatch, rootNavigation]);

  const onPressGoogleSignin = useCallback(async () => {
    const isSignIn = await GoogleSignin.isSignedIn();
    if (isSignIn) {
      await GoogleSignin.signOut();
    }

    const result = await GoogleSignin.signIn({});
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);

    const uid = authResult.user.uid;

    const currentTime = new Date();
    const reference = database().ref(`member/${uid}`);
    const user = await reference.once('value').then(snapshot => snapshot.val());

    if (user !== null) {
      const lastLoginDate = new Date(user.lastLoginAt);
      const isLastLoginBeforeOneDay =
        currentTime.getTime() - lastLoginDate.getTime() >= 1000 * 60 * 60 * 24;

      if (isLastLoginBeforeOneDay) {
        await reference.update({
          availableLikeCount: 5,
          lastLoginAt: currentTime.toISOString(),
        });
      } else {
        await reference.update({
          lastLoginAt: currentTime.toISOString(),
        });
      }

      // 자동 로그인 하는 경우
      const userInfo = await reference
        .once('value')
        .then(snapshot => snapshot.val());
      dispatch(
        setUser({
          uid: uid,
          userEmail: userInfo.email,
          userName: userInfo.name,
          profileImage: userInfo.profile,
          availableLikeCount: userInfo.availableLikeCount ?? 5,
        }),
      );

      rootNavigation.reset({
        routes: [{name: 'Main'}],
      });

      return;
    }

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
  }, [dispatch, rootNavigation]);

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
