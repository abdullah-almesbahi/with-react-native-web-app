const withImages = require('next-images');

module.exports = withImages({
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      // 'react-native$': 'react-native-web',
      'react-native$': require.resolve('react-native-web')
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions
    ];

    return config;
  }
});
