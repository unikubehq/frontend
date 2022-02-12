import { TranslateResult, useI18n } from 'vue-i18n';
import { ErrorObject } from '@vuelidate/core';

export default function getErrorMessage(errors: ErrorObject[]): TranslateResult[] {
  const { t } = useI18n({ useScope: 'global' });
  return errors.map((error) => t(`errors.${error.$property}Error`));
}
