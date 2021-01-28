// eslint-disable-next-line @typescript-eslint/no-var-requires
const SentryCliPlugin = require('@sentry/webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-module-decorators',
  ],
  configureWebpack: {
    devServer: {
      disableHostCheck: true,
    },
    plugins: [
      new SentryCliPlugin({
        // sentry-cli configuration
        authToken: process.env.SENTRY_AUTH_TOKEN,
        dryRun: true,
        // webpack specific configuration
        include: '.',
        ignore: ['node_modules', 'babel.config.js', 'apollo.config.js', '.eslintrc.js'],
        release: process.env.VUE_APP_VERSION,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader');
  },
};
