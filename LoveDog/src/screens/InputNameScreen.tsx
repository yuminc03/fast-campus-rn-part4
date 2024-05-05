import React, {useCallback, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import database from '@react-native-firebase/database';

import {Header} from '../components/Header/Header';
import {Button} from '../components/Button';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import {SingleLineInput} from '../components/SingleLineInput';
import {RemoteImage} from '../components/RemoteImage';
import {Icon} from '../components/Icons';
import {useRootNavigation} from '../navigation/RootStackNavigation';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation';
import {uploadFile} from '../utils/FileUtils';

export const InputNameScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Signup'>();
  const navigation = useSignupNavigation<'InputName'>();
  const routes = useSignupRoute<'InputName'>();
  const safeArea = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheet>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{uri: string} | null>(
    null,
  );
  const [profileImage] = useState(routes.params.preInput.profileImage);
  const [inputName, setInputName] = useState(routes.params.preInput.name);

  const isValid = useMemo(() => {
    return true;
  }, []);

  const onPressProfileImage = useCallback(async () => {
    actionSheetRef.current?.show();
  }, []);

  const onPressSubmit = useCallback(async () => {
    const getPhotoUrl = async () => {
      if (selectedPhoto) {
        return await uploadFile(selectedPhoto.uri);
      }

      return profileImage;
    };
    setIsLoading(true);
    const photoUrl = await getPhotoUrl();
    const currentTime = new Date();
    const referenece = database().ref(`member/${routes.params.uid}`);
    await referenece.set({
      name: inputName,
      email: routes.params.inputEmail,
      profile: photoUrl,
      regeditAt: currentTime.toISOString(),
      lastLoginAt: currentTime.toISOString(),
    });
    rootNavigation.reset({
      routes: [{name: 'Main'}],
    });
    setIsLoading(false);
  }, [
    inputName,
    profileImage,
    rootNavigation,
    routes.params.inputEmail,
    routes.params.uid,
    selectedPhoto,
  ]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Icon iconName="arrow-back" onPress={navigation.goBack} />
          <Header.Title title="InputNameScreen" />
        </Header.Group>
      </Header>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <Button onPress={onPressProfileImage}>
          <View style={{width: 100, height: 100}}>
            {profileImage !== '' ? (
              <>
                <RemoteImage
                  width={100}
                  height={100}
                  url={
                    selectedPhoto !== null ? selectedPhoto.uri : profileImage
                  }
                  style={{borderRadius: 50}}
                />
                <View style={{position: 'absolute', right: 0, bottom: 0}}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: 'gray',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="add" size={16} color="white" />
                  </View>
                </View>
              </>
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="add" size={32} color="black" />
              </View>
            )}
          </View>
        </Button>
        <Spacer space={24} />
        <SingleLineInput
          value={inputName}
          onChangeText={setInputName}
          placeholder="이름을 입력해주세요"
          onSubmitEditing={onPressSubmit}
        />
      </View>

      <Button onPress={onPressSubmit}>
        <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
          <Spacer space={16} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {isLoading ? (
              <ActivityIndicator size={20} color={'white'} />
            ) : (
              <Typography fontSize={20} color="white">
                회원가입
              </Typography>
            )}
          </View>
          <Spacer space={safeArea.bottom + 12} />
        </View>
      </Button>
      <ActionSheet
        ref={actionSheetRef}
        options={['사진 촬영하여 선택', '갤러리에서 선택', '취소']}
        cancelButtonIndex={2}
        onPress={async index => {
          if (index === 0) {
            rootNavigation.push('TakePhoto', {
              onTakePhoto: uri => {
                console.log(uri);
                setSelectedPhoto({uri: uri});
              },
            });
          }
          if (index === 1) {
            const photoResult = await ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            });
            setSelectedPhoto({uri: photoResult.path});
          }
        }}
      />
    </View>
  );
};
