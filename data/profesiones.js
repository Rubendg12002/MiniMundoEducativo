import { mezclarElementos } from "../utils/aleatorio";

/** Opciones visuales compartidas por cada pregunta de profesiones. */
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

/**
 * Banco inmutable de preguntas. La pantalla nunca modifica este arreglo:
 * crearPartidaProfesiones clona y mezcla sus preguntas y opciones.
 */
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

/**
 * Crea una partida independiente con preguntas y respuestas reordenadas.
 * La respuesta correcta se conserva por nombre, por lo que el cambio de
 * posición no altera la evaluación del jugador.
 *
 * @param {() => number} aleatorio Generador opcional para pruebas repetibles.
 * @returns {Array<object>} Preguntas preparadas para una nueva partida.
 */
export const crearPartidaProfesiones = (aleatorio = Math.random) =>
  mezclarElementos(preguntasProfesiones, aleatorio).map((pregunta) => ({
    ...pregunta,
    opciones: mezclarElementos(pregunta.opciones, aleatorio),
  }));
