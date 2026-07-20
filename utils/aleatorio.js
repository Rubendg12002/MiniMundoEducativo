/** Devuelve una copia mezclada sin modificar el arreglo original. */
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
