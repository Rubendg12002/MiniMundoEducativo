# MiniMundoEducativo

Aplicación educativa infantil desarrollada con React Native y Expo SDK 54. Presenta actividades táctiles, imágenes grandes y una interfaz de colores pastel diseñada para Android e iOS.

## Minijuegos

- Animales: reconocer animales y sus sonidos.
- Números: contar objetos.
- Colores: identificar colores.
- Profesiones: reconocer diferentes profesiones.
- Car Jam: liberar carros de una cuadrícula siguiendo su dirección.

## Car Jam

Car Jam es un rompecabezas 2D con tres niveles. Cada carro ocupa una casilla y apunta hacia arriba, abajo, izquierda o derecha. Cuando el jugador toca un carro, el juego revisa todas las casillas que están delante:

- Si otro vehículo bloquea el camino, el carro permanece en el tablero.
- Si el camino está libre hasta el borde, el carro sale.
- Al liberar todos los vehículos, el jugador obtiene 10 puntos y avanza.
- Los tres niveles permiten conseguir un máximo de 30 puntos.

El botón **Reiniciar** restaura únicamente el nivel actual y conserva los puntos obtenidos en niveles anteriores.

## Estructura de Car Jam

```text
assets/imagenes/carJam/
componentes/carJam/
  IndicadorNivel.js
  TableroCarJam.js
  VehiculoCarJam.js
data/nivelesCarJam.js
game/carJamLogic.js
pantallas/CarJam.js
```

Los niveles, la lógica y los componentes visuales se mantienen separados. Los carros utilizados pertenecen al [Kenney Racing Pack](https://www.kenney.nl/assets/racing-pack), publicado con licencia Creative Commons CC0. La licencia original se conserva en `assets/imagenes/carJam/LICENSE-KENNEY.txt`.

La textura de carretera es un recurso local generado para el proyecto. La aplicación no necesita conexión a internet para mostrar el tablero o los vehículos.

## Requisitos

- Node.js 20.19 o posterior.
- npm.
- Expo Go o un emulador compatible con Expo SDK 54.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npx expo start
```

También están disponibles:

```bash
npm run android
npm run ios
```

## Compatibilidad y dependencias

Car Jam utiliza componentes normales de React Native, la navegación Stack actual y los componentes `Header` y `BarraInferior` existentes. No requiere motores de videojuegos ni dependencias nuevas.

## Limitaciones actuales

- Los vehículos se controlan con toques; no existe arrastre ni física.
- Los niveles son fijos.
- La salida de los carros es inmediata y no tiene una animación compleja.
- El proyecto actual no persiste puntajes entre sesiones.

## Posibles mejoras

- Añadir más niveles y tableros rectangulares.
- Animar la salida de cada vehículo.
- Incorporar sonidos y vibración.
- Guardar el progreso y los mejores puntajes por minijuego.
