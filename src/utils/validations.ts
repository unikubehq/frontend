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
      if (!v.value[fieldName][value] && value in v.value[fieldName]) {
        errors.push(t(`errors.${value}Error`));
      }
    });
    return v.value[fieldName].$dirty ? errors : [];
  };
  return {
    v, handleErrors,
  };
}
