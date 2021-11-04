import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pokedex from "./pages/Pokedex/Pokedex";

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            tabBarLabel: "Settings!",

            headerShown: false,
          }}
          name="Pokedex"
          component={Pokedex}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
