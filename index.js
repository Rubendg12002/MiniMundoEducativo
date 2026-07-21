import { registerRootComponent } from 'expo';

import App from './App';

/**
 * Punto de entrada nativo de Expo.
 * registerRootComponent registra App en AppRegistry y adapta el arranque tanto
 * para Expo Go como para una compilación nativa independiente.
 */
registerRootComponent(App);
