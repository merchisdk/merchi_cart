module.exports = function(api) {
  api.cache(true);

  const presets = ["@babel/preset-react"];
  const plugins = [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-inline-import',
    'babel-plugin-inline-react-svg',
  ];
  return {
    presets,
    plugins
  };
};
