import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IndicadorNivel({ nivelActual, totalNiveles }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Nivel {nivelActual} de {totalNiveles}
      </Text>

      <View style={styles.puntos}>
        {Array.from({ length: totalNiveles }, (_, indice) => (
          <View
            key={indice}
            style={[
              styles.punto,
              indice < nivelActual ? styles.puntoActivo : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  texto: {
    color: "#2D6F83",
    fontSize: 17,
    fontWeight: "bold",
  },
  puntos: {
    flexDirection: "row",
    marginTop: 7,
  },
  punto: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#D9E8EE",
    marginHorizontal: 4,
  },
  puntoActivo: {
    backgroundColor: "#47785D",
  },
});
