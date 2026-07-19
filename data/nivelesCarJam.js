const nivelesCarJam = [
  {
    id: 1,
    nombre: "Fácil",
    filas: 5,
    columnas: 5,
    vehiculos: [
      { id: "nivel1-rojo", fila: 4, columna: 2, direccion: "arriba", color: "#EF5350", emoji: "🚗", textura: "rojo", activo: true },
      { id: "nivel1-azul", fila: 1, columna: 2, direccion: "derecha", color: "#42A5F5", emoji: "🚙", textura: "azul", activo: true },
      { id: "nivel1-amarillo", fila: 2, columna: 0, direccion: "derecha", color: "#FFCA28", emoji: "🚕", textura: "amarillo", activo: true },
      { id: "nivel1-verde", fila: 2, columna: 4, direccion: "abajo", color: "#66BB6A", emoji: "🚐", textura: "verde", activo: true },
    ],
  },
  {
    id: 2,
    nombre: "Medio",
    filas: 5,
    columnas: 5,
    vehiculos: [
      { id: "nivel2-rojo", fila: 4, columna: 1, direccion: "arriba", color: "#EF5350", emoji: "🚗", textura: "rojo", activo: true },
      { id: "nivel2-morado", fila: 2, columna: 1, direccion: "izquierda", color: "#AB47BC", emoji: "🚙", textura: "negro", activo: true },
      { id: "nivel2-azul", fila: 0, columna: 3, direccion: "abajo", color: "#42A5F5", emoji: "🚐", textura: "azul", activo: true },
      { id: "nivel2-naranja", fila: 3, columna: 3, direccion: "derecha", color: "#FF7043", emoji: "🚕", textura: "rojo", activo: true },
      { id: "nivel2-amarillo", fila: 1, columna: 0, direccion: "derecha", color: "#FFCA28", emoji: "🏎️", textura: "amarillo", activo: true },
      { id: "nivel2-verde", fila: 1, columna: 4, direccion: "abajo", color: "#66BB6A", emoji: "🚙", textura: "verde", activo: true },
    ],
  },
  {
    id: 3,
    nombre: "Difícil",
    filas: 6,
    columnas: 6,
    vehiculos: [
      { id: "nivel3-rojo", fila: 5, columna: 2, direccion: "arriba", color: "#EF5350", emoji: "🚗", textura: "rojo", activo: true },
      { id: "nivel3-azul", fila: 2, columna: 2, direccion: "derecha", color: "#42A5F5", emoji: "🚙", textura: "azul", activo: true },
      { id: "nivel3-verde", fila: 2, columna: 4, direccion: "abajo", color: "#66BB6A", emoji: "🚐", textura: "verde", activo: true },
      { id: "nivel3-naranja", fila: 4, columna: 4, direccion: "izquierda", color: "#FF7043", emoji: "🚕", textura: "rojo", activo: true },
      { id: "nivel3-morado", fila: 4, columna: 1, direccion: "arriba", color: "#AB47BC", emoji: "🏎️", textura: "negro", activo: true },
      { id: "nivel3-amarillo", fila: 0, columna: 5, direccion: "abajo", color: "#FFCA28", emoji: "🚗", textura: "amarillo", activo: true },
      { id: "nivel3-rosa", fila: 3, columna: 5, direccion: "izquierda", color: "#EC407A", emoji: "🚙", textura: "rojo", activo: true },
      { id: "nivel3-celeste", fila: 0, columna: 0, direccion: "derecha", color: "#26C6DA", emoji: "🚐", textura: "azul", activo: true },
      { id: "nivel3-lima", fila: 0, columna: 3, direccion: "abajo", color: "#9CCC65", emoji: "🚕", textura: "verde", activo: true },
    ],
  },
];

export default nivelesCarJam;
