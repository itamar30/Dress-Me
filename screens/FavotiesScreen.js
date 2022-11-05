import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Reac, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectShirt } from "../features/shirt/shirtSlice";
import axios from "axios";
import Item from "../components/Item";

import { selectShirtDetails } from "../features/shirt/shirtDetails/shirtDetailsSlice";

export default function FavotiesScreen() {
  const [post, setPost] = useState([]);
  const [setArr, setSetArr] = useState([]);
  const [isArrEmpty, setIsArrEmpty] = useState(false);
  let ids = useSelector(selectShirt);
  let shirtDetailsIds = useSelector(selectShirtDetails);
  let shirtlen = setArr.filter(
    (item) => item.type == "shirt" && ids.includes(item.id)
  ).length;
  let shoewLen = setArr.filter(
    (item) => item.type == "shoes" && ids.includes(item.id)
  ).length;

  const baseURL =
    "https://run.mocky.io/v3/e290e152-3f8d-432e-9150-0ce9520c229f?mocky-delay=600%20ms";

  useEffect(() => {
    getShirtsArr();
    console.log(ids);
    console.log(shirtDetailsIds);
  }, [isArrEmpty, ids]);

  const getShirtsArr = () => {
    axios.get(baseURL).then((response) => {
      setPost(response.data.data);
      setIsArrEmpty(true);
    });
    setSetArr(post.filter((item) => item.type === "shirt" || "shoes"));
  };

  const renderItems = setArr.map((item, index) => {
    if (ids.includes(item.id))
      return (
        <Item
          key={index}
          name={item.name}
          brand={item.brand}
          price={item.price}
          isOutLet={item.outlet}
          id={item.id}
          colors={item.colors}
          sizes={item.sizes}
          type={item.type}
        />
      );
  });

  return (
    <View style={styles.container}>
      <ScrollView>{renderItems}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffecef",
  },
});
