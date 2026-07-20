import { mezclarElementos } from "../utils/aleatorio";

const opcionesProfesiones = [
  {
    nombre: "doctor",
    imagen: require("../assets/imagenes/doctor.png"),
  },
  {
    nombre: "enfermera",
    imagen: require("../assets/imagenes/enfermera.png"),
  },
  {
    nombre: "cocinero",
    imagen: require("../assets/imagenes/cocinero.png"),
  },
  {
    nombre: "bombero",
    imagen: require("../assets/imagenes/bombero.png"),
  },
];

export const preguntasProfesiones = [
  {
    pregunta: "¿Cuál es el doctor?",
    respuestaCorrecta: "doctor",
    opciones: opcionesProfesiones,
  },
  {
    pregunta: "¿Cuál es la enfermera?",
    respuestaCorrecta: "enfermera",
    opciones: opcionesProfesiones,
  },
  {
    pregunta: "¿Cuál es el cocinero?",
    respuestaCorrecta: "cocinero",
    opciones: opcionesProfesiones,
  },
  {
    pregunta: "¿Cuál es el bombero?",
    respuestaCorrecta: "bombero",
    opciones: opcionesProfesiones,
  },
];

/** Crea una partida con preguntas y respuestas en posiciones diferentes. */
export const crearPartidaProfesiones = (aleatorio = Math.random) =>
  mezclarElementos(preguntasProfesiones, aleatorio).map((pregunta) => ({
    ...pregunta,
    opciones: mezclarElementos(pregunta.opciones, aleatorio),
  }));
