import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../componentes/Header";
import BarraInferior from "../componentes/BarraInferior";
import { preguntasAnimales } from "../data/juegos";

export default function Animales({ navigation }) {
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);

  const preguntaActual = preguntasAnimales[indice];

  const responder = (opcion) => {
    const esCorrecta = opcion.texto === preguntaActual.respuestaCorrecta;
    const nuevoPuntaje = esCorrecta ? puntos + 1 : puntos;

    if (indice < preguntasAnimales.length - 1) {
      setPuntos(nuevoPuntaje);
      setIndice(indice + 1);
    } else {
      navigation.navigate("Resultados", {
        puntaje: nuevoPuntaje,
        total: preguntasAnimales.length,
        tipo: "Animales",
        mensaje:
          nuevoPuntaje === preguntasAnimales.length
            ? "¡Reconociste todos los sonidos!"
            : "¡Sigue escuchando y aprendiendo!",
        detalle: "Completaste el juego de sonidos de animales",
        imagen: require("../assets/imagenes/perro.png"),
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.contenido}>
        <View style={styles.preguntaBox}>
          <Ionicons name="volume-medium" size={34} color="#6D641F" />
          <Text style={styles.pregunta}>{preguntaActual.pregunta}</Text>
        </View>

        {preguntaActual.opciones.map((opcion, index) => (
          <TouchableOpacity
            key={index}
            accessibilityLabel={`${opcion.texto}, opción de respuesta`}
            accessibilityRole="button"
            style={styles.opcion}
            onPress={() => responder(opcion)}
          >
            <Image source={opcion.imagen} style={styles.imagenOpcion} />
            <Text style={styles.textoOpcion}>{opcion.texto}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.progreso}>
          Pregunta {indice + 1} de {preguntasAnimales.length}
        </Text>
      </View>

      <BarraInferior navigation={navigation} activo="animales" />
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
    paddingHorizontal: 26,
    paddingTop: 30,
    paddingBottom: 95,
  },
  preguntaBox: {
    backgroundColor: "#E6D97D",
    borderRadius: 35,
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    borderBottomWidth: 5,
    borderBottomColor: "#6D641F",
    marginBottom: 35,
  },
  pregunta: {
    fontSize: 24,
    color: "#6D641F",
    fontWeight: "bold",
    textAlign: "center",
    flexShrink: 1,
  },
  opcion: {
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#D9E8EE",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  imagenOpcion: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 24,
  },
  textoOpcion: {
    fontSize: 24,
    color: "#2D6F83",
    fontWeight: "bold",
  },
  progreso: {
    textAlign: "center",
    color: "#5A777F",
    fontWeight: "bold",
    marginTop: 5,
  },
});
