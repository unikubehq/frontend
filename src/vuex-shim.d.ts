// vuex-shim.d.ts
import type { DollarApollo } from 'vue-apollo/types/vue-apollo';
import type { UnikubeAbility } from '@/typing';
import { Store } from 'vuex';
import type { State as AuthState } from '@/store/auth/state';
import type { State as ContextState } from '@/store/context/state';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    ability?: UnikubeAbility;
  }
}
declare module '@vue/runtime-core' {

  interface ComponentCustomProperties {
    $store: Store<AuthState, ContextState>;
    $apollo: DollarApollo<this>;
    $ability: UnikubeAbility;
    $can(this: this, ...args: Parameters<UnikubeAbility['can']>): boolean;
    validations: any;
  }
}
