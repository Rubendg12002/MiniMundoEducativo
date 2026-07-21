/** Catálogo de vocales que se reconocen en todas las actividades. */
export const VOCALES = ["A", "E", "I", "O", "U"];

/**
 * Actividades de discriminación auditiva y visual.
 * Cada registro relaciona un animal, su onomatopeya, una imagen y el color
 * usado para presentar la tarjeta en VocalesAnimales.js.
 */
export const actividadesVocales = [
  {
    id: "pato",
    animal: "Pato",
    sonido: "CUAC",
    imagen: require("../assets/imagenes/pato.png"),
    color: "#FFF19B",
  },
  {
    id: "gato",
    animal: "Gato",
    sonido: "MIAU",
    imagen: require("../assets/imagenes/gato.png"),
    color: "#F9CDD2",
  },
  {
    id: "vaca",
    animal: "Vaca",
    sonido: "MUUU",
    imagen: require("../assets/imagenes/vaca.png"),
    color: "#DFF3FA",
  },
  {
    id: "perro",
    animal: "Perro",
    sonido: "GUAU",
    imagen: require("../assets/imagenes/perro.png"),
    color: "#FFD8A8",
  },
  {
    id: "rana",
    animal: "Rana",
    sonido: "CROAC",
    imagen: require("../assets/imagenes/rana.png"),
    color: "#BDF2CC",
  },
];

/**
 * Cuenta las apariciones de cada vocal en un texto.
 *
 * @param {string} texto Texto que se analizará; por defecto, vacío.
 * @returns {{A:number,E:number,I:number,O:number,U:number}} Conteo por vocal.
 */
export const contarVocales = (texto = "") => {
  const conteo = { A: 0, E: 0, I: 0, O: 0, U: 0 };

  texto
    .toUpperCase()
    .split("")
    .forEach((letra) => {
      if (VOCALES.includes(letra)) {
        conteo[letra] += 1;
      }
    });

  return conteo;
};

/** Total de respuestas correctas posibles en el juego completo. */
export const totalVocalesActividad = actividadesVocales.reduce(
  (total, actividad) =>
    total +
    Object.values(contarVocales(actividad.sonido)).reduce(
      (subtotal, cantidad) => subtotal + cantidad,
      0
    ),
  0
);
