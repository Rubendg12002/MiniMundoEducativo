import React, { useMemo, useState } from "react";
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

import Header from "../componentes/Header";
import BarraInferior from "../componentes/BarraInferior";
import {
  actividadesVocales,
  contarVocales,
  totalVocalesActividad,
  VOCALES,
} from "../data/actividadesVocales";

const CONTEO_INICIAL = { A: 0, E: 0, I: 0, O: 0, U: 0 };

export default function VocalesAnimales({ navigation }) {
  const [indice, setIndice] = useState(0);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [conteo, setConteo] = useState(CONTEO_INICIAL);
  const [errores, setErrores] = useState(0);
  const [mensaje, setMensaje] = useState(
    "Toca y encierra todas las vocales del sonido."
  );

  const actividad = actividadesVocales[indice];
  const letras = actividad.sonido.split("");

  const posicionesVocales = useMemo(
    () =>
      letras
        .map((letra, posicion) =>
          VOCALES.includes(letra) ? posicion : null
        )
        .filter((posicion) => posicion !== null),
    [actividad.id]
  );

  const actividadCompleta = posicionesVocales.every((posicion) =>
    seleccionadas.includes(posicion)
  );

  const tocarLetra = (letra, posicion) => {
    if (seleccionadas.includes(posicion)) {
      return;
    }

    if (!VOCALES.includes(letra)) {
      setErrores((cantidad) => cantidad + 1);
      setMensaje("Esa es una consonante. Busca A, E, I, O o U.");
      return;
    }

    const nuevasSeleccionadas = [...seleccionadas, posicion];
    setSeleccionadas(nuevasSeleccionadas);
    setConteo((actual) => ({
      ...actual,
      [letra]: actual[letra] + 1,
    }));

    const completo = posicionesVocales.every((indiceVocal) =>
      nuevasSeleccionadas.includes(indiceVocal)
    );
    setMensaje(
      completo
        ? `¡Excelente! Encontraste las vocales de ${actividad.sonido}.`
        : `¡Muy bien! Encontraste la vocal ${letra}.`
    );
  };

  const continuar = () => {
    if (!actividadCompleta) {
      setMensaje("Todavía falta encerrar una vocal.");
      return;
    }

    const esUltima = indice === actividadesVocales.length - 1;

    if (esUltima) {
      const puntaje = Math.max(0, totalVocalesActividad - errores);
      navigation.navigate("Resultados", {
        puntaje,
        total: totalVocalesActividad,
        tipo: "VocalesAnimales",
        mensaje: "¡Las vocales también hacen sonidos!",
        detalle: `Encontraste las ${totalVocalesActividad} vocales de los animales`,
        imagen: require("../assets/imagenes/pato.png"),
        resumenVocales: conteo,
        vocalesEncontradas: totalVocalesActividad,
        errores,
      });
      return;
    }

    setIndice((actual) => actual + 1);
    setSeleccionadas([]);
    setMensaje("Toca y encierra todas las vocales del nuevo sonido.");
  };

  const conteoEsperado = contarVocales(actividad.sonido);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tituloBox}>
          <Ionicons name="chatbubbles" size={27} color="#6D641F" />
          <Text style={styles.titulo}>Vocales y sonidos</Text>
        </View>

        <Text style={styles.progreso}>
          Animal {indice + 1} de {actividadesVocales.length}
        </Text>

        <View style={[styles.cardAnimal, { borderColor: actividad.color }]}>
          <Image
            source={actividad.imagen}
            style={styles.animal}
            resizeMode="contain"
          />
          <Text style={styles.nombreAnimal}>{actividad.animal}</Text>
          <View style={styles.sonidoTitulo}>
            <Ionicons name="volume-high" size={24} color="#2D6F83" />
            <Text style={styles.pregunta}>¿Qué vocales escuchas?</Text>
          </View>

          <View style={styles.letras}>
            {letras.map((letra, posicion) => {
              const seleccionada = seleccionadas.includes(posicion);
              return (
                <TouchableOpacity
                  key={`${actividad.id}-${posicion}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Letra ${letra}`}
                  onPress={() => tocarLetra(letra, posicion)}
                  style={[
                    styles.letraBoton,
                    seleccionada ? styles.letraSeleccionada : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.letra,
                      seleccionada ? styles.letraTextoSeleccionada : null,
                    ]}
                  >
                    {letra}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.ayuda}>
            Este sonido contiene {Object.values(conteoEsperado).reduce(
              (total, cantidad) => total + cantidad,
              0
            )} vocales.
          </Text>
        </View>

        <View style={styles.contadores}>
          {VOCALES.map((vocal) => (
            <View key={vocal} style={styles.contador}>
              <Text style={styles.vocal}>{vocal}</Text>
              <Text style={styles.cantidad}>{conteo[vocal]}</Text>
            </View>
          ))}
        </View>

        <Text accessibilityLiveRegion="polite" style={styles.mensaje}>
          {mensaje}
        </Text>

        <TouchableOpacity
          style={[
            styles.botonContinuar,
            !actividadCompleta ? styles.botonDeshabilitado : null,
          ]}
          onPress={continuar}
          disabled={!actividadCompleta}
        >
          <Text style={styles.textoContinuar}>
            {indice === actividadesVocales.length - 1
              ? "Ver resultados"
              : "Siguiente animal"}
          </Text>
          <Ionicons name="arrow-forward-circle" size={25} color="#2D6F83" />
        </TouchableOpacity>
      </ScrollView>

      <BarraInferior navigation={navigation} activo="vocales" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EFFAFF" },
  contenido: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 110,
  },
  tituloBox: {
    backgroundColor: "#FFF19B",
    borderRadius: 28,
    borderBottomWidth: 5,
    borderBottomColor: "#D8C95D",
    paddingVertical: 12,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titulo: { color: "#2D6F83", fontSize: 23, fontWeight: "bold" },
  progreso: {
    color: "#5A777F",
    fontWeight: "bold",
    marginVertical: 10,
  },
  cardAnimal: {
    width: "100%",
    maxWidth: 410,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 4,
    alignItems: "center",
    padding: 16,
    elevation: 4,
  },
  animal: { width: 155, height: 155, borderRadius: 22 },
  nombreAnimal: {
    color: "#47785D",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 4,
  },
  sonidoTitulo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  pregunta: { color: "#2D6F83", fontWeight: "bold", fontSize: 17 },
  letras: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 9,
    marginTop: 14,
  },
  letraBoton: {
    width: 52,
    height: 58,
    borderRadius: 15,
    backgroundColor: "#DFF3FA",
    borderWidth: 2,
    borderColor: "#8DD4EA",
    alignItems: "center",
    justifyContent: "center",
  },
  letraSeleccionada: {
    borderRadius: 29,
    backgroundColor: "#BDF2CC",
    borderColor: "#47785D",
    borderWidth: 4,
  },
  letra: { color: "#2D6F83", fontSize: 30, fontWeight: "bold" },
  letraTextoSeleccionada: { color: "#47785D" },
  ayuda: { color: "#7A8F96", fontWeight: "600", marginTop: 12 },
  contadores: {
    width: "100%",
    maxWidth: 410,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  contador: {
    width: 55,
    backgroundColor: "white",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#D9E8EE",
    alignItems: "center",
    paddingVertical: 7,
  },
  vocal: { color: "#2D6F83", fontSize: 20, fontWeight: "bold" },
  cantidad: { color: "#47785D", fontSize: 18, fontWeight: "bold" },
  mensaje: {
    minHeight: 42,
    color: "#5A777F",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 12,
  },
  botonContinuar: {
    width: "100%",
    maxWidth: 410,
    minHeight: 58,
    backgroundColor: "#BDF2CC",
    borderRadius: 30,
    borderBottomWidth: 5,
    borderBottomColor: "#47785D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  botonDeshabilitado: { opacity: 0.45 },
  textoContinuar: { color: "#2D6F83", fontSize: 19, fontWeight: "bold" },
});
