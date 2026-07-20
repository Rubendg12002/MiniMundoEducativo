import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Header from "../componentes/Header";
import BarraInferior from "../componentes/BarraInferior";
import IndicadorNivel from "../componentes/carJam/IndicadorNivel";
import TableroCarJam from "../componentes/carJam/TableroCarJam";
import nivelesCarJam from "../data/nivelesCarJam";
import {
  crearNivelConPosicionesAleatorias,
  puedeSalir,
} from "../game/carJamLogic";
import { guardarProgresoCarJam } from "../storage/storage";

const MENSAJE_INICIAL = "Toca un carro con el camino libre para sacarlo.";

export default function CarJam({ navigation }) {
  const { width } = useWindowDimensions();
  const tamanoTablero = Math.min(width - 36, 390);

  const [indiceNivel, setIndiceNivel] = useState(0);
  const [nivel, setNivel] = useState(() =>
    crearNivelConPosicionesAleatorias(nivelesCarJam[0])
  );
  const [vehiculos, setVehiculos] = useState(() => nivel.vehiculos);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState(MENSAJE_INICIAL);
  const [procesando, setProcesando] = useState(false);
  const [vehiculoDestacado, setVehiculoDestacado] = useState(null);

  const montadoRef = useRef(true);
  const bloqueoRef = useRef(false);
  const transicionRef = useRef(false);
  const temporizadorRef = useRef(null);

  useEffect(
    () => () => {
      montadoRef.current = false;
      if (temporizadorRef.current) {
        clearTimeout(temporizadorRef.current);
      }
    },
    []
  );

  const programar = (accion, demora) => {
    if (temporizadorRef.current) {
      clearTimeout(temporizadorRef.current);
    }

    temporizadorRef.current = setTimeout(() => {
      if (montadoRef.current) {
        accion();
      }
    }, demora);
  };

  const avanzarNivel = (nuevoPuntaje) => {
    const esUltimoNivel = indiceNivel === nivelesCarJam.length - 1;

    setPuntaje(nuevoPuntaje);
    setMensaje(`¡Nivel ${nivel.id} completado! Ganaste 10 puntos.`);
    guardarProgresoCarJam(nivel.id, nuevoPuntaje).catch((error) =>
      console.log("No se pudo guardar el progreso de Car Jam:", error)
    );
    transicionRef.current = true;

    programar(() => {
      if (esUltimoNivel) {
        navigation.navigate("Resultados", {
          puntaje: nuevoPuntaje,
          total: 30,
          tipo: "CarJam",
          mensaje: "¡Desatascaste todos los carros!",
          detalle: "Completaste los tres niveles de Car Jam",
          imagen: require("../assets/imagenes/carJam/car-rojo.png"),
        });
        return;
      }

      const siguienteIndice = indiceNivel + 1;
      const siguienteNivel = crearNivelConPosicionesAleatorias(
        nivelesCarJam[siguienteIndice]
      );

      setIndiceNivel(siguienteIndice);
      setNivel(siguienteNivel);
      setVehiculos(siguienteNivel.vehiculos);
      setMensaje(MENSAJE_INICIAL);
      setVehiculoDestacado(null);
      setProcesando(false);
      bloqueoRef.current = false;
      transicionRef.current = false;
    }, 900);
  };

  const seleccionarVehiculo = (vehiculoId) => {
    if (bloqueoRef.current || transicionRef.current) {
      return;
    }

    bloqueoRef.current = true;
    setVehiculoDestacado(null);
    setProcesando(true);

    const vehiculo = vehiculos.find((item) => item.id === vehiculoId);

    if (!vehiculo) {
      setMensaje("Ese carro ya no está disponible.");
      programar(() => {
        setProcesando(false);
        bloqueoRef.current = false;
      }, 500);
      return;
    }

    try {
      if (!puedeSalir(vehiculo, vehiculos, nivel.filas, nivel.columnas)) {
        setMensaje("¡Camino bloqueado! Prueba con otro carro.");
        programar(() => {
          setProcesando(false);
          bloqueoRef.current = false;
        }, 650);
        return;
      }

      const restantes = vehiculos.filter((item) => item.id !== vehiculoId);
      setVehiculos(restantes);
      setMensaje("¡Muy bien! El carro encontró la salida.");

      if (restantes.length === 0) {
        avanzarNivel(puntaje + 10);
      } else {
        programar(() => {
          setProcesando(false);
          bloqueoRef.current = false;
        }, 320);
      }
    } catch (error) {
      console.log(error);
      setMensaje("No pudimos mover ese carro. Intenta nuevamente.");
      programar(() => {
        setProcesando(false);
        bloqueoRef.current = false;
      }, 650);
    }
  };

  const reiniciarNivel = () => {
    if (temporizadorRef.current) {
      clearTimeout(temporizadorRef.current);
    }

    const nivelReiniciado = crearNivelConPosicionesAleatorias(
      nivelesCarJam[indiceNivel]
    );
    setNivel(nivelReiniciado);
    setVehiculos(nivelReiniciado.vehiculos);
    setMensaje(
      "Nivel reiniciado con nuevas posiciones. Conservas los puntos anteriores."
    );
    setVehiculoDestacado(null);
    setProcesando(false);
    bloqueoRef.current = false;
    transicionRef.current = false;
  };

  const mostrarPista = () => {
    if (procesando || transicionRef.current) {
      return;
    }

    try {
      const sugerido = vehiculos.find((vehiculo) =>
        puedeSalir(vehiculo, vehiculos, nivel.filas, nivel.columnas)
      );

      if (sugerido) {
        setVehiculoDestacado(sugerido.id);
        setMensaje("Pista: el carro iluminado tiene el camino libre.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tituloBox}>
          <Image
            source={require("../assets/imagenes/carJam/car-rojo.png")}
            style={styles.iconoCarro}
            resizeMode="contain"
          />
          <Text style={styles.titulo}>Car Jam</Text>
        </View>

        <View style={styles.panelSuperior}>
          <IndicadorNivel
            nivelActual={indiceNivel + 1}
            totalNiveles={nivelesCarJam.length}
          />

          <View style={styles.puntajeBox}>
            <Text style={styles.puntajeEtiqueta}>Puntaje</Text>
            <Text style={styles.puntaje}>{puntaje}/30</Text>
          </View>
        </View>

        <Text style={styles.instruccion}>
          Sigue la flecha y despeja el camino hasta el borde.
        </Text>

        <TableroCarJam
          filas={nivel.filas}
          columnas={nivel.columnas}
          vehiculos={vehiculos}
          tamano={tamanoTablero}
          onVehiculoPress={seleccionarVehiculo}
          deshabilitado={procesando}
          vehiculoDestacado={vehiculoDestacado}
        />

        <View style={styles.estado}>
          <Text style={styles.restantes}>
            Vehículos restantes: {vehiculos.length}
          </Text>
          <Text accessibilityLiveRegion="polite" style={styles.mensaje}>
            {mensaje}
          </Text>
        </View>

        <View style={styles.acciones}>
          <TouchableOpacity
            style={[styles.boton, styles.botonPista]}
            onPress={mostrarPista}
            disabled={procesando}
          >
            <Ionicons name="bulb" size={20} color="#6F5A21" />
            <Text style={styles.textoPista}>Pista</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boton, styles.botonReiniciar]}
            onPress={reiniciarNivel}
            disabled={transicionRef.current}
          >
            <Ionicons name="refresh" size={20} color="#6D641F" />
            <Text style={styles.textoReiniciar}>Reiniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boton, styles.botonVolver]}
            onPress={() => navigation.navigate("Menu")}
          >
            <Ionicons name="map-outline" size={20} color="#2D6F83" />
            <Text style={styles.textoVolver}>Menú</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BarraInferior navigation={navigation} activo="carjam" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFAFF",
  },
  contenido: {
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 110,
  },
  tituloBox: {
    minWidth: 210,
    backgroundColor: "#BDF2CC",
    borderRadius: 30,
    borderBottomWidth: 5,
    borderBottomColor: "#47785D",
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  iconoCarro: {
    width: 34,
    height: 45,
    marginRight: 12,
  },
  titulo: {
    color: "#2D6F83",
    fontSize: 26,
    fontWeight: "bold",
  },
  panelSuperior: {
    width: "100%",
    maxWidth: 390,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#D9E8EE",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    elevation: 2,
  },
  puntajeBox: {
    alignItems: "center",
  },
  puntajeEtiqueta: {
    color: "#7A8F96",
    fontSize: 13,
    fontWeight: "bold",
  },
  puntaje: {
    color: "#2D6F83",
    fontSize: 21,
    fontWeight: "bold",
  },
  instruccion: {
    color: "#5A777F",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 11,
    paddingHorizontal: 8,
  },
  estado: {
    width: "100%",
    maxWidth: 390,
    minHeight: 72,
    backgroundColor: "white",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#D9E8EE",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 13,
  },
  restantes: {
    color: "#2D6F83",
    fontSize: 16,
    fontWeight: "bold",
  },
  mensaje: {
    color: "#5A777F",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 4,
  },
  acciones: {
    width: "100%",
    maxWidth: 390,
    flexDirection: "row",
    marginTop: 13,
  },
  boton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  botonReiniciar: {
    backgroundColor: "#FFF19B",
    borderBottomWidth: 4,
    borderBottomColor: "#D8C95D",
    marginHorizontal: 4,
  },
  botonPista: {
    backgroundColor: "#E6D97D",
    borderBottomWidth: 4,
    borderBottomColor: "#8C8032",
    marginRight: 4,
  },
  botonVolver: {
    backgroundColor: "#DFF3FA",
    borderBottomWidth: 4,
    borderBottomColor: "#8DD4EA",
    marginLeft: 4,
  },
  textoReiniciar: {
    color: "#6D641F",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 7,
  },
  textoVolver: {
    color: "#2D6F83",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 7,
  },
  textoPista: {
    color: "#6F5A21",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
