import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ImgCard from "./ImgCard";
import style from "./style";

export default function Card({ name, id, selectPokeId }) {
  return (
    <>
      <TouchableOpacity
        key={id}
        style={style.card}
        onPress={(event) => {
          selectPokeId(id);
        }}
      >
        <ImgCard
          width={128}
          height={128}
          imageURL={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
        />
        <Text style={style.cardName} key={"Txt" + id}>
          {name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </>
  );
}
