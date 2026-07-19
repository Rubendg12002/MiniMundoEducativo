import React, { useCallback, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import Header from "../componentes/Header";
import BarraInferior from "../componentes/BarraInferior";
import { borrarHistorial, obtenerHistorial } from "../storage/storage";

const nombresJuegos = {
  VocalesAnimales: "Vocales y sonidos",
  CarJam: "Car Jam",
  Animales: "Animales",
  Numeros: "Números",
  Colores: "Colores",
  Profesiones: "Profesiones",
};

export default function Historial({ navigation }) {
  const [resultados, setResultados] = useState([]);

  const cargarHistorial = useCallback(async () => {
    setResultados(await obtenerHistorial());
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarHistorial();
    }, [cargarHistorial])
  );

  const confirmarBorrado = () => {
    Alert.alert(
      "Borrar progreso",
      "Se eliminarán los puntajes guardados. El nombre del jugador se conservará.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar",
          style: "destructive",
          onPress: async () => {
            await borrarHistorial();
            setResultados([]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.tituloBox}>
          <Ionicons name="star" size={28} color="#6D641F" />
          <Text style={styles.titulo}>Mi progreso</Text>
        </View>

        {resultados.length === 0 ? (
          <View style={styles.vacio}>
            <Ionicons name="trophy-outline" size={64} color="#8DD4EA" />
            <Text style={styles.vacioTitulo}>Aún no hay resultados</Text>
            <Text style={styles.vacioTexto}>
              Completa una actividad y aparecerá aquí.
            </Text>
          </View>
        ) : (
          resultados.map((resultado) => (
            <View key={resultado.id} style={styles.resultado}>
              <View style={styles.iconoResultado}>
                <Ionicons name="ribbon" size={27} color="#47785D" />
              </View>
              <View style={styles.datos}>
                <Text style={styles.juego}>
                  {nombresJuegos[resultado.tipo] || resultado.tipo}
                </Text>
                <Text style={styles.fecha}>
                  {new Date(resultado.fecha).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.puntaje}>
                {resultado.puntaje}/{resultado.total}
              </Text>
            </View>
          ))
        )}

        {resultados.length > 0 ? (
          <TouchableOpacity style={styles.borrar} onPress={confirmarBorrado}>
            <Ionicons name="trash-outline" size={21} color="#A6404A" />
            <Text style={styles.textoBorrar}>Borrar historial</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>

      <BarraInferior navigation={navigation} activo="historial" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFFAFF" },
  contenido: { padding: 22, paddingBottom: 110 },
  tituloBox: {
    backgroundColor: "#FFF19B",
    borderRadius: 30,
    borderBottomWidth: 5,
    borderBottomColor: "#D8C95D",
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  titulo: { color: "#2D6F83", fontSize: 24, fontWeight: "bold" },
  vacio: {
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#D9E8EE",
    alignItems: "center",
    padding: 35,
  },
  vacioTitulo: {
    color: "#2D6F83",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  vacioTexto: { color: "#7A8F96", textAlign: "center", marginTop: 8 },
  resultado: {
    backgroundColor: "white",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#D9E8EE",
    padding: 15,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  iconoResultado: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#BDF2CC",
    alignItems: "center",
    justifyContent: "center",
  },
  datos: { flex: 1, marginLeft: 13 },
  juego: { color: "#2D6F83", fontSize: 17, fontWeight: "bold" },
  fecha: { color: "#7A8F96", marginTop: 3 },
  puntaje: { color: "#47785D", fontSize: 20, fontWeight: "bold" },
  borrar: {
    minHeight: 54,
    borderRadius: 27,
    backgroundColor: "#F9CDD2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
  },
  textoBorrar: { color: "#A6404A", fontSize: 17, fontWeight: "bold" },
});
