export const preguntasAnimales = [
  {
    pregunta: "¿Quién hace MUUU?",
    respuestaCorrecta: "MUUU",
    opciones: [
      { texto: "GUAU", imagen: require("../assets/imagenes/perro.png") },
      { texto: "MIAU", imagen: require("../assets/imagenes/gato.png") },
      { texto: "MUUU", imagen: require("../assets/imagenes/vaca.png") },
    ],
  },
  {
    pregunta: "¿Quién hace MIAU?",
    respuestaCorrecta: "MIAU",
    opciones: [
      { texto: "CUAC", imagen: require("../assets/imagenes/pato.png") },
      { texto: "MIAU", imagen: require("../assets/imagenes/gato.png") },
      { texto: "CROAC", imagen: require("../assets/imagenes/rana.png") },
    ],
  },
  {
    pregunta: "¿Quién hace GUAU?",
    respuestaCorrecta: "GUAU",
    opciones: [
      { texto: "GUAU", imagen: require("../assets/imagenes/perro.png") },
      { texto: "MUUU", imagen: require("../assets/imagenes/vaca.png") },
      { texto: "MIAU", imagen: require("../assets/imagenes/gato.png") },
    ],
  },
  {
    pregunta: "¿Quién hace CUAC?",
    respuestaCorrecta: "CUAC",
    opciones: [
      { texto: "CROAC", imagen: require("../assets/imagenes/rana.png") },
      { texto: "CUAC", imagen: require("../assets/imagenes/pato.png") },
      { texto: "GUAU", imagen: require("../assets/imagenes/perro.png") },
    ],
  },
  {
    pregunta: "¿Quién hace CROAC?",
    respuestaCorrecta: "CROAC",
    opciones: [
      { texto: "MIAU", imagen: require("../assets/imagenes/gato.png") },
      { texto: "MUUU", imagen: require("../assets/imagenes/vaca.png") },
      { texto: "CROAC", imagen: require("../assets/imagenes/rana.png") },
    ],
  },
];

export const preguntasNumeros = [
  {
    pregunta: "¿Cuántas manzanas hay?",
    cantidad: 2,
    imagen: require("../assets/imagenes/manzana.png"),
    opciones: [1, 2, 3],
  },
  {
    pregunta: "¿Cuántas manzanas hay?",
    cantidad: 3,
    imagen: require("../assets/imagenes/manzana.png"),
    opciones: [2, 3, 4],
  },
  {
    pregunta: "¿Cuántas manzanas hay?",
    cantidad: 4,
    imagen: require("../assets/imagenes/manzana.png"),
    opciones: [3, 4, 5],
  },
  {
    pregunta: "¿Cuántas manzanas hay?",
    cantidad: 5,
    imagen: require("../assets/imagenes/manzana.png"),
    opciones: [4, 5, 6],
  },
];

export const preguntasColores = [
  {
    pregunta: "¿Qué color es?",
    color: "Azul",
    colorVisual: "#3B82F6",
    opciones: [
      { texto: "Azul", color: "#3B82F6" },
      { texto: "Verde", color: "#22C55E" },
      { texto: "Rojo", color: "#EF4444" },
    ],
  },
  {
    pregunta: "¿Qué color es?",
    color: "Rojo",
    colorVisual: "#EF4444",
    opciones: [
      { texto: "Azul", color: "#3B82F6" },
      { texto: "Verde", color: "#22C55E" },
      { texto: "Rojo", color: "#EF4444" },
    ],
  },
  {
    pregunta: "¿Qué color es?",
    color: "Verde",
    colorVisual: "#22C55E",
    opciones: [
      { texto: "Amarillo", color: "#EAB308" },
      { texto: "Verde", color: "#22C55E" },
      { texto: "Morado", color: "#9333EA" },
    ],
  },
  {
    pregunta: "¿Qué color es?",
    color: "Amarillo",
    colorVisual: "#EAB308",
    opciones: [
      { texto: "Rojo", color: "#EF4444" },
      { texto: "Azul", color: "#3B82F6" },
      { texto: "Amarillo", color: "#EAB308" },
    ],
  },
];

export const preguntasProfesiones = [
  {
    pregunta: "¿Cuál es el doctor?",
    respuestaCorrecta: "doctor",
    opciones: [
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
    ],
  },

  {
    pregunta: "¿Cuál es la enfermera?",
    respuestaCorrecta: "enfermera",
    opciones: [
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
    ],
  },

  {
    pregunta: "¿Cuál es el cocinero?",
    respuestaCorrecta: "cocinero",
    opciones: [
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
    ],
  },

  {
    pregunta: "¿Cuál es el bombero?",
    respuestaCorrecta: "bombero",
    opciones: [
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
    ],
  },
];
