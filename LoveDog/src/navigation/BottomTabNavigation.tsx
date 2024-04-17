import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { MainSceen } from "../screens/MainScreen";
import { MyScreen } from "../screens/MyScreen";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

export type TypeBottomTabNavigation = {
  Main: undefined;
  My: undefined;
};

const BottomTab = createBottomTabNavigator<TypeBottomTabNavigation>();

export const BottomTabNavigation: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name="Main" component={MainSceen}/>
      <BottomTab.Screen name="My" component={MyScreen}/>
    </BottomTab.Navigator>
  );
};

export const useBottomTabNavigation = <
  RouteName extends keyof TypeBottomTabNavigation
>() => useNavigation<BottomTabNavigationProp<TypeBottomTabNavigation, RouteName>>();

export const useBottomTabRoute = <
  RouteName extends keyof TypeBottomTabNavigation
>() => useRoute<RouteProp<TypeBottomTabNavigation, RouteName>>();
