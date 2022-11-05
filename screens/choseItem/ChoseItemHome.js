import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ChoseItemButton from "../../components/ChoseItemButton";
export default function ChoseItemHome({ navigation }) {
  return (
    <View style={styles.container}>
      <ChoseItemButton
        title="Select a Shirt"
        color="#CCCCFF"
        onPress={() => navigation.navigate("ChoseShirtScreen")}
      />
      <ChoseItemButton
        title="Select  Shoes"
        color="#ADD8E6"
        onPress={() => navigation.navigate("ChoseShoewScreen")}
      />
      <ChoseItemButton
        title="Select pants"
        color="#9FE2BF"
        onPress={() => navigation.navigate("ChoeSpantScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffecef",
  },
});
