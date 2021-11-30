/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
const webpack = require('@cypress/webpack-preprocessor');
// The webpack pre-processor is used to make sure all compiled files are also
// instrumented. Otherwise we have experienced some issues - e.g. the Vuex store files
// have not been instrumented properly and therefore seemed to have no code coverage.

module.exports = (on, config) => {
  /* eslint-disable import/no-extraneous-dependencies */
  require('@cypress/code-coverage/task')(on, config);
  const options = webpack.defaultOptions;
  options.webpackOptions.resolve = {
    alias: {
      '@': '/Users/robertstein/Projects/unikube-frontend/src',
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
      {
        loader: '/Users/robertstein/Projects/unikube-frontend/node_modules/cache-loader/dist/cjs.js',
        options: {
          cacheDirectory: '/Users/robertstein/Projects/unikube-frontend/node_modules/.cache/ts-loader',
          cacheIdentifier: '21abf4fa',
        },
      },
      {
        loader: '/Users/robertstein/Projects/unikube-frontend/node_modules/babel-loader/lib/index.js',
      },
      {
        loader: '/Users/robertstein/Projects/unikube-frontend/node_modules/ts-loader/index.js',
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
