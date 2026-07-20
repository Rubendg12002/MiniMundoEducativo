import { mezclarElementos } from "../utils/aleatorio";

const DIRECCIONES = {
  arriba: { fila: -1, columna: 0 },
  abajo: { fila: 1, columna: 0 },
  izquierda: { fila: 0, columna: -1 },
  derecha: { fila: 0, columna: 1 },
};

const dimensionesValidas = (filas, columnas) =>
  Number.isInteger(filas) &&
  filas > 0 &&
  Number.isInteger(columnas) &&
  columnas > 0;

/**
 * Obtiene la casilla siguiente según la dirección indicada.
 */
export const obtenerSiguientePosicion = (fila, columna, direccion) => {
  const movimiento = DIRECCIONES[direccion];

  if (!movimiento) {
    throw new Error(`Dirección inválida: ${direccion}`);
  }

  if (!Number.isInteger(fila) || !Number.isInteger(columna)) {
    throw new TypeError("La fila y la columna deben ser números enteros.");
  }

  return {
    fila: fila + movimiento.fila,
    columna: columna + movimiento.columna,
  };
};

/**
 * Indica si una posición está fuera de los límites del tablero.
 */
export const estaFueraDelTablero = (posicion, filas, columnas) => {
  if (!dimensionesValidas(filas, columnas)) {
    throw new Error("El tablero debe tener dimensiones enteras mayores que cero.");
  }

  if (
    !posicion ||
    !Number.isInteger(posicion.fila) ||
    !Number.isInteger(posicion.columna)
  ) {
    throw new TypeError("La posición debe incluir una fila y una columna válidas.");
  }

  return (
    posicion.fila < 0 ||
    posicion.fila >= filas ||
    posicion.columna < 0 ||
    posicion.columna >= columnas
  );
};

/**
 * Revisa si una casilla contiene otro vehículo activo.
 */
export const estaPosicionOcupada = (
  vehiculos,
  fila,
  columna,
  idIgnorado = null
) => {
  if (!Array.isArray(vehiculos)) {
    throw new TypeError("Los vehículos deben enviarse en un arreglo.");
  }

  return vehiculos.some(
    (vehiculo) =>
      vehiculo &&
      vehiculo.activo !== false &&
      vehiculo.id !== idIgnorado &&
      vehiculo.fila === fila &&
      vehiculo.columna === columna
  );
};

/**
 * Determina si un vehículo tiene el camino libre hasta salir del tablero.
 */
export const puedeSalir = (vehiculo, vehiculos, filas, columnas) => {
  if (!vehiculo || !vehiculo.id) {
    throw new Error("No se encontró el vehículo seleccionado.");
  }

  if (!Array.isArray(vehiculos)) {
    throw new TypeError("Los vehículos deben enviarse en un arreglo.");
  }

  if (!dimensionesValidas(filas, columnas)) {
    throw new Error("El nivel no tiene dimensiones válidas.");
  }

  if (
    !vehiculos.some(
      (item) => item?.id === vehiculo.id && item.activo !== false
    )
  ) {
    throw new Error("El vehículo no está activo en este nivel.");
  }

  let posicion = obtenerSiguientePosicion(
    vehiculo.fila,
    vehiculo.columna,
    vehiculo.direccion
  );

  while (!estaFueraDelTablero(posicion, filas, columnas)) {
    if (
      estaPosicionOcupada(
        vehiculos,
        posicion.fila,
        posicion.columna,
        vehiculo.id
      )
    ) {
      return false;
    }

    posicion = obtenerSiguientePosicion(
      posicion.fila,
      posicion.columna,
      vehiculo.direccion
    );
  }

  return true;
};

/**
 * Valida dimensiones, identificadores y posiciones de un nivel.
 */
export const validarNivel = (nivel) => {
  const errores = [];

  if (!nivel || typeof nivel !== "object") {
    return { esValido: false, errores: ["El nivel no es un objeto válido."] };
  }

  if (!dimensionesValidas(nivel.filas, nivel.columnas)) {
    errores.push("Las dimensiones del nivel no son válidas.");
  }

  if (!Array.isArray(nivel.vehiculos) || nivel.vehiculos.length === 0) {
    errores.push("El nivel debe incluir al menos un vehículo.");
    return { esValido: false, errores };
  }

  const ids = new Set();
  const posiciones = new Set();

  nivel.vehiculos.forEach((vehiculo, indice) => {
    if (!vehiculo || !vehiculo.id) {
      errores.push(`El vehículo ${indice + 1} no tiene identificador.`);
      return;
    }

    if (ids.has(vehiculo.id)) {
      errores.push(`El identificador ${vehiculo.id} está repetido.`);
    }
    ids.add(vehiculo.id);

    if (!DIRECCIONES[vehiculo.direccion]) {
      errores.push(`El vehículo ${vehiculo.id} tiene una dirección inválida.`);
    }

    if (!vehiculo.color || !vehiculo.textura) {
      errores.push(`El vehículo ${vehiculo.id} tiene datos visuales incompletos.`);
    }

    const posicionValida =
      Number.isInteger(vehiculo.fila) && Number.isInteger(vehiculo.columna);

    if (!posicionValida) {
      errores.push(`El vehículo ${vehiculo.id} no tiene una posición válida.`);
      return;
    }

    if (
      dimensionesValidas(nivel.filas, nivel.columnas) &&
      estaFueraDelTablero(
        { fila: vehiculo.fila, columna: vehiculo.columna },
        nivel.filas,
        nivel.columnas
      )
    ) {
      errores.push(`El vehículo ${vehiculo.id} está fuera del tablero.`);
    }

    const clavePosicion = `${vehiculo.fila}-${vehiculo.columna}`;
    if (posiciones.has(clavePosicion)) {
      errores.push(`Hay vehículos superpuestos en ${clavePosicion}.`);
    }
    posiciones.add(clavePosicion);
  });

  return { esValido: errores.length === 0, errores };
};

/**
 * Crea una copia independiente del nivel y sus vehículos.
 */
export const clonarNivel = (nivel) => {
  const validacion = validarNivel(nivel);

  if (!validacion.esValido) {
    throw new Error(`Nivel inválido: ${validacion.errores.join(" ")}`);
  }

  return {
    ...nivel,
    vehiculos: nivel.vehiculos.map((vehiculo) => ({
      ...vehiculo,
      activo: vehiculo.activo !== false,
    })),
  };
};

/** Obtiene una secuencia completa de salida o null si el tablero se bloquea. */
export const obtenerSecuenciaSolucion = (nivel) => {
  const copia = clonarNivel(nivel);
  let restantes = copia.vehiculos;
  const secuencia = [];

  while (restantes.length > 0) {
    const siguiente = restantes.find((vehiculo) =>
      puedeSalir(vehiculo, restantes, copia.filas, copia.columnas)
    );

    if (!siguiente) {
      return null;
    }

    secuencia.push(siguiente.id);
    restantes = restantes.filter((vehiculo) => vehiculo.id !== siguiente.id);
  }

  return secuencia;
};

const crearCasillas = (filas, columnas) => {
  const casillas = [];

  for (let fila = 0; fila < filas; fila += 1) {
    for (let columna = 0; columna < columnas; columna += 1) {
      casillas.push({ fila, columna });
    }
  }

  return casillas;
};

const crearCandidato = (nivel, casillas) => ({
  ...nivel,
  vehiculos: nivel.vehiculos.map((vehiculo, indice) => ({
    ...vehiculo,
    ...casillas[indice],
    activo: true,
  })),
});

/**
 * Genera nuevas posiciones sin alterar las direcciones ni la apariencia.
 * Solo acepta tableros válidos, diferentes, no triviales y resolubles.
 */
export const crearNivelConPosicionesAleatorias = (
  nivel,
  aleatorio = Math.random
) => {
  const base = clonarNivel(nivel);
  const casillas = crearCasillas(base.filas, base.columnas);
  const minimoMovidos = Math.ceil(base.vehiculos.length * 0.6);
  const minimoBloqueados = Math.max(
    1,
    Math.ceil(base.vehiculos.length * 0.35)
  );

  const buscarCandidato = (exigirDificultad) => {
    for (let intento = 0; intento < 500; intento += 1) {
      const posiciones = mezclarElementos(casillas, aleatorio).slice(
        0,
        base.vehiculos.length
      );
      const candidato = crearCandidato(base, posiciones);
      const movidos = candidato.vehiculos.filter(
        (vehiculo, indice) =>
          vehiculo.fila !== base.vehiculos[indice].fila ||
          vehiculo.columna !== base.vehiculos[indice].columna
      ).length;

      if (movidos < minimoMovidos) {
        continue;
      }

      const movibles = candidato.vehiculos.filter((vehiculo) =>
        puedeSalir(
          vehiculo,
          candidato.vehiculos,
          candidato.filas,
          candidato.columnas
        )
      ).length;
      const bloqueados = candidato.vehiculos.length - movibles;

      if (
        movibles === 0 ||
        (exigirDificultad && bloqueados < minimoBloqueados)
      ) {
        continue;
      }

      if (obtenerSecuenciaSolucion(candidato)) {
        return candidato;
      }
    }

    return null;
  };

  return buscarCandidato(true) || buscarCandidato(false) || base;
};
