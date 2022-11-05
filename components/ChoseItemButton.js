import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function ChoseItemButton({ title, onPress, color }) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: "90%",
    borderRadius: 30,
    marginVertical: 8,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 30,
    fontWeight: "bold",
    color: "#23297a",
  },
});
