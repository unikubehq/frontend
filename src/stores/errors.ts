import { UnikubeError } from '@/typing';
import { defineStore } from 'pinia';

const errorCodeMapping: any = {
  100: 'errors.100',
  101: 'errors.101',
  200: 'SopsError',
  300: 'ClusterSettingsError',
};

interface State {
    errors: UnikubeError[]
}

const useErrorStore = defineStore('errors', {
  state: (): State => ({
    errors: [],
  }),
  actions: {
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
    },
    clearError(): void {
      this.errors.pop();
    },
  },
});

export default useErrorStore;
