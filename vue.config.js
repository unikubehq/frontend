// eslint-disable-next-line @typescript-eslint/no-var-requires
const SentryCliPlugin = require('@sentry/webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  const sentryAuthToken = fs.readFileSync('/run/secrets/SENTRY_AUTH_TOKEN', 'utf8');
  plugins.push(
    new SentryCliPlugin({
      // webpack specific configuration
      authToken: sentryAuthToken,
      include: '.',
      ignore: ['node_modules', 'babel.config.js', 'apollo.config.js', '.eslintrc.js'],
      release: `${process.env.VUE_APP_VERSION}`,
    }),
  );
}

module.exports = {
  transpileDependencies: [
    'vuetify',
    'vuex-module-decorators',
  ],
  configureWebpack: {
    devServer: {
      disableHostCheck: true,
    },
    plugins,
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
