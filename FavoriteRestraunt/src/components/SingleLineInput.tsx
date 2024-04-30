import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

export const SingleLineInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSubmitEditing?: () => void;
  fontSize?: number;
}> = props => {
  const [, setFocused] = useState(false);

  return (
    <View
      style={{
        alignSelf: 'stretch',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'gray',
      }}>
      <TextInput
        autoCorrect={false}
        autoCapitalize={'none'}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={{fontSize: props.fontSize ?? 20}}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
}