import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import VehiculoCarJam from "./VehiculoCarJam";

const texturaCarretera = require("../../assets/imagenes/carJam/carretera.png");

export default function TableroCarJam({
  filas,
  columnas,
  vehiculos,
  tamano,
  onVehiculoPress,
  deshabilitado,
}) {
  const tamanoCelda = tamano / columnas;
  const alto = tamanoCelda * filas;
  const casillas = Array.from(
    { length: filas * columnas },
    (_, indice) => indice
  );

  return (
    <ImageBackground
      source={texturaCarretera}
      resizeMode="cover"
      imageStyle={styles.imagen}
      style={[styles.tablero, { width: tamano, height: alto }]}
    >
      {casillas.map((indice) => {
        const fila = Math.floor(indice / columnas);
        const columna = indice % columnas;

        return (
          <View
            key={`${fila}-${columna}`}
            pointerEvents="none"
            style={[
              styles.casilla,
              {
                width: tamanoCelda,
                height: tamanoCelda,
                top: fila * tamanoCelda,
                left: columna * tamanoCelda,
              },
            ]}
          />
        );
      })}

      {vehiculos.map((vehiculo) => (
        <VehiculoCarJam
          key={vehiculo.id}
          vehiculo={vehiculo}
          tamano={tamanoCelda}
          onPress={onVehiculoPress}
          deshabilitado={deshabilitado}
        />
      ))}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  tablero: {
    position: "relative",
    borderRadius: 22,
    borderWidth: 5,
    borderColor: "#2D6F83",
    overflow: "hidden",
    backgroundColor: "#A9DFF1",
    elevation: 6,
    shadowColor: "#294F5D",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 4,
  },
  imagen: {
    borderRadius: 17,
    opacity: 0.72,
  },
  casilla: {
    position: "absolute",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.78)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
});
