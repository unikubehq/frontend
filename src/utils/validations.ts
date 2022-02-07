
Component.registerHooks(['validations']);

export default function setupErrorHandler() {
  const validatorMapping = [
    'email', 'required', 'url', 'minValue', 'maxValue',
  ]
  const handleErrors = (fieldName: string): TranslateResult[] => {
    const { t } = useI18n({ useScope: 'global' })
    const errors: TranslateResult[] = [];

    validatorMapping.forEach((value) => {
      if (!this.$v[fieldName][value] && value in this.$v[fieldName]) {
        errors.push(this.$t(`errors.${value}Error`));
      }
    });
    return this.$v[fieldName].$dirty ? errors : [];
  }

}