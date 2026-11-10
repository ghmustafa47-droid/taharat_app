module.exports = ({ config }) => ({
  ...config,
  experiments: { ...config.experiments, baseUrl: process.env.TAHARAH_BASE_PATH || '' },
});
