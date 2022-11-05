import {
  StyleSheet,
  Text,
  View,
  FlatList,
  InteractionManager,
} from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";

import ChoseItemScreen from "./screens/ChoseItemScreen";
import FavotiesScreen from "./screens/FavotiesScreen";
import LottiAnimation from "./screens/LottiAnimation";
import store from "./redux-store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function App() {
  const Drawer = createDrawerNavigator();
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#ffecef" },
              headerTintColor: "#23297a",
              // drawerContentStyle: { color: "#23297a" },
              drawerStyle: { backgroundColor: "#ffecef" },
              drawerActiveTintColor: "#23297a",
              drawerInactiveTintColor: "#23297a",
              // drawerActiveBackgroundColor: "#EFDECD",
            }}
          >
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="ChoseItemScreen" component={ChoseItemScreen} />

            <Drawer.Screen name="FavotiesScreen" component={FavotiesScreen} />
            <Drawer.Screen name="LottiAnimation" component={LottiAnimation} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
