import React from "react";
import { Image } from "react-native";
import style from "./style";

export default function ImgCard({ imageURL, width = 240, height = 240 }) {
  return (
    <Image
      key={"image" + imageURL}
      style={[style.image]}
      source={{
        uri: imageURL,
        width: width,
        height: height,
      }}
    />
  );
}
