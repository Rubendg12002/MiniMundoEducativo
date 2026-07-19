import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "../pantallas/Inicio";
import Menu from "../pantallas/Menu";
import Animales from "../pantallas/Animales";
import Numeros from "../pantallas/Numeros";
import Colores from "../pantallas/Colores";
import Resultados from "../pantallas/Resultados";
import Profesiones from "../pantallas/Profesiones";
import CarJam from "../pantallas/CarJam";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Animales" component={Animales} />
      <Stack.Screen name="Numeros" component={Numeros} />
      <Stack.Screen name="Colores" component={Colores} />
      <Stack.Screen name="Resultados" component={Resultados} />
      <Stack.Screen name="Profesiones" component={Profesiones} />
      <Stack.Screen name="CarJam" component={CarJam} />
    </Stack.Navigator>
  );
}
