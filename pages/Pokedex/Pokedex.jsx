import React, { useEffect, useState } from "react";
import { FlatList, View, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons/";

import { TextInput } from "react-native-gesture-handler";

import style from "./style";
import Card from "../../Components/Card";
import OpenCard from "../../Components/OpenCard";

export default function PokeDex() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [pokemonPage, setpokemonPage] = useState({});
  const [searchDataSource, setSearchDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
  let pokeData = {};

  useEffect(() => getData(), []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const searchpoke = (text) => {
    setSearchText(text);
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=898/`)
      .then((res) => res.json())
      .then((res) => {
        setSearchDataSource(
          res.results.filter((item, index) => {
            item.id = index + 1;
            if (text[0] === "#") {
              if (!isNaN(text.split("#")[1])) {
                return item.id == +text.split("#")[1];
              }
            }
            return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const selectPokeId = async (id) => {
    setLoading(true);
    await getPokemonData(id);
    setpokemonPage(pokeData);
    setLoading(false);
    toggleModal();
  };

  const getPokemonData = (_id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${_id}/`)
      .then((res) => res.json())
      .then((res) => {
        pokeData.id = res.id;
        pokeData.name = res.name;
        pokeData.types = res.types;
        pokeData.sprites = res.sprites.other.home;
        pokeData.stats = res.stats;
        pokeData.weight = res.weight;
        pokeData.height = res.height;
      })
      .catch((err) => console.log(err));

  const getData = () => {
    setLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20/`)
      .then((res) =>
        res.json().catch((error) => {
          console.error(error);
        })
      )
      .then((res) => {
        setOffset(offset + 20);
        setDataSource([...dataSource, ...res.results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView
      behavior="position"
      enabled
      style={{ flex: 1, backgroundColor: "#2B292C" }}
    >
      {loading && (
        <View style={style.loadingScreen}>
          <ActivityIndicator color="red" size="large"></ActivityIndicator>
        </View>
      )}
      <View style={style.header}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png",
            width: 150,
            height: 56,
          }}
        />
        <TextInput
          placeholder="Bulbasaur ou #001"
          onChangeText={(text) => {
            searchpoke(text);
          }}
          value={searchText}
          style={style.searchInput}
        />

        <MaterialCommunityIcons
          style={style.searchIcon}
          color="gray"
          name="close-circle-outline"
          size={40}
          onPress={() => setSearchText("")}
        />
      </View>
      <View style={style.container}>
        {isModalVisible ? (
          <OpenCard
            toggleModal={toggleModal}
            isVisible={isModalVisible}
            pokemonPage={pokemonPage}
          />
        ) : (
          <></>
        )}

        <FlatList
          contentContainerStyle={{ marginHorizontal: 0 }}
          style={style.container}
          data={searchText.length > 0 ? searchDataSource : dataSource}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}
          renderItem={({ item, index }) => (
            <Card
              name={item.name}
              id={searchText.length > 0 ? item.id : index + 1}
              selectPokeId={selectPokeId}
            />
          )}
          onEndReached={searchText.length > 0 ? null : getData}
        />
      </View>
    </SafeAreaView>
  );
}
