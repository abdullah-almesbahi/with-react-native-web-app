const path = require('path');
const withImages = require('next-images');
const withTM = require('next-transpile-modules');
const withTypescript = require('@zeit/next-typescript');

module.exports = withImages(
  withTypescript(
    withTM({
      transpileModules: [
        'react-native-elements',
        'react-native-paper',
        'react-native-ratings',
        'react-native-safe-area-view',
        'react-native-status-bar-height',
        'react-native-vector-icons'
      ],
      webpack(config, options) {
        return {
          ...config,
          module: {
            ...config.module,
            rules: [
              ...config.module.rules,
              {
                test: /\.ttf$/,
                loader: 'url-loader', // or directly file-loader
                include: path.resolve(
                  __dirname,
                  'node_modules/react-native-vector-icons'
                )
              }
              // {
              //   test: /\.js$/,
              //   exclude: /node_modules[/\\](?!react-native-vector-icons|react-native-safe-area-view)/,
              //   use: {
              //     loader: 'babel-loader',
              //     options: {
              //       // Disable reading babel configuration
              //       babelrc: false,
              //       configFile: false,

              //       // The configuration for compilation
              //       presets: [
              //         ['@babel/preset-env', { useBuiltIns: 'usage' }],
              //         '@babel/preset-react',
              //         '@babel/preset-flow',
              //         '@babel/preset-typescript'
              //       ],
              //       plugins: [
              //         '@babel/plugin-proposal-class-properties',
              //         '@babel/plugin-proposal-object-rest-spread'
              //       ]
              //     }
              //   }
              // }
            ]
          },
          resolve: {
            ...config.resolve,
            extensions: [
              '.web.ts',
              '.web.tsx',
              '.ts',
              '.tsx',
              '.web.js',
              '.web.jsx',
              '.js',
              '.jsx',
              ...config.resolve.extensions
            ],
            alias: {
              ...(config.resolve.alias || {}),
              'react-native$': 'react-native-web'
            }
          }
        };
      }
    })
  )
);
