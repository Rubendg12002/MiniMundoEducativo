/**
 * Mezcla un arreglo usando Fisher-Yates.
 *
 * Se crea una copia antes de intercambiar posiciones, por lo que las listas
 * originales (por ejemplo, las preguntas base) nunca se modifican. El
 * segundo parámetro permite inyectar un generador pseudoaleatorio durante
 * pruebas y deja que cada partida produzca una distribución distinta.
 *
 * @param {Array<unknown>} elementos Valores que se desean reordenar.
 * @param {() => number} aleatorio Función que devuelve un número en [0, 1).
 * @returns {Array<unknown>} Nueva copia con sus elementos mezclados.
 * @throws {TypeError} Si elementos no es un arreglo.
 */
export const mezclarElementos = (elementos, aleatorio = Math.random) => {
  if (!Array.isArray(elementos)) {
    throw new TypeError("Los elementos deben enviarse en un arreglo.");
  }

  const mezcla = [...elementos];

  for (let indice = mezcla.length - 1; indice > 0; indice -= 1) {
    const posicion = Math.floor(aleatorio() * (indice + 1));
    [mezcla[indice], mezcla[posicion]] = [mezcla[posicion], mezcla[indice]];
  }

  return mezcla;
};
