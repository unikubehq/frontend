/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples
// eslint-disable-next-line import/no-extraneous-dependencies
const { VuetifyLoaderPlugin } = require('vuetify-loader');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('@cypress/webpack-preprocessor');
const path = require('path');
// The webpack pre-processor is used to make sure all compiled files are also
// instrumented. Otherwise we have experienced some issues - e.g. the Vuex store files
// have not been instrumented properly and therefore seemed to have no code coverage.

module.exports = (on, config) => {
  /* eslint-disable import/no-extraneous-dependencies */
  require('@cypress/code-coverage/task')(on, config);
  const options = webpack.defaultOptions;
  options.webpackOptions.plugins = [
    new VuetifyLoaderPlugin(
      {},
    ),
  ];
  options.webpackOptions.resolve = {
    alias: {
      '@': path.resolve(__dirname, '../../../src'),
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
    ],
  };
  options.webpackOptions.module.rules.push({
    test: /\.ts$/,
    use: [
      /* config.module.rule('ts').use('babel-loader') */
      {
        loader: './node_modules/babel-loader/lib/index.js',
      },
      /* config.module.rule('ts').use('ts-loader') */
      {
        loader: './node_modules/ts-loader/index.js',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [
            '\\.vue$',
          ],
          happyPackMode: false,
        },
      },
    ],
  });
  /* config.module.rule('tsx') */
  options.webpackOptions.module.rules.push({
    test: /\.m?jsx?$/,
    exclude: [
      function () { /* omitted long function */ },
    ],
    use: [
      /* config.module.rule('js').use('babel-loader') */
      {
        loader: './node_modules/babel-loader/lib/index.js',
        options: {
          cacheCompression: false,
          cacheDirectory: './node_modules/.cache/babel-loader',
          cacheIdentifier: '128e588c',
        },
      },
    ],
  });
  options.webpackOptions.module.rules.push({
    test: /\.tsx$/,
    use: [
      /* config.module.rule('tsx').use('babel-loader') */
      {
        loader: './node_modules/babel-loader/lib/index.js',
      },
      /* config.module.rule('tsx').use('ts-loader') */
      {
        loader: './node_modules/ts-loader/index.js',
        options: {
          transpileOnly: true,
          happyPackMode: false,
          appendTsxSuffixTo: [
            '\\.vue$',
          ],
        },
      },
    ],
  });

  on(
    'file:preprocessor',
    webpack(options),
  );
  return {
    ...config,
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
  };
};
