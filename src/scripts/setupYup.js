import * as yup from 'yup'

export const setupYup = (i18nInstance) => {
  yup.setLocale({
    mixed: {
      required: i18nInstance.t('feedback.emptyField'),
    },
    string: {
      url: i18nInstance.t('feedback.invalidUrl'),
    },
  })
}
