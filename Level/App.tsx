import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {accelerometer} from 'react-native-sensors';

const App = () => {
  const accelermeterValue = useSharedValue({x: 0, y: 0, z: 0});
  const [value, setValue] = useState({x: 0, y: 0, z: 0});
  const leftBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelermeterValue.value.y,
        [-1, 0],
        ['red', 'green'],
      ),
    };
  });
  const rightBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelermeterValue.value.y,
        [0, 1],
        ['green', 'red'],
      ),
    };
  });

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      accelermeterValue.value = {x, y, z};
      setValue({x, y, z});
      console.log({x, y, z});
    });

    return () => subscription.unsubscribe();
  }, [accelermeterValue]);

  return (
    <SafeAreaView>
      <View style={{flex: 1}}>
        <Animated.View style={[{flex: 1}, leftBackground]} />
        <Animated.View style={[{flex: 1}, rightBackground]} />
      </View>
    </SafeAreaView>
  );
};

export default App;
