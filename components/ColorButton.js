import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function ColorButton({ backgorundColor }) {
  const [isColorSelected, setIsColorSelected] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[styles.container, { backgroundColor: backgorundColor }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
  },
});
