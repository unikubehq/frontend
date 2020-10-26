module.exports = {
  client: {
    service: {
      name: 'local',
      url: 'http://localhost:8090', // env.VUE_APP_APOLLO_ENGINE_SERVICE
      headers: {},
      skipSSLValidation: true,
    },
    includes: ['src/**/*.{js,jsx,ts,tsx,vue,gql,graphql}'],
  },
};
