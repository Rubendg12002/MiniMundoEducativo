import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navegacion/AppNavigator";

/**
 * Componente raíz de Mini Mundo Educativo.
 *
 * NavigationContainer mantiene el estado global de navegación y AppNavigator
 * define las pantallas que el usuario puede visitar. La separación permite
 * que App.js se mantenga pequeño y que las rutas se administren en un único
 * módulo.
 *
 * @returns {JSX.Element} Árbol principal de navegación de la aplicación.
 */
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
