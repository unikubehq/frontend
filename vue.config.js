// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const { VuetifyLoaderPlugin } = require('vuetify-loader');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
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
      entry: path.resolve(__dirname, 'node_modules/monaco-yaml/yaml.worker'),
    },
  }],
}));

plugins.push(new VuetifyLoaderPlugin({ styles: 'expose' }));

module.exports = {
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {}, // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
  },
  configureWebpack: {
    plugins,
  },
  chainWebpack: (config) => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      .end();
  },
};
