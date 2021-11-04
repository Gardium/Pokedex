import React from "react";
import { Text } from "react-native";
import style from "./style";

export default function Type({ type }) {
  return (
    <Text style={[style.type, style[`${type["type"].name}`]]}>
      {type["type"].name}
    </Text>
  );
}
