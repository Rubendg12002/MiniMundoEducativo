import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { guardarResultado, obtenerNombre } from "../storage/storage";

const VOCALES = ["A", "E", "I", "O", "U"];

export default function Resultados({ navigation, route }) {
  const puntaje = route.params?.puntaje ?? 0;
  const total = route.params?.total ?? 1;
  const tipo = route.params?.tipo || "Animales";
  const mensaje = route.params?.mensaje || "¡Excelente!";
  const detalle = route.params?.detalle || "Lo hiciste muy bien explorando";
  const imagen = route.params?.imagen || require("../assets/imagenes/perro.png");
  const resumenVocales = route.params?.resumenVocales || null;
  const errores = route.params?.errores ?? null;

  const [nombre, setNombre] = useState("");
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    let activa = true;

    const guardar = async () => {
      try {
        const nombreGuardado = await obtenerNombre();
        await guardarResultado({
          puntaje,
          total,
          tipo,
          mensaje,
          resumenVocales,
          errores,
        });

        if (activa) {
          setNombre(nombreGuardado);
          setGuardado(true);
        }
      } catch (error) {
        console.log("No se pudo guardar el resultado:", error);
      }
    };

    guardar();
    return () => {
      activa = false;
    };
  }, [puntaje, total, tipo]);

  const volverAJugar = () => navigation.navigate(tipo);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.card}>
          <Text style={styles.estrellas}>⭐ ⭐</Text>

          <Image source={imagen} style={styles.mascota} resizeMode="contain" />

          <Text style={styles.mensaje}>{mensaje}</Text>
          {nombre ? <Text style={styles.nombre}>¡Buen trabajo, {nombre}!</Text> : null}
          <Text style={styles.detalle}>{detalle}</Text>
          <Text style={styles.puntaje}>Puntaje: {puntaje}/{total}</Text>

          {resumenVocales ? (
            <View style={styles.resumen}>
              <Text style={styles.resumenTitulo}>Vocales encontradas</Text>
              <View style={styles.vocales}>
                {VOCALES.map((vocal) => (
                  <View key={vocal} style={styles.vocalBox}>
                    <Text style={styles.vocal}>{vocal}</Text>
                    <Text style={styles.cantidad}>{resumenVocales[vocal] || 0}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.errores}>Intentos con consonantes: {errores || 0}</Text>
            </View>
          ) : null}

          <Text style={styles.guardado}>
            {guardado ? "✓ Progreso guardado en este dispositivo" : "Guardando progreso..."}
          </Text>

          <TouchableOpacity style={styles.botonVerde} onPress={volverAJugar}>
            <Ionicons name="refresh" size={23} color="#2D6F83" />
            <Text style={styles.textoBoton}>Jugar de nuevo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonAmarillo}
            onPress={() => navigation.navigate("Historial")}
          >
            <Ionicons name="star" size={23} color="#6D641F" />
            <Text style={styles.textoAmarillo}>Ver progreso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonAzul}
            onPress={() => navigation.navigate("Menu")}
          >
            <Ionicons name="home" size={23} color="#2D6F83" />
            <Text style={styles.textoBoton}>Menú</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFFAFF" },
  contenido: { flexGrow: 1, justifyContent: "center", padding: 24 },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#BDF2CC",
    alignItems: "center",
    padding: 26,
  },
  estrellas: { fontSize: 38, color: "#FFF19B", marginBottom: 10 },
  mascota: { width: 135, height: 135, marginBottom: 8 },
  mensaje: {
    color: "#47785D",
    fontWeight: "bold",
    fontSize: 19,
    textAlign: "center",
    marginBottom: 8,
  },
  nombre: { color: "#2D6F83", fontSize: 17, fontWeight: "bold", marginBottom: 7 },
  detalle: { color: "#7A8F96", fontWeight: "600", textAlign: "center", marginBottom: 9 },
  puntaje: { color: "#2D6F83", fontSize: 21, fontWeight: "bold", marginBottom: 14 },
  resumen: {
    width: "100%",
    backgroundColor: "#EFFAFF",
    borderRadius: 22,
    padding: 12,
    marginBottom: 12,
  },
  resumenTitulo: { color: "#2D6F83", fontWeight: "bold", textAlign: "center" },
  vocales: { flexDirection: "row", justifyContent: "space-between", marginTop: 9 },
  vocalBox: { alignItems: "center" },
  vocal: { color: "#2D6F83", fontSize: 18, fontWeight: "bold" },
  cantidad: { color: "#47785D", fontSize: 17, fontWeight: "bold" },
  errores: { color: "#7A8F96", textAlign: "center", marginTop: 8 },
  guardado: { color: "#47785D", fontSize: 13, fontWeight: "600", marginBottom: 13 },
  botonVerde: {
    width: "92%",
    backgroundColor: "#BDF2CC",
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#8DD4EA",
  },
  botonAmarillo: {
    width: "92%",
    backgroundColor: "#FFF19B",
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 11,
  },
  botonAzul: {
    width: "92%",
    backgroundColor: "#DFF3FA",
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#8DD4EA",
  },
  textoBoton: { color: "#2D6F83", fontSize: 18, fontWeight: "bold" },
  textoAmarillo: { color: "#6D641F", fontSize: 18, fontWeight: "bold" },
});
