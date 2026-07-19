import AsyncStorage from "@react-native-async-storage/async-storage";

const CLAVES = {
  nombre: "@mini_mundo:nombre",
  ultimoResultado: "@mini_mundo:ultimo_resultado",
  mejoresPuntajes: "@mini_mundo:mejores_puntajes",
  historial: "@mini_mundo:historial",
  progresoCarJam: "@mini_mundo:progreso_car_jam",
};

const leerJSON = async (clave, valorPredeterminado) => {
  try {
    const valor = await AsyncStorage.getItem(clave);
    return valor ? JSON.parse(valor) : valorPredeterminado;
  } catch (error) {
    console.log("No se pudo leer la información local:", error);
    return valorPredeterminado;
  }
};

/** Guarda o actualiza el nombre del jugador. */
export const guardarNombre = async (nombre) => {
  const nombreLimpio = typeof nombre === "string" ? nombre.trim() : "";

  if (!nombreLimpio) {
    throw new Error("El nombre del jugador no puede estar vacío.");
  }

  await AsyncStorage.setItem(CLAVES.nombre, nombreLimpio);
  return nombreLimpio;
};

/** Obtiene el nombre guardado del jugador. */
export const obtenerNombre = async () => {
  try {
    return (await AsyncStorage.getItem(CLAVES.nombre)) || "";
  } catch (error) {
    console.log("No se pudo obtener el nombre:", error);
    return "";
  }
};

/** Obtiene el historial completo, ordenado del más reciente al más antiguo. */
export const obtenerHistorial = async () =>
  leerJSON(CLAVES.historial, []);

/** Obtiene el último resultado almacenado. */
export const obtenerUltimoResultado = async () =>
  leerJSON(CLAVES.ultimoResultado, null);

/** Obtiene los mejores puntajes separados por minijuego. */
export const obtenerMejoresPuntajes = async () =>
  leerJSON(CLAVES.mejoresPuntajes, {});

/**
 * Guarda un resultado, actualiza el historial y conserva el mejor puntaje
 * del minijuego correspondiente.
 */
export const guardarResultado = async (resultado) => {
  if (!resultado || typeof resultado !== "object") {
    throw new TypeError("El resultado debe ser un objeto válido.");
  }

  const puntaje = Number(resultado.puntaje);
  const total = Number(resultado.total);
  const tipo = resultado.tipo || "Actividad";

  if (!Number.isFinite(puntaje) || !Number.isFinite(total) || total <= 0) {
    throw new Error("El resultado no contiene un puntaje válido.");
  }

  const resultadoCompleto = {
    ...resultado,
    id: resultado.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    puntaje,
    total,
    tipo,
    fecha: resultado.fecha || new Date().toISOString(),
  };

  const [historial, mejoresPuntajes] = await Promise.all([
    obtenerHistorial(),
    obtenerMejoresPuntajes(),
  ]);

  const mejorActual = mejoresPuntajes[tipo];
  const porcentajeActual = puntaje / total;
  const porcentajeMejor = mejorActual
    ? mejorActual.puntaje / mejorActual.total
    : -1;

  const nuevosMejores =
    porcentajeActual > porcentajeMejor
      ? { ...mejoresPuntajes, [tipo]: resultadoCompleto }
      : mejoresPuntajes;

  const nuevoHistorial = [resultadoCompleto, ...historial].slice(0, 50);

  await AsyncStorage.multiSet([
    [CLAVES.ultimoResultado, JSON.stringify(resultadoCompleto)],
    [CLAVES.historial, JSON.stringify(nuevoHistorial)],
    [CLAVES.mejoresPuntajes, JSON.stringify(nuevosMejores)],
  ]);

  return resultadoCompleto;
};

/** Elimina resultados e historial, pero conserva el nombre del jugador. */
export const borrarHistorial = async () => {
  await AsyncStorage.multiRemove([
    CLAVES.ultimoResultado,
    CLAVES.historial,
    CLAVES.mejoresPuntajes,
    CLAVES.progresoCarJam,
  ]);
};

/** Guarda el último nivel completado de Car Jam. */
export const guardarProgresoCarJam = async (nivelCompletado, puntaje) => {
  const progreso = {
    nivelCompletado: Math.max(0, Number(nivelCompletado) || 0),
    puntaje: Math.max(0, Number(puntaje) || 0),
    fecha: new Date().toISOString(),
  };

  await AsyncStorage.setItem(CLAVES.progresoCarJam, JSON.stringify(progreso));
  return progreso;
};

/** Obtiene el progreso guardado de Car Jam. */
export const obtenerProgresoCarJam = async () =>
  leerJSON(CLAVES.progresoCarJam, {
    nivelCompletado: 0,
    puntaje: 0,
  });
