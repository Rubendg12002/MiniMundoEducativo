import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarraInferior from "../componentes/BarraInferior";

export default function Inicio({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contenido}>
        <Image source={require("../assets/imagenes/logo.png")} style={styles.logo} />

        <Text style={styles.titulo}>Mini Mundo Educativo</Text>

        <View style={styles.mascotaBox}>
          <Image
            source={require("../assets/imagenes/perro.png")}
            style={styles.mascota}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
          style={styles.botonComenzar}
          onPress={() => navigation.navigate("Menu")}
        >
          <Ionicons name="play-circle" size={28} color="#2D6F83" />
          <Text style={styles.textoBoton}>COMENZAR</Text>
        </TouchableOpacity>

        <View style={styles.opciones}>
          <View style={styles.botonSecundarioVerde}>
            <Ionicons name="volume-medium" size={26} color="#43775D" />
            <Text style={styles.textoSecundario}>Sonido</Text>
          </View>

          <View style={styles.botonSecundarioAmarillo}>
            <Ionicons name="star" size={26} color="#6D641F" />
            <Text style={styles.textoSecundario}>Puntaje</Text>
          </View>
        </View>
      </View>

      <BarraInferior navigation={navigation} activo="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFAFF",
  },
  contenido: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 95,
  },
  logo: {
    width: 105,
    height: 105,
    marginBottom: 18,
  },
  titulo: {
    backgroundColor: "#2D6F83",
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 28,
    marginBottom: 30,
    elevation: 4,
  },
  mascotaBox: {
    width: 230,
    height: 230,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
  mascota: {
    width: 210,
    height: 210,
  },
  botonComenzar: {
    width: "86%",
    backgroundColor: "#FFF19B",
    borderRadius: 35,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    elevation: 5,
    marginBottom: 32,
  },
  textoBoton: {
    fontSize: 23,
    color: "#2D6F83",
    fontWeight: "bold",
  },
  opciones: {
    flexDirection: "row",
    gap: 18,
  },
  botonSecundarioVerde: {
    width: 125,
    height: 70,
    backgroundColor: "#BDF2CC",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  botonSecundarioAmarillo: {
    width: 125,
    height: 70,
    backgroundColor: "#E6D97D",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textoSecundario: {
    color: "#3D5961",
    fontWeight: "600",
  },
});