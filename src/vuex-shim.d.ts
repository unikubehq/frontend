// vuex-shim.d.ts
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    context: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
