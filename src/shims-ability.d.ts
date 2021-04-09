import { UnikubeAbility } from '@/typing';

declare module 'vue/types/vue' {
  interface Vue {
    $ability: UnikubeAbility;
    $can(this: this, ...args: Parameters<UnikubeAbility['can']>): boolean;
  }
}
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    ability?: UnikubeAbility;
  }
}
