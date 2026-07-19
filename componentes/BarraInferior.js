import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BarraInferior({ navigation, activo = "menu" }) {
  const esJuego = [
    "animales",
    "numeros",
    "colores",
    "profesiones",
    "carjam",
    "vocales",
  ].includes(activo);

  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
        <Ionicons name="map-outline" size={26} color="#294F5D" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Historial")}
        style={activo === "historial" ? styles.activoSecundario : null}
      >
        <Ionicons name="star-outline" size={26} color="#294F5D" />
      </TouchableOpacity>

      <TouchableOpacity
        style={esJuego ? styles.activo : null}
      >
        <Ionicons
          name={
            activo === "carjam"
              ? "car-sport"
              : activo === "vocales"
                ? "chatbubbles"
                : "paw"
          }
          size={28}
          color="#294F5D"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
        <Ionicons name="person-circle-outline" size={28} color="#294F5D" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 15,
    left: 18,
    right: 18,
    height: 70,
    backgroundColor: "#DFF3FA",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#8DD4EA",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  activo: {
    backgroundColor: "#BDF2CC",
    padding: 15,
    borderRadius: 35,
  },
  activoSecundario: {
    backgroundColor: "#FFF19B",
    padding: 12,
    borderRadius: 28,
  },
});
