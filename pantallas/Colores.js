import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../componentes/Header";
import BarraInferior from "../componentes/BarraInferior";
import { preguntasColores } from "../data/juegos";

export default function Colores({ navigation }) {
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);

  const pregunta = preguntasColores[indice];

  const responder = (opcion) => {
    const nuevoPuntaje = opcion.texto === pregunta.color ? puntos + 1 : puntos;

    if (indice < preguntasColores.length - 1) {
      setPuntos(nuevoPuntaje);
      setIndice(indice + 1);
    } else {
      navigation.navigate("Resultados", {
        puntaje: nuevoPuntaje,
        total: preguntasColores.length,
        tipo: "Colores",
        mensaje: nuevoPuntaje === preguntasColores.length ? "¡Excelente!" : "Sigue practicando",
        detalle: "Completaste el juego de colores",
        imagen: require("../assets/imagenes/colores.png"),
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.contenido}>
        <View style={styles.cardColor}>
          <Text style={styles.pregunta}>{pregunta.pregunta}</Text>

          <View
            style={[
              styles.circulo,
              {
                backgroundColor: pregunta.colorVisual,
                borderColor: pregunta.colorVisual + "88",
              },
            ]}
          />
        </View>

        {pregunta.opciones.map((opcion) => (
          <TouchableOpacity
            key={opcion.texto}
            accessibilityLabel={`Color ${opcion.texto}`}
            accessibilityRole="button"
            style={[styles.botonColor, { backgroundColor: opcion.color }]}
            onPress={() => responder(opcion)}
          >
            <View style={[styles.punto, { backgroundColor: opcion.color }]} />
            <Text
              style={[
                styles.textoColor,
                opcion.texto === "Amarillo" ? styles.textoColorOscuro : null,
              ]}
            >
              {opcion.texto}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.progreso}>
          Pregunta {indice + 1} de {preguntasColores.length}
        </Text>
      </View>

      <BarraInferior navigation={navigation} activo="colores" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFFAFF" },
  contenido: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 55,
    paddingBottom: 95,
  },
  cardColor: {
    backgroundColor: "white",
    borderRadius: 28,
    paddingVertical: 35,
    alignItems: "center",
    elevation: 4,
    marginBottom: 38,
  },
  pregunta: {
    color: "#7B9AAA",
    fontWeight: "bold",
    marginBottom: 22,
  },
  circulo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 7,
  },
  botonColor: {
    height: 65,
    borderRadius: 28,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: 5,
    borderBottomColor: "rgba(0,0,0,0.25)",
  },
  punto: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 14,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.25)",
  },
  textoColor: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  textoColorOscuro: { color: "#5C4B00" },
  progreso: {
    textAlign: "center",
    color: "#5A777F",
    fontWeight: "bold",
    marginTop: 5,
  },
});
