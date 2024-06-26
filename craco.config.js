const CracoAlias = require('craco-alias')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  babel: {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          importSource: '@emotion/react',
          absoluteRuntime: false,
        },
      ],
    ],
    plugins: ['@emotion/babel-plugin'],
  },

  // webpack: {
  //   plugins: [new BundleAnalyzerPlugin()],
  // },
}
