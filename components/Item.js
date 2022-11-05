import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { addItem, removeItem } from "../features/shirt/shirtSlice";
import {
  addShirtColor,
  addShirtSize,
  removeObj,
} from "../features/shirt/shirtDetails/shirtDetailsSlice";
import { selectShirt } from "../features/shirt/shirtSlice";
import { selectShirtDetails } from "../features/shirt/shirtDetails/shirtDetailsSlice";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Item({
  brand,
  name,
  price,
  isOutLet,
  id,
  colors,
  sizes,
  type,
}) {
  const dispatch = useDispatch();
  const ids = useSelector(selectShirt);
  let shirtDetailsIds = useSelector(selectShirtDetails);
  const navigation = useNavigation();

  const [isArrEmpty, setIsArrEmpty] = useState(false);
  const [mySelectedItems, setMyselectedItmes] = useState([]);

  const [shirtLen, setShirtLen] = useState(0);

  const [shoesLen, setShoesLen] = useState(0);
  const [pantsLen, setPantsLen] = useState(0);

  const baseURL =
    "https://run.mocky.io/v3/e290e152-3f8d-432e-9150-0ce9520c229f?mocky-delay=600%20ms";

  useEffect(() => {
    getShirtsArr();
  }, [isArrEmpty, ids]);

  const getShirtsArr = () => {
    axios.get(baseURL).then((response) => {
      setMyselectedItmes(
        response.data.data.filter((item) => ids.includes(item.id))
      );
      setShirtLen(
        mySelectedItems.filter(
          (item) => ids.includes(item.id) && item.type == "shirt"
        ).length
      );
      setShoesLen(
        mySelectedItems.filter(
          (item) => ids.includes(item.id) && item.type == "shoes"
        ).length
      );
      setPantsLen(
        mySelectedItems.filter(
          (item) => ids.includes(item.id) && item.type == "pants"
        ).length
      );
      setIsArrEmpty(true);
    });
  };

  const checkIfSetIsCompleted = () => {
    setIsArrEmpty((prev) => !prev);

    console.log("i am type");
    console.log(type);

    console.log("shoesLen");
    console.log(shoesLen);
    console.log("shirtsLen");
    console.log(shirtLen);
    console.log("pantsLen");
    console.log(pantsLen);
    if (shoesLen == shirtLen && shoesLen == pantsLen && shoesLen !== 0) {
      navigation.navigate("LottiAnimation");
    } else {
      navigation.navigate("ChoseItemHome");
    }
  };

  const handlePress = () => {
    // item is alredy selected
    if (ids.includes(id)) {
      Alert.alert("remove", "Do u wana remove", [
        {
          text: "Yes",
          onPress: () => {
            dispatch(removeItem(id));
          },
        },
        { text: "No", onPress: () => console.log("not remove") },
      ]);
    } else {
      // item is not alredy selected

      Alert.alert("add", "Do u wana add item to list", [
        {
          text: "Yes",
          onPress: () => {
            dispatch(addItem(id));
            let found = shirtDetailsIds.find((item) => item.id == id);
            if (found != undefined) {
              dispatch(
                addShirtSize({
                  id: found.id,
                  color: "",
                  size: "",
                  type: found.type,
                })
              );
            }
          },
        },
        { text: "No", onPress: () => console.log("no") },
      ]);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ backgroundColor: "#CDEF3", borderColor: "#000080" }}
    >
      <View
        style={[
          styles.innerContainer,
          { backgroundColor: ids.includes(id) ? "#CCCCFF" : "#ffecef" },
        ]}
      >
        <Text>{type}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.price}>{price}</Text>

        {isOutLet && <Foundation name="burst-sale" size={80} color="green" />}

        <View style={{ flexDirection: "row", marginVertical: 4 }}>
          {colors.map((item) => {
            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.pickColor,
                  {
                    backgroundColor: item,
                    borderColor: "black",
                    borderWidth:
                      shirtDetailsIds.find((e) => e.id == id) == undefined
                        ? 0
                        : shirtDetailsIds.find((e) => e.id == id).color ==
                            item && ids.includes(id)
                        ? 4
                        : 0,

                    borderRadius:
                      shirtDetailsIds.find((e) => e.id == id) == undefined
                        ? 0
                        : shirtDetailsIds.find((e) => e.id == id).color ==
                            item && ids.includes(id)
                        ? 15
                        : 0,
                  },
                ]}
                onPress={() => {
                  if (ids.includes(id)) {
                    dispatch(
                      addShirtColor({
                        id: id,
                        color: item,

                        type: type,
                      })
                    );
                  } else {
                    Alert.alert("Cant Chose color", "Pick the item first", [
                      {
                        text: "Cancel",
                      },
                      { text: "OK" },
                    ]);
                  }
                }}
              />
            );
          })}
        </View>
        <View style={styles.sizesContainer}>
          {sizes
            // first remove duplicates
            .filter((item, pos, a) => a.indexOf(item) == pos)
            .map((itemSize, index) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  style={[
                    styles.singleSize,
                    {
                      borderColor: "#5D3FD3",
                    },
                  ]}
                  onPress={() => {
                    if (ids.includes(id)) {
                      dispatch(
                        addShirtSize({
                          id: id,
                          size: itemSize,
                          type: type,
                        })
                      );
                    } else {
                      Alert.alert("Cant Chose color", "Pick the item first", [
                        {
                          text: "Cancel",
                        },
                        { text: "OK" },
                      ]);
                    }
                    checkIfSetIsCompleted();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      color:
                        shirtDetailsIds.find((e) => e.id == id) == undefined
                          ? "black"
                          : shirtDetailsIds.find((e) => e.id == id).size ==
                              itemSize && ids.includes(id)
                          ? "purple"
                          : "black",
                      fontWeight:
                        shirtDetailsIds.find((e) => e.id == id) == undefined
                          ? "0"
                          : shirtDetailsIds.find((e) => e.id == id).size ==
                              itemSize && ids.includes(id)
                          ? "700"
                          : "0",
                    }}
                  >
                    {itemSize}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 28,
  },
  brand: {
    fontSize: 15,
  },
  price: {
    fontSize: 28,
  },
  pickColor: {
    height: 50,
    width: 50,
    marginHorizontal: 4,
  },
  sizesContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  singleSize: {
    marginHorizontal: 10,
  },
});
