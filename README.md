# MiniMundoEducativo

Aplicación educativa infantil desarrollada con React Native y Expo SDK 54. Combina una actividad central de reconocimiento de vocales en sonidos de animales con dos juegos complementarios, progreso local y una interfaz táctil de alto contraste para Android e iOS.

## Funcionalidades

- **Vocales y sonidos:** el niño escucha, identifica y encierra las vocales de `CUAC`, `MIAU`, `MUUU`, `GUAU` y `CROAC`; cada animal reproduce su sonido automáticamente y permite repetirlo.
- **Resultados educativos:** muestra el total encontrado de A, E, I, O y U, los intentos con consonantes y el puntaje final.
- **Car Jam:** genera posiciones nuevas de forma inteligente, conserva la dirección de cada carro y acepta únicamente tableros válidos, con bloqueos y solución completa.
- **Profesiones:** cambia el orden de las preguntas y de las respuestas en cada partida.
- **Perfil local:** conserva el nombre o apodo del jugador.
- **Historial:** guarda hasta 50 resultados y permite consultarlos o eliminarlos.
- **Juegos complementarios:** Profesiones y Car Jam.
- **Uso sin conexión:** los recursos y los datos principales permanecen en el dispositivo.

## Estructura

```text
MiniMundoEducativo/
├── App.js                         # Contenedor de navegación
├── navegacion/AppNavigator.js     # Stack principal (10 pantallas)
├── pantallas/                     # Inicio, menú, juegos, historial y resultados
├── componentes/                   # Cabecera, barra inferior y piezas reutilizables
│   └── carJam/                    # Tablero, vehículos e indicador de nivel
├── data/                          # Preguntas, sonidos y niveles declarativos
├── game/carJamLogic.js            # Reglas puras del rompecabezas
├── storage/storage.js             # CRUD local con AsyncStorage
├── assets/imagenes/               # Ilustraciones y texturas locales
├── app.json                       # Configuración Expo
├── eas.json                       # Perfiles APK/AAB de EAS Build
└── PRIVACY_POLICY.md              # Política de privacidad base
```

## Persistencia local

`storage/storage.js` encapsula AsyncStorage y ofrece operaciones para crear, consultar, actualizar y borrar datos:

- `guardarNombre()` / `obtenerNombre()`;
- `guardarResultado()` / `obtenerHistorial()`;
- `obtenerUltimoResultado()` / `obtenerMejoresPuntajes()`;
- `borrarHistorial()`;
- `guardarProgresoCarJam()` / `obtenerProgresoCarJam()`.

No se requiere backend ni conexión de red.

## Requisitos

- Node.js 20.19 o posterior.
- npm.
- Expo Go o un emulador compatible con Expo SDK 54.

## Instalación y ejecución

```bash
npm install
npx expo start
```

Comandos alternativos:

```bash
npm run android
npm run ios
npm run web
```

## Compilación para Android

Antes de compilar se debe definir un identificador único en `app.json`, por ejemplo `expo.android.package`, y vincular el proyecto con una cuenta Expo mediante `eas init`.

```bash
npx eas-cli build --platform android --profile preview
```

El perfil `preview` produce un APK instalable para pruebas. Para generar el Android App Bundle destinado a Google Play:

```bash
npx eas-cli build --platform android --profile production
```

La firma se administra con las credenciales seleccionadas durante EAS Build. La publicación final requiere cuenta de Google Play Console, ficha de tienda, capturas, clasificación de contenido y una URL pública para la política de privacidad.

## Recursos visuales y licencias

Los carros de Car Jam provienen del [Kenney Racing Pack](https://www.kenney.nl/assets/racing-pack), publicado bajo Creative Commons CC0; la copia de la licencia está en `assets/imagenes/carJam/LICENSE-KENNEY.txt`. La carretera y las ilustraciones nuevas de pato y rana son recursos locales creados para este proyecto.

## Privacidad

La aplicación no usa cuentas, publicidad ni analítica. El nombre y los puntajes se guardan solo en el dispositivo. La política base se encuentra en [PRIVACY_POLICY.md](PRIVACY_POLICY.md) y debe completarse con un correo y una URL pública antes de publicar.

## Alcance pendiente de publicación

El código y los perfiles de compilación quedan preparados, pero el identificador definitivo, la firma, la generación del AAB y el envío a Google Play dependen de las cuentas y credenciales del propietario.
