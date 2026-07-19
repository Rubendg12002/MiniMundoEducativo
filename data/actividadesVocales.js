export const VOCALES = ["A", "E", "I", "O", "U"];

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

/** Cuenta las vocales presentes en un texto. */
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

export const totalVocalesActividad = actividadesVocales.reduce(
  (total, actividad) =>
    total +
    Object.values(contarVocales(actividad.sonido)).reduce(
      (subtotal, cantidad) => subtotal + cantidad,
      0
    ),
  0
);
