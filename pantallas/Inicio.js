import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import {
  guardarNombre,
  obtenerNombre,
  obtenerUltimoResultado,
} from "../storage/storage";

const nombresJuegos = {
  VocalesAnimales: "Vocales y sonidos",
  CarJam: "Car Jam",
  Profesiones: "Profesiones",
};

/**
 * Pantalla de bienvenida y perfil.
 * Permite registrar el nombre local del jugador, consultar el último puntaje
 * y entrar al menú principal. No muestra la barra inferior porque es el punto
 * de entrada del flujo y tiene sus propios botones de acción.
 *
 * @param {{navigation: object}} props Propiedades entregadas por navegación.
 * @returns {JSX.Element} Formulario inicial y resumen del último resultado.
 */
export default function Inicio({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [ultimoResultado, setUltimoResultado] = useState(null);

  useFocusEffect(
    useCallback(() => {
      let activa = true;

      const cargarDatos = async () => {
        const [nombreGuardado, resultadoGuardado] = await Promise.all([
          obtenerNombre(),
          obtenerUltimoResultado(),
        ]);

        if (activa) {
          setNombre(nombreGuardado);
          setUltimoResultado(resultadoGuardado);
        }
      };

      cargarDatos();
      return () => {
        activa = false;
      };
    }, [])
  );

  /** Valida y guarda el nombre antes de navegar al destino solicitado. */
  const guardarYContinuar = async (destino) => {
    if (!nombre.trim()) {
      Alert.alert("¿Cómo te llamas?", "Escribe tu nombre para guardar tu progreso.");
      return;
    }

    try {
      await guardarNombre(nombre);
      navigation.navigate(destino);
    } catch (error) {
      Alert.alert("No pudimos guardar el nombre", error.message);
    }
  };

  /** Acción del botón principal de inicio. */
  const comenzar = () => guardarYContinuar("Menu");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../assets/imagenes/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.titulo}>Mini Mundo Educativo</Text>

        <View style={styles.mascotaBox}>
          <Image
            source={require("../assets/imagenes/perro.png")}
            style={styles.mascota}
            resizeMode="contain"
          />
        </View>

        <View style={styles.nombreBox}>
          <Ionicons name="happy-outline" size={25} color="#2D6F83" />
          <TextInput
            accessibilityLabel="Nombre del jugador"
            autoCapitalize="words"
            maxLength={30}
            onChangeText={setNombre}
            placeholder="Escribe tu nombre"
            placeholderTextColor="#7A8F96"
            style={styles.input}
            value={nombre}
          />
        </View>

        {ultimoResultado ? (
          <TouchableOpacity
            style={styles.ultimoResultado}
            onPress={() => navigation.navigate("Historial")}
          >
            <Ionicons name="trophy" size={25} color="#6D641F" />
            <View>
              <Text style={styles.ultimoTitulo}>Último puntaje</Text>
              <Text style={styles.ultimoTexto}>
                {ultimoResultado.puntaje}/{ultimoResultado.total} ·{" "}
                {nombresJuegos[ultimoResultado.tipo] || ultimoResultado.tipo}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity style={styles.botonComenzar} onPress={comenzar}>
          <Ionicons name="play-circle" size={28} color="#2D6F83" />
          <Text style={styles.textoBoton}>COMENZAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityLabel="Ver puntajes"
          accessibilityRole="button"
          style={styles.botonSecundarioAmarillo}
          onPress={() => navigation.navigate("Historial")}
        >
          <Ionicons name="star" size={26} color="#6D641F" />
          <Text style={styles.textoSecundario}>Puntajes</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFFAFF" },
  contenido: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 35,
  },
  logo: { width: 82, height: 82, marginBottom: 12 },
  titulo: {
    backgroundColor: "#2D6F83",
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 21,
    borderRadius: 28,
    marginBottom: 18,
    elevation: 4,
  },
  mascotaBox: {
    width: 180,
    height: 170,
    backgroundColor: "white",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  mascota: { width: 165, height: 165 },
  nombreBox: {
    width: "90%",
    maxWidth: 390,
    backgroundColor: "white",
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#8DD4EA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    marginBottom: 13,
  },
  input: {
    flex: 1,
    color: "#2D6F83",
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 14,
    marginLeft: 8,
  },
  ultimoResultado: {
    width: "90%",
    maxWidth: 390,
    backgroundColor: "#DFF3FA",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    marginBottom: 13,
  },
  ultimoTitulo: { color: "#2D6F83", fontWeight: "bold" },
  ultimoTexto: { color: "#5A777F", marginTop: 2 },
  botonComenzar: {
    width: "86%",
    maxWidth: 380,
    backgroundColor: "#FFF19B",
    borderRadius: 35,
    paddingVertical: 17,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    elevation: 5,
    marginBottom: 20,
  },
  textoBoton: { fontSize: 22, color: "#2D6F83", fontWeight: "bold" },
  botonSecundarioAmarillo: {
    width: 180,
    height: 66,
    backgroundColor: "#E6D97D",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textoSecundario: { color: "#3D5961", fontWeight: "600" },
});
