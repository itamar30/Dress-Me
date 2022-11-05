import React, { useRef, useEffect, useState, ScrollView } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useIsFocused } from "@react-navigation/native";
import { selectShirt } from "../features/shirt/shirtSlice";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

export default function LottiAnimation() {
  const isFocused = useIsFocused();
  let ids = useSelector(selectShirt);
  const [setArr, setSetArr] = useState([]);
  const [shirtLen, setShirtLen] = useState(0);
  const [shoesLen, setShoesLen] = useState(0);
  const [pantsLen, setPantsLen] = useState(0);

  const baseURL =
    "https://run.mocky.io/v3/e290e152-3f8d-432e-9150-0ce9520c229f?mocky-delay=600%20ms";

  const getAllObjects = () => {
    axios.get(baseURL).then((response) => {
      setSetArr(response.data.data);
      setShirtLen(
        setArr.filter((item) => ids.includes(item.id) && item.type == "shirt")
          .length
      );
      setShoesLen(
        setArr.filter((item) => ids.includes(item.id) && item.type == "shoes")
          .length
      );
      setPantsLen(
        setArr.filter((item) => ids.includes(item.id) && item.type == "pants")
          .length
      );
    });
  };

  useEffect(() => {
    animation.current?.reset();
    animation.current?.play();
    getAllObjects();
    console.log(" i am ids" + ids);
  }, [ids]);

  const animationArr = [
    require("../assets/particle.json"),
    require("../assets/particle1.json"),
    require("../assets/particle2.json"),
    require("../assets/particle3.json"),
    require("../assets/particle4.json"),
    require("../assets/particle5.json"),
    require("../assets/particle6.json"),
  ];
  const animation = useRef(null);

  const rand = (items) => {
    return items[(items.length * Math.random()) | 0];
  };

  const isSetCompleted =
    shirtLen == shoesLen && shirtLen == pantsLen ? true : false;

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          flex: 1,
        }}
        source={rand(animationArr)}
      />
      <View>
        <Text>num of items selected {ids.length}</Text>
        <Text>num of shirts selected {shirtLen}</Text>
        <Text>num of shoes selected {shoesLen}</Text>
        <Text>num of pants selected {pantsLen}</Text>
        {isSetCompleted && <Text>num of sets completed is {shirtLen}</Text>}
        {!isSetCompleted && (
          <Text>
            num of sets completed is {Math.min(shirtLen, shoesLen, pantsLen)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#ffecef",

    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
