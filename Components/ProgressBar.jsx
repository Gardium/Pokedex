import React from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { Bar } from "react-native-progress";

import style from "./style";

export default function ProgressBar({ progress, name }) {
  let color = "#3B8D3D";
  let textColor = progress >= 100 ? "red" : progress >= 60 ? "#fff" : "#000";
  const [progressFinal, setProgressFinal] = useState(0);

  setTimeout(() => {
    setProgressFinal(progress);
  }, 50);
  if (name == "attack") {
    name = "ATK";
    color = "#D63949";
  }
  if (name == "defense") {
    color = "#0192E7";
    name = "DEF";
  }
  if (name == "special-attack") {
    color = "#FFA823";

    name = "SP-ATK";
  }
  if (name == "special-defense") {
    name = "SP-DEF";
    color = "#A020F0";
  }
  if (name == "speed") {
    color = "#8DB1C3";

    name = "SPD";
  }

  return (
    <View style={style.progressBarContainer}>
      <Text style={style.statusBarlabel}>{name.toUpperCase()}</Text>
      <Bar
        progress={progressFinal / 100}
        width={null}
        unfilledColor="gray"
        color={color}
        height={15}
        animated
        animationConfig={{ bounciness: 0 }}
        animationType={"timing"}
        style={style.bar}
      >
        <Text style={[style.progreessText, { color: textColor }]}>
          {progress} / 100
        </Text>
      </Bar>
    </View>
  );
}
