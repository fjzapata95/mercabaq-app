const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = async () => {
  const defaultConfig = await getDefaultConfig(__dirname); // Obtiene la configuración predeterminada
  const { assetExts, sourceExts } = defaultConfig.resolver; // Extrae assetExts y sourceExts

  return mergeConfig(defaultConfig, {
      transformer: {
          babelTransformerPath: require.resolve('react-native-svg-transformer'),
      },
      resolver: {
          assetExts: assetExts.filter((ext) => ext !== 'svg'), // Filtra para excluir 'svg'
          sourceExts: [...sourceExts, 'svg'], // Agrega 'svg' a las extensiones de código fuente
      },
  });
};

module.exports = config();
