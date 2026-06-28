import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function Resultados({ navigation, route }) {
  const puntaje = route.params?.puntaje || 0;
  const total = route.params?.total || 1;
  const tipo = route.params?.tipo || "Animales";
  const mensaje = route.params?.mensaje || "¡Excelente!";

  const volverAJugar = () => {
    navigation.navigate(tipo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.estrellas}>⭐ ⭐</Text>

        <Image
          source={require("../assets/imagenes/perro.png")}
          style={styles.perro}
          resizeMode="contain"
        />

        <Text style={styles.mensaje}>{mensaje}</Text>
        <Text style={styles.detalle}>
          Lo hiciste muy bien explorando
        </Text>
        <Text style={styles.puntaje}>
          Puntaje: {puntaje}/{total}
        </Text>

        <TouchableOpacity style={styles.botonVerde} onPress={volverAJugar}>
          <Text style={styles.textoBoton}>🐶 Otro juego</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonAzul}
          onPress={() => navigation.navigate("Menu")}
        >
          <Text style={styles.textoBoton}>🏠 Menú</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFAFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    minHeight: "82%",
    backgroundColor: "white",
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#BDF2CC",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  estrellas: {
    fontSize: 42,
    color: "#FFF19B",
    marginBottom: 20,
  },
  perro: {
    width: 180,
    height: 180,
    marginBottom: 12,
  },
  mensaje: {
    color: "#47785D",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 14,
  },
  detalle: {
    color: "#7A8F96",
    fontWeight: "600",
    marginBottom: 12,
  },
  puntaje: {
    color: "#2D6F83",
    fontWeight: "bold",
    marginBottom: 30,
  },
  botonVerde: {
    width: "90%",
    backgroundColor: "#BDF2CC",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#8DD4EA",
  },
  botonAzul: {
    width: "90%",
    backgroundColor: "#DFF3FA",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8DD4EA",
  },
  textoBoton: {
    color: "#2D6F83",
    fontSize: 22,
    fontWeight: "bold",
  },
});