import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "../pantallas/Inicio";
import Menu from "../pantallas/Menu";
import Resultados from "../pantallas/Resultados";
import Profesiones from "../pantallas/Profesiones";
import CarJam from "../pantallas/CarJam";
import VocalesAnimales from "../pantallas/VocalesAnimales";
import Historial from "../pantallas/Historial";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Resultados" component={Resultados} />
      <Stack.Screen name="Profesiones" component={Profesiones} />
      <Stack.Screen name="CarJam" component={CarJam} />
      <Stack.Screen name="VocalesAnimales" component={VocalesAnimales} />
      <Stack.Screen name="Historial" component={Historial} />
    </Stack.Navigator>
  );
}
