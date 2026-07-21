import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Capa de persistencia local de la aplicación.
 *
 * Todas las pantallas usan este módulo en lugar de acceder directamente a
 * AsyncStorage. Así se centralizan las claves, la conversión JSON, la
 * validación de resultados y la compatibilidad con juegos retirados.
 */
const CLAVES = {
  nombre: "@mini_mundo:nombre",
  ultimoResultado: "@mini_mundo:ultimo_resultado",
  mejoresPuntajes: "@mini_mundo:mejores_puntajes",
  historial: "@mini_mundo:historial",
  progresoCarJam: "@mini_mundo:progreso_car_jam",
};

// Estos tipos pueden existir en instalaciones antiguas, pero ya no deben
// aparecer en el historial ni en los puntajes de la versión actual.
const TIPOS_RETIRADOS = new Set(["Animales", "Colores", "Numeros"]);

/**
 * Lee un valor JSON y devuelve un valor seguro cuando no existe o está
 * corrupto. El fallback evita que una entrada local dañada bloquee la app.
 *
 * @param {string} clave Clave de AsyncStorage que se leerá.
 * @param {*} valorPredeterminado Valor que se devuelve ante ausencia/error.
 * @returns {Promise<*>} Valor convertido desde JSON o el fallback.
 */
const leerJSON = async (clave, valorPredeterminado) => {
  try {
    const valor = await AsyncStorage.getItem(clave);
    return valor ? JSON.parse(valor) : valorPredeterminado;
  } catch (error) {
    console.log("No se pudo leer la información local:", error);
    return valorPredeterminado;
  }
};

/**
 * Guarda o actualiza el nombre del jugador.
 *
 * @param {string} nombre Nombre escrito en la pantalla de inicio.
 * @returns {Promise<string>} Nombre recortado que se guardó.
 * @throws {Error} Si el valor está vacío después de recortarlo.
 */
export const guardarNombre = async (nombre) => {
  const nombreLimpio = typeof nombre === "string" ? nombre.trim() : "";

  if (!nombreLimpio) {
    throw new Error("El nombre del jugador no puede estar vacío.");
  }

  await AsyncStorage.setItem(CLAVES.nombre, nombreLimpio);
  return nombreLimpio;
};

/**
 * Obtiene el nombre guardado del jugador.
 * @returns {Promise<string>} Nombre almacenado o cadena vacía si no existe.
 */
export const obtenerNombre = async () => {
  try {
    return (await AsyncStorage.getItem(CLAVES.nombre)) || "";
  } catch (error) {
    console.log("No se pudo obtener el nombre:", error);
    return "";
  }
};

/**
 * Obtiene el historial filtrando resultados de juegos retirados.
 * El orden se conserva porque guardarResultado antepone cada partida nueva.
 * @returns {Promise<Array<object>>} Resultados válidos del jugador.
 */
export const obtenerHistorial = async () => {
  const historial = await leerJSON(CLAVES.historial, []);
  return historial.filter((resultado) => !TIPOS_RETIRADOS.has(resultado.tipo));
};

/**
 * Obtiene el último resultado almacenado, siempre que pertenezca a un juego
 * que todavía forma parte del producto.
 * @returns {Promise<object|null>} Último resultado o null.
 */
export const obtenerUltimoResultado = async () => {
  const ultimoResultado = await leerJSON(CLAVES.ultimoResultado, null);
  return ultimoResultado && !TIPOS_RETIRADOS.has(ultimoResultado.tipo)
    ? ultimoResultado
    : null;
};

/**
 * Obtiene el mejor resultado de cada minijuego, excluyendo juegos retirados.
 * @returns {Promise<Record<string, object>>} Puntajes indexados por tipo.
 */
export const obtenerMejoresPuntajes = async () => {
  const mejoresPuntajes = await leerJSON(CLAVES.mejoresPuntajes, {});
  return Object.fromEntries(
    Object.entries(mejoresPuntajes).filter(
      ([tipo]) => !TIPOS_RETIRADOS.has(tipo)
    )
  );
};

/**
 * Guarda un resultado y actualiza las tres vistas de progreso:
 * último resultado, historial limitado a 50 entradas y mejor puntaje por
 * juego. La comparación del récord se hace por porcentaje, de modo que los
 * juegos con totales diferentes se puedan comparar correctamente.
 *
 * @param {object} resultado Datos del juego terminado.
 * @param {number} resultado.puntaje Puntos obtenidos.
 * @param {number} resultado.total Puntos posibles; debe ser mayor que cero.
 * @param {string} [resultado.tipo="Actividad"] Identificador del juego.
 * @returns {Promise<object>} Resultado normalizado y persistido.
 * @throws {TypeError|Error} Si faltan datos o el puntaje no es numérico.
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

/**
 * Elimina el progreso de juegos y el historial, pero conserva el nombre.
 * @returns {Promise<void>} Se resuelve al terminar el borrado local.
 */
export const borrarHistorial = async () => {
  await AsyncStorage.multiRemove([
    CLAVES.ultimoResultado,
    CLAVES.historial,
    CLAVES.mejoresPuntajes,
    CLAVES.progresoCarJam,
  ]);
};

/**
 * Guarda el último nivel completado de Car Jam y su puntaje acumulado.
 * @param {number} nivelCompletado Número del nivel terminado.
 * @param {number} puntaje Puntaje acumulado del juego.
 * @returns {Promise<object>} Progreso normalizado que se guardó.
 */
export const guardarProgresoCarJam = async (nivelCompletado, puntaje) => {
  const progreso = {
    nivelCompletado: Math.max(0, Number(nivelCompletado) || 0),
    puntaje: Math.max(0, Number(puntaje) || 0),
    fecha: new Date().toISOString(),
  };

  await AsyncStorage.setItem(CLAVES.progresoCarJam, JSON.stringify(progreso));
  return progreso;
};

/**
 * Obtiene el progreso de Car Jam.
 * @returns {Promise<{nivelCompletado:number, puntaje:number}>} Progreso o
 * valores iniciales cuando todavía no se ha completado ningún nivel.
 */
export const obtenerProgresoCarJam = async () =>
  leerJSON(CLAVES.progresoCarJam, {
    nivelCompletado: 0,
    puntaje: 0,
  });
