const chalk = require('chalk');
const webpack = require('webpack');
const ZipPlugin = require('zip-webpack-plugin');
const getClientEnvironment = require('react-scripts/config/env');
const { whenProd, when } = require('@craco/craco');

/**
 * Overriding some CRA Webpack Config.
 * WARNING: might break when we update CRA templates!
 */

/**
 * NOTE: override some jest config too if needed
 */
module.exports = () => {
  return {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        when(env.NODE_ENV !== 'test', () =>
          console.log(chalk.green`Executing {bold CRA Configuration Override}`)
        );

        const packageJson = require(paths.appPackageJson);
        const reactEnv = getClientEnvironment(
          paths.publicUrlOrPath.slice(0, -1)
        );

        /**
         * Force devtool to have no sourcemap on Production
         */
        whenProd(() => {
          console.log(chalk.magenta`Forcing {bold devtools} off`);
          webpackConfig.devtool = false;
        });

        /**
         * Adding ZIP plugin to bundle build to btca
         */
        whenProd(() => {
          webpackConfig.plugins.push(
            new ZipPlugin({
              filename: `${packageJson.name}`,
              extension: 'btca',
            })
          );
          console.log(chalk.magenta`{bold Zip Plugin} Added`);
        });

        /**
         * Adding babel plugin lodash to optimise lodash import
         * https://lodash.com/per-method-packages
         */
        console.log(
          chalk.magenta`adding {bold babel-plugin-lodash} to improve lodash cherry pick`
        );
        webpackConfig.module.rules.forEach((r) => {
          if (r.oneOf) {
            const babelLoader = r.oneOf.find(
              (rr) => rr.loader.indexOf('babel-loader') !== -1
            );
            if (babelLoader && babelLoader.options) {
              babelLoader.options.plugins = [
                ...babelLoader.options.plugins,
                require.resolve('babel-plugin-lodash'),
                [
                  require.resolve('babel-plugin-react-remove-properties'),
                  {
                    properties: [/data-testid/],
                  },
                ],
              ];
            }
          }
        });

        /**
         * Overriding process.env to add app name and app version.
         */
        console.log(
          chalk.magenta`Overriding env variables, adding {bold appname}`
        );
        webpackConfig.plugins = webpackConfig.plugins.filter(
          (plugin) => !(plugin instanceof webpack.DefinePlugin)
        );

        webpackConfig.plugins.push(
          new webpack.DefinePlugin({
            'process.env': {
              ...reactEnv.stringified['process.env'],
              BTC_GS_APP_NAME: JSON.stringify(packageJson.name),
              BTC_GS_APP_VERSION: JSON.stringify(packageJson.version),
            },
          })
        );
        return webpackConfig;
      },
    },
  };
};
