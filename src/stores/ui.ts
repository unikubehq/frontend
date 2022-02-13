import { defineStore } from 'pinia';

interface State {
  overlay: boolean
}

const useUIStore = defineStore('ui', {
  state: (): State => ({
    overlay: false,
  }),
});

export default useUIStore;
