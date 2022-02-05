// vuex-shim.d.ts
import { Store } from 'vuex';
import { State as AuthState } from '@/store/auth/state';
import { State as ContextState } from '@/store/context/state';
import { DollarApollo } from 'vue-apollo/types/vue-apollo';
import { UnikubeAbility } from '@/typing';

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
