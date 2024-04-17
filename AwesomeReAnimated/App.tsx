import React from 'react';
import { SafeAreaView, Text, View, Pressable } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const App = () => {
  const value = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    value.value = event.contentOffset.y;
  });
  const floatingButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(value.value, [50, 100], [50, -100], {
          extrapolateRight: Extrapolation.CLAMP,
        })},
      ],
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.FlatList
        style={{ flex: 1 }}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        onScroll={onScroll}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                height: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>{item}</Text>
            </View>
          );
        }}
      />
      <Pressable
        style={{
          position: 'absolute',
          right: 24,
          bottom: 24,
        }}
      >
        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
              backgroundColor: 'red',
            },
            floatingButtonStyle,
          ]}
        >
          <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
};

export default App;
