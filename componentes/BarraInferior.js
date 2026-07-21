import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const accesos = [
  {
    id: "menu",
    etiqueta: "Juegos",
    icono: "map-outline",
    destino: "Menu",
  },
  {
    id: "historial",
    etiqueta: "Progreso",
    icono: "star-outline",
    destino: "Historial",
  },
  {
    id: "home",
    etiqueta: "Perfil",
    icono: "person-circle-outline",
    destino: "Inicio",
  },
];

/**
 * Navegación inferior común para las pantallas de juegos y progreso.
 * `activo` solo controla el resaltado visual; el destino real lo define cada
 * entrada del catálogo `accesos`.
 *
 * @param {{navigation: object, activo?: string}} props Propiedades del menú.
 * @returns {JSX.Element} Barra con accesos a Juegos, Progreso y Perfil.
 */
export default function BarraInferior({ navigation, activo = "menu" }) {
  return (
    <View accessibilityRole="toolbar" style={styles.nav}>
      {accesos.map((acceso) => {
        const estaActivo = activo === acceso.id;

        return (
          <TouchableOpacity
            key={acceso.id}
            accessibilityLabel={`Ir a ${acceso.etiqueta}`}
            accessibilityRole="button"
            accessibilityState={{ selected: estaActivo }}
            hitSlop={5}
            onPress={() => navigation.navigate(acceso.destino)}
            style={[styles.item, estaActivo ? styles.itemActivo : null]}
          >
            <Ionicons
              name={acceso.icono}
              size={24}
              color={estaActivo ? "#2D6F83" : "#5A777F"}
            />
            <Text style={[styles.etiqueta, estaActivo ? styles.etiquetaActiva : null]}>
              {acceso.etiqueta}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 15,
    left: 18,
    right: 18,
    height: 72,
    backgroundColor: "#DFF3FA",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#8DD4EA",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 5,
    elevation: 5,
  },
  item: {
    minWidth: 68,
    minHeight: 55,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  itemActivo: { backgroundColor: "#BDF2CC" },
  etiqueta: {
    color: "#5A777F",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  etiquetaActiva: { color: "#2D6F83", fontWeight: "bold" },
});
