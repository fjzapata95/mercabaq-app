module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    }
  },
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@core': './src/core',
          '@rootStore': './src/core/root-store',
          '@containers': './src/containers',
          '@hooks': './src/hooks',
          '@theme': './src/core/theme/index',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@components': './src/components'
        }
      }
    ]
  ]
};
