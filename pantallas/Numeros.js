import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../componentes/Header";
import BarraInferior from "../componentes/BarraInferior";
import { preguntasNumeros } from "../data/juegos";

export default function Numeros({ navigation }) {
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);

  const pregunta = preguntasNumeros[indice];

  const responder = (numero) => {
    const nuevoPuntaje = numero === pregunta.cantidad ? puntos + 1 : puntos;

    if (indice < preguntasNumeros.length - 1) {
      setPuntos(nuevoPuntaje);
      setIndice(indice + 1);
    } else {
      navigation.navigate("Resultados", {
        puntaje: nuevoPuntaje,
        total: preguntasNumeros.length,
        tipo: "Numeros",
        mensaje: nuevoPuntaje === preguntasNumeros.length ? "¡Muy Bien!" : "Sigue practicando",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.contenido}>
        <View style={styles.card}>
          <Text style={styles.pregunta}>{pregunta.pregunta}</Text>

          <View style={styles.grid}>
            {Array.from({ length: pregunta.cantidad }).map((_, index) => (
              <Image key={index} source={pregunta.imagen} style={styles.manzana} />
            ))}
          </View>
        </View>

        <View style={styles.opciones}>
          {pregunta.opciones.map((numero) => (
            <TouchableOpacity
              key={numero}
              style={styles.botonNumero}
              onPress={() => responder(numero)}
            >
              <Text style={styles.numero}>{numero}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <BarraInferior navigation={navigation} activo="numeros" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFFAFF" },
  contenido: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 70,
    paddingBottom: 95,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    elevation: 5,
    marginBottom: 38,
  },
  pregunta: {
    color: "#2D6F83",
    fontWeight: "600",
    marginBottom: 25,
  },
  grid: {
    width: 190,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 18,
  },
  manzana: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  opciones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botonNumero: {
    width: 76,
    height: 76,
    backgroundColor: "#FFF19B",
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#D8C95D",
  },
  numero: {
    backgroundColor: "#60A5FA",
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 8,
  },
});