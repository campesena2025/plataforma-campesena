import { useAsociacionesStore } from './asociaciones.store';

export const resetAllStores = () => {
  useAsociacionesStore.getState().reset();
};
