// eslint-disable-next-line @typescript-eslint/no-var-requires
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const CopyPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const SentryCliPlugin = require('@sentry/webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  const sentryAuthToken = fs.readFileSync('/run/secrets/SENTRY_AUTH_TOKEN', 'utf8');
  plugins.push(
    new SentryCliPlugin({
      // webpack specific configuration
      authToken: sentryAuthToken,
      include: '.',
      ignore: ['node_modules', 'babel.config.js', 'apollo.config.js', '.eslintrc.js'],
      release: `unikube-frontend@${process.env.VUE_APP_VERSION}`,
    }),
  );
}

plugins.push(new MonacoWebpackPlugin({
  customLanguages: [{
    label: 'yaml',
    entry: undefined,
    worker: {
      id: 'yaml-worker',
      entry: path.resolve(__dirname, 'node_modules/monaco-yaml/lib/esm/yaml.worker'),
    },
  }],
}));

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    plugins,
  },
  chainWebpack: (config) => {
    config
      .externals(process.env.NODE_ENV === 'production' ? {
        'keycloak-js': 'Keycloak',
        'keycloak-js/dist/keycloak-authz': 'KeycloakAuthorization',
      } : {});
    config
      .module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      .end();
  },
};
