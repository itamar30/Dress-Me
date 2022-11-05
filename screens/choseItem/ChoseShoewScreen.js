import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../../components/Item";
import { Entypo } from "@expo/vector-icons";

export default function ChoseShoewScreen({ navigation }) {
  const [allObjects, setAllObjects] = useState([]);
  const [shoesArr, setShoesArr] = useState([]);
  // boolean state to use inside useEffect
  const [isArrEmpty, setIsArrEmpty] = useState(true);
  //for textInput
  const [searchTerm, setSearchTerm] = useState(null);

  const baseURL =
    "https://run.mocky.io/v3/e290e152-3f8d-432e-9150-0ce9520c229f?mocky-delay=600%20ms";

  useEffect(() => {
    getShoesArr();
    console.log("use effect run");
  }, [isArrEmpty, searchTerm, shoesArr.length]);

  const getShoesArr = () => {
    axios.get(baseURL).then((response) => {
      setAllObjects(response.data.data);
      setIsArrEmpty(false);
    });
    setShoesArr(
      allObjects
        .filter((item) => item.type === "shoes")
        .sort((p1, p2) => (p1.name > p2.name ? 1 : p1.name < p2.name ? -1 : 0))
        .filter((item) => {
          if (searchTerm == null || searchTerm.length < 2) {
            return item;
          } else if (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.colors.includes(searchTerm.toLowerCase()) ||
            item.sizes.includes(parseInt(searchTerm))
          ) {
            return item;
          }
        })
    );
  };

  const handleRender = ({ item }) => {
    return (
      <Item
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlContainer}>
        <Text style={styles.title}>{shoesArr.length} items were found</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 2,
          alignItems: "center",
          width: 380,
          alignSelf: "center",
        }}
      >
        <Entypo
          name="magnifying-glass"
          size={24}
          color="black"
          style={{ marginRight: 40, marginLeft: 8 }}
        />

        <TextInput
          style={styles.searchBar}
          onChangeText={setSearchTerm}
          value={searchTerm}
          placeholder="Serach By Name / Brand / size / color .."
        />
      </View>

      <FlatList
        data={shoesArr}
        keyExtractor={(item) => item.name}
        renderItem={handleRender}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffecef",
  },
  titlContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 30,
    marginVertical: 8,
    color: "purple",
    fontWeight: "600",
  },
  searchBar: {
    height: 60,
    fontSize: 15,
  },
});
