import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import ChoseItemButton from "../components/ChoseItemButton";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ChoseShoewScreen from "./choseItem/ChoseShoewScreen";
import ChoseShirtScreen from "./choseItem/ChoseShirtScreen";
import ChoeSpantScreen from "./choseItem/ChoeSpantScreen";
import ChoseItemHome from "./choseItem/ChoseItemHome";

export default function ChoseItemScreen({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="ChoseItemHome"
      screenOptions={{
        headerStyle: { backgroundColor: "#ffecef" },
        headerTintColor: "#23297a",
      }}
    >
      <Stack.Screen
        name="ChoseItemHome"
        component={ChoseItemHome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChoseShirtScreen"
        component={ChoseShirtScreen}
        options={{ headerTitle: "go back" }}
      />
      <Stack.Screen
        name="ChoseShoewScreen"
        component={ChoseShoewScreen}
        options={{ headerTitle: "go back" }}
      />
      <Stack.Screen
        name="ChoeSpantScreen"
        component={ChoeSpantScreen}
        options={{ headerTitle: "go back" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffecef",

    justifyContent: "center",
    alignItems: "center",
  },
});
