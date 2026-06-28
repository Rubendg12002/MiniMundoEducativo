import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BarraInferior({ navigation, activo = "menu" }) {
  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
        <Ionicons name="map-outline" size={26} color="#294F5D" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="star-outline" size={26} color="#294F5D" />
      </TouchableOpacity>

      <TouchableOpacity
        style={
          activo === "animales" ||
          activo === "numeros" ||
          activo === "colores"
            ? styles.activo
            : null
        }
      >
        <Ionicons name="paw" size={28} color="#294F5D" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="settings-outline" size={26} color="#294F5D" />
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
});