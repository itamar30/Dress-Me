import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import ChoseItemButton from "../components/ChoseItemButton";

export default function HomeScreen() {
  useEffect(() => {
    welcomeAnimation.current?.reset();
    welcomeAnimation.current?.play();
    storeAnimation.current?.play();
    storeAnimation.current?.play();
    particleAnimation.current?.play();
    particleAnimation.current?.play();
  }, []);

  const welcomeAnimation = useRef(null);
  const storeAnimation = useRef(null);
  const particleAnimation = useRef(null);

  return (
    <View style={styles.container}>
      <View style={[styles.animationContainer, { top: -10 }]}>
        <LottieView
          autoPlay
          ref={welcomeAnimation}
          source={require("../assets/welcome1.json")}
        />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          autoPlay
          ref={particleAnimation}
          source={require("../assets/backgroundParticle.json")}
          style={{ height: "80%", width: "80%", paddingTop: 40 }}
        />
      </View>
      <View style={[styles.animationContainer, { left: 150, bottom: 0 }]}>
        <LottieView
          autoPlay
          ref={storeAnimation}
          source={require("../assets/store.json")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffecef",
  },
  animationContainer: {
    height: 150,
    width: 300,
    position: "absolute",
  },
  title: {
    fontSize: 30,
  },
});
