import React, { useState } from "react";

import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons/";
import Modal from "react-native-modal";

import ImgCard from "./ImgCard";
import ProgressBar from "./ProgressBar";
import style from "./style";
import Type from "./Type";

import cardBackground from "../assets/cardBackground";

export default function OpenCard({ toggleModal, isVisible, pokemonPage }) {
  const [imageURL, setImageURL] = useState(pokemonPage.sprites.front_default);

  return (
    <>
      <Modal
        key={`${pokemonPage.id} + modal`}
        transparent={true}
        isVisible={isVisible}
        animationIn={"bounceInRight"}
        animationInTiming={600}
        animationOut={"bounceOut"}
        animationOutTiming={600}
        onRequestClose={() => toggleModal()}
        onBackdropPress={() => toggleModal()}
      >
        <View activeOpacity={1} style={[style.modal]}>
          <ImageBackground
            imageStyle={{
              borderRadius: 20,
              borderBottomLeftRadius: 48,
              borderBottomRightRadius: 48,
            }}
            source={cardBackground[`${pokemonPage.types[0].type.name}`]}
            style={[style.imageContainer]}
          >
            <Text>{pokemonPage.types[0].type.name}</Text>
            <View style={style.headerModal}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 50,
                  paddingBottom: 30,
                }}
                onPress={() => {
                  toggleModal();
                }}
              >
                <MaterialCommunityIcons
                  color="white"
                  name="arrow-left"
                  size={18}
                />
                <Text style={style.HeaderModalText}>PokeDex</Text>
              </TouchableOpacity>
              <Text style={style.HeaderModalText}>{`#${String(
                pokemonPage.id
              ).padStart(3, 0)}`}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setImageURL(
                  imageURL == pokemonPage.sprites.front_default
                    ? pokemonPage.sprites.front_shiny
                    : pokemonPage.sprites.front_default
                )
              }
            >
              <ImgCard imageURL={imageURL} />
            </TouchableOpacity>
          </ImageBackground>
          <Text style={style.title}>{pokemonPage.name}</Text>
          <View style={style.infoContainer}>
            {pokemonPage.types.map((type) => (
              <Type type={type} key={`${type.slot} ${type["type"].name}`} />
            ))}
          </View>
          <View style={style.infoContainer}>
            <Text style={style.info}>{`${(pokemonPage.weight * 0.1).toFixed(
              2
            )} KG`}</Text>
            <Text style={style.info}>{`${(pokemonPage.height * 0.1).toFixed(
              2
            )} M`}</Text>
          </View>
          <View style={style.infoContainer}>
            <Text style={style.label}>Peso</Text>
            <Text style={style.label}>Altura</Text>
          </View>
          <Text style={style.labelStatus}>Status Iniciais</Text>

          {pokemonPage.stats.map((stat) => (
            <ProgressBar
              progress={stat.base_stat}
              name={stat["stat"].name}
              key={`${stat.base_stat}${stat["stat"].name}`}
            />
          ))}
        </View>
      </Modal>
    </>
  );
}
