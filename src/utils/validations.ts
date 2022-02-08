import { TranslateResult, useI18n } from 'vue-i18n';
import useVuelidate from '@vuelidate/core';

export default function setupErrorHandler() {
  const validatorMapping = [
    'email', 'required', 'url', 'minValue', 'maxValue',
  ];
  const v = useVuelidate();

  const handleErrors = (fieldName: string): TranslateResult[] => {
    const { t } = useI18n({ useScope: 'global' });
    const errors: TranslateResult[] = [];

    validatorMapping.forEach((value) => {
      if (!v[fieldName][value] && value in v[fieldName]) {
        errors.push(t(`errors.${value}Error`));
      }
    });
    return v[fieldName].$dirty ? errors : [];
  };
  return {
    v, handleErrors,
  };
}
