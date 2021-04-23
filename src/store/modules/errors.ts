import {
  Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { UnikubeError } from '@/typing/index';

const errorCodeMapping: any = {
  100: 'errors.100',
  101: 'errors.101',
};

@Module({ namespaced: true, name: 'errors' })
export default class Errors extends VuexModule {
  errors: UnikubeError[] = []

  @Mutation
  /* eslint-disable @typescript-eslint/no-explicit-any */
  setError(payload: { error: Error, location: string, code: number }): void {
    if (!this.errors.some((el) => el.code === payload.code)) {
      this.errors.push(
        {
          error: payload.error,
          message: errorCodeMapping[payload.code],
          location: payload.location,
          code: payload.code,
        },
      );
    }
    // TODO Send to Sentry
  }

  @Mutation
  clearError(): void {
    this.errors.pop();
  }
}
