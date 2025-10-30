module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        pragma: 'h',
        pragmaFrag: 'h.f',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
