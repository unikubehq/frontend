const plugins = [];
if (process.env.NODE_ENV === 'e2e') {
  plugins.push('istanbul');
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins,
};
