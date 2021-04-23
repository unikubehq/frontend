import {
  Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { UnikubeError } from '@/typing/index';

@Module({ namespaced: true, name: 'errors' })
export default class Errors extends VuexModule {
  errors: UnikubeError[] = []

  @Mutation
  /* eslint-disable @typescript-eslint/no-explicit-any */
  setError(payload: { error: Error, location: string, message: string, id: number }): void {
    this.errors.push(
      {
        error: payload.error,
        message: payload.message,
        location: payload.location,
      },
    );
    // TODO Send to Sentry
  }

  @Mutation
  clearError(): void {
    this.errors.pop();
  }
}
