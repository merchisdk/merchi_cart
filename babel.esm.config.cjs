module.exports = {
  extends: './babel.config.cjs',
  presets: [
    // Don't transform modules for the ESM build
    ['@babel/preset-env', { modules: false }],
  ],
}
