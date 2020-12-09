import {
  Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'ui' })
export default class UI extends VuexModule {
  overlay = false;

  @Mutation
  setOverlay(overlay: boolean): void {
    this.overlay = overlay;
  }
}
