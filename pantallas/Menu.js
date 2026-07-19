import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Header from "../componentes/Header";
import BarraInferior from "../componentes/BarraInferior";

export default function Menu({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity
          style={[styles.card, styles.cardVerde]}
          onPress={() => navigation.navigate("Animales")}
        >
          <View style={styles.imagenBox}>
            <Image
              source={require("../assets/imagenes/animales.png")}
              style={styles.imagen}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.texto}>🐶 Juego de{"\n"}Animales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardAmarillo]}
          onPress={() => navigation.navigate("Numeros")}
        >
          <View style={styles.imagenBox}>
            <Image
              source={require("../assets/imagenes/numeros.png")}
              style={styles.imagen}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.texto}>🔢 Juego de{"\n"}Números</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardAzul]}
          onPress={() => navigation.navigate("Colores")}
        >
          <View style={styles.imagenBox}>
            <Image
              source={require("../assets/imagenes/colores.png")}
              style={styles.imagen}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.texto}>🌸 Juego de{"\n"}Colores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardNaranja]}
          onPress={() => navigation.navigate("Profesiones")}
        >
          <View style={styles.imagenBox}>
            <Image
              source={require("../assets/imagenes/profesiones.png")}
              style={styles.imagen}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.texto}>👩‍⚕️ Juego de{"\n"}Profesiones</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardRosa]}
          onPress={() => navigation.navigate("CarJam")}
        >
          <View style={styles.imagenBox}>
            <Image
              source={require("../assets/imagenes/carJam/car-rojo.png")}
              style={styles.imagenCarro}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.texto}>🚗 Car Jam</Text>
        </TouchableOpacity>
      </ScrollView>

      <BarraInferior navigation={navigation} activo="menu" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFAFF",
  },

  scroll: {
    paddingHorizontal: 22,
    paddingBottom: 105,
  },

  card: {
    minHeight: 165,
    borderRadius: 25,
    marginBottom: 22,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },

  cardVerde: {
    backgroundColor: "#BDF2CC",
    borderBottomWidth: 5,
    borderBottomColor: "#47785D",
  },

  cardAmarillo: {
    backgroundColor: "#E6D97D",
    borderBottomWidth: 5,
    borderBottomColor: "#8C8032",
  },

  cardAzul: {
    backgroundColor: "#A9DFF1",
    borderBottomWidth: 5,
    borderBottomColor: "#2D6F83",
  },

  cardNaranja: {
    backgroundColor: "#FFD8A8",
    borderBottomWidth: 5,
    borderBottomColor: "#C77A1F",
  },

  cardRosa: {
    backgroundColor: "#F9CDD2",
    borderBottomWidth: 5,
    borderBottomColor: "#C85D67",
  },

  imagenBox: {
    width: "88%",
    height: 75,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  imagen: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },

  imagenCarro: {
    width: 58,
    height: 78,
  },

  texto: {
    fontSize: 22,
    color: "#2D6F83",
    fontWeight: "bold",
    textAlign: "center",
  },
});
