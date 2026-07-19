import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const flechas = {
  arriba: "↑",
  abajo: "↓",
  izquierda: "←",
  derecha: "→",
};

const rotaciones = {
  arriba: "0deg",
  derecha: "90deg",
  abajo: "180deg",
  izquierda: "-90deg",
};

const texturas = {
  rojo: require("../../assets/imagenes/carJam/car-rojo.png"),
  azul: require("../../assets/imagenes/carJam/car-azul.png"),
  verde: require("../../assets/imagenes/carJam/car-verde.png"),
  amarillo: require("../../assets/imagenes/carJam/car-amarillo.png"),
  negro: require("../../assets/imagenes/carJam/car-negro.png"),
};

export default function VehiculoCarJam({
  vehiculo,
  tamano,
  onPress,
  deshabilitado,
}) {
  const margen = Math.max(3, tamano * 0.07);

  return (
    <TouchableOpacity
      activeOpacity={0.72}
      accessibilityRole="button"
      accessibilityLabel={`Vehículo que apunta hacia ${vehiculo.direccion}`}
      disabled={deshabilitado}
      onPress={() => onPress(vehiculo.id)}
      style={[
        styles.posicion,
        {
          top: vehiculo.fila * tamano + margen,
          left: vehiculo.columna * tamano + margen,
          width: tamano - margen * 2,
          height: tamano - margen * 2,
          backgroundColor: `${vehiculo.color}44`,
        },
      ]}
    >
      <View style={styles.brillo} />
      <Image
        source={texturas[vehiculo.textura] || texturas.rojo}
        resizeMode="contain"
        style={[
          styles.carro,
          {
            width: tamano * 0.67,
            height: tamano * 0.67,
            transform: [{ rotate: rotaciones[vehiculo.direccion] }],
          },
        ]}
      />
      <View style={styles.direccion}>
        <Text
          style={[
            styles.flecha,
            { fontSize: Math.max(12, tamano * 0.24) },
          ]}
        >
          {flechas[vehiculo.direccion]}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  posicion: {
    position: "absolute",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.92)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#294F5D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 2,
    overflow: "hidden",
  },
  brillo: {
    position: "absolute",
    top: 3,
    left: 7,
    right: 7,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.48)",
  },
  carro: {
    alignSelf: "center",
  },
  direccion: {
    position: "absolute",
    right: 2,
    bottom: 1,
    minWidth: 18,
    minHeight: 18,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.94)",
    justifyContent: "center",
    alignItems: "center",
  },
  flecha: {
    color: "#294F5D",
    fontWeight: "bold",
    lineHeight: 17,
    textAlign: "center",
  },
});
