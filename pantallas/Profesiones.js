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
import { preguntasProfesiones } from "../data/juegos";

export default function Profesiones({ navigation }) {
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);

  const pregunta = preguntasProfesiones[indice];

  const responder = (opcion) => {
    const nuevoPuntaje = opcion.nombre === pregunta.respuestaCorrecta ? puntos + 1 : puntos;

    if (indice < preguntasProfesiones.length - 1) {
      setPuntos(nuevoPuntaje);
      setIndice(indice + 1);
    } else {
      navigation.navigate("Resultados", {
        puntaje: nuevoPuntaje,
        total: preguntasProfesiones.length,
        tipo: "Profesiones",
        mensaje:
          nuevoPuntaje === preguntasProfesiones.length
            ? "¡Excelente!"
            : "Sigue practicando",
        detalle: "Completaste el juego de profesiones",
        imagen: require("../assets/imagenes/doctor.png"),
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.contenido}>
        <View style={styles.preguntaBox}>
          <Text style={styles.pregunta}>{pregunta.pregunta}</Text>
        </View>

        <View style={styles.grid}>
          {pregunta.opciones.map((opcion) => (
            <TouchableOpacity
              key={opcion.nombre}
              accessibilityLabel={`Profesión ${opcion.nombre}`}
              accessibilityRole="button"
              style={styles.card}
              onPress={() => responder(opcion)}
            >
              <Image source={opcion.imagen} style={styles.imagen} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.progreso}>
          Pregunta {indice + 1} de {preguntasProfesiones.length}
        </Text>
      </View>

      <BarraInferior navigation={navigation} activo="profesiones" />
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
    paddingHorizontal: 22,
    paddingTop: 35,
    paddingBottom: 95,
  },
  preguntaBox: {
    backgroundColor: "#FFF19B",
    borderRadius: 30,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 35,
    borderBottomWidth: 5,
    borderBottomColor: "#D8C95D",
  },
  pregunta: {
    fontSize: 23,
    color: "#2D6F83",
    fontWeight: "bold",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 22,
  },
  card: {
    width: "47%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#D9E8EE",
    elevation: 4,
  },
  imagen: {
    width: 115,
    height: 115,
  },
  progreso: {
    textAlign: "center",
    color: "#5A777F",
    fontWeight: "bold",
    marginTop: 30,
  },
});
