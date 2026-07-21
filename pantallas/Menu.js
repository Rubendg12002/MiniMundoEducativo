import React, { useCallback, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Header from "../componentes/Header";
import BarraInferior from "../componentes/BarraInferior";
import { obtenerNombre } from "../storage/storage";

/**
 * Menú de actividades disponibles.
 * Carga el nombre al recuperar el foco y presenta exclusivamente los juegos
 * vigentes: Vocales y sonidos, Profesiones y Car Jam.
 *
 * @param {{navigation: object}} props Propiedades entregadas por navegación.
 * @returns {JSX.Element} Tarjetas de selección de juegos.
 */
export default function Menu({ navigation }) {
  const [nombre, setNombre] = useState("");

  useFocusEffect(
    useCallback(() => {
      obtenerNombre().then(setNombre);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.bienvenida}>
          {nombre ? `¡Hola, ${nombre}!` : "¡Vamos a aprender!"}
        </Text>
        <Text style={styles.instruccion}>Elige una actividad</Text>

        <TouchableOpacity
          style={[styles.card, styles.cardVocales]}
          onPress={() => navigation.navigate("VocalesAnimales")}
        >
          <View style={styles.imagenBoxPrincipal}>
            <Image
              source={require("../assets/imagenes/pato.png")}
              style={styles.imagenPrincipal}
              resizeMode="contain"
            />
            <Image
              source={require("../assets/imagenes/rana.png")}
              style={styles.imagenPrincipal}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.texto}>🔤 Vocales y sonidos</Text>
          <Text style={styles.descripcion}>Encuentra A, E, I, O y U</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardNaranja]}
          onPress={() => navigation.navigate("Profesiones")}
        >
          <View style={styles.imagenBox}>
            <Image
              source={require("../assets/imagenes/profesiones.png")}
              style={styles.imagen}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.texto}>👩‍⚕️ Juego de{"\n"}Profesiones</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardRosa]}
          onPress={() => navigation.navigate("CarJam")}
        >
          <View style={styles.imagenBox}>
            <Image
              source={require("../assets/imagenes/carJam/car-rojo.png")}
              style={styles.imagenCarro}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.texto}>🚗 Car Jam</Text>
        </TouchableOpacity>
      </ScrollView>

      <BarraInferior navigation={navigation} activo="menu" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFFAFF" },
  scroll: { paddingHorizontal: 22, paddingBottom: 105 },
  bienvenida: {
    color: "#2D6F83",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  instruccion: {
    color: "#7A8F96",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 18,
  },
  card: {
    minHeight: 165,
    borderRadius: 25,
    marginBottom: 22,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  cardVocales: {
    backgroundColor: "#E8D9FF",
    borderBottomWidth: 5,
    borderBottomColor: "#7957A8",
  },
  cardNaranja: {
    backgroundColor: "#FFD8A8",
    borderBottomWidth: 5,
    borderBottomColor: "#C77A1F",
  },
  cardRosa: {
    backgroundColor: "#F9CDD2",
    borderBottomWidth: 5,
    borderBottomColor: "#C85D67",
  },
  imagenBox: {
    width: "88%",
    height: 75,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  imagenBoxPrincipal: {
    width: "88%",
    height: 82,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 10,
  },
  imagen: { width: 82, height: 82, borderRadius: 41 },
  imagenPrincipal: { width: 78, height: 78, borderRadius: 18 },
  imagenCarro: { width: 58, height: 78 },
  texto: {
    fontSize: 22,
    color: "#2D6F83",
    fontWeight: "bold",
    textAlign: "center",
  },
  descripcion: { color: "#6F5A8A", fontWeight: "600", marginTop: 5 },
});
