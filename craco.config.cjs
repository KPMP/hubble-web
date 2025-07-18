const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CracoAlias = require("craco-alias");

const isProductionBuild = process.env.NODE_ENV === "production";
const shouldAnalyze = process.env.REACT_APP_RUN_ANALYZER === "true";

const plugins = [];

if (isProductionBuild && shouldAnalyze) {
  plugins.push(new BundleAnalyzerPlugin({ analyzerMode: "server" }));
}

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "txml/txml": "./node_modules/txml/dist/txml",
        },
      },
    },
  ],
  webpack: {
    plugins,
    configure: (webpackConfig) => {
      if (isProductionBuild) {
        webpackConfig.devtool = false;
      }

      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((subRule) => {
            if (subRule.use && Array.isArray(subRule.use)) {
              subRule.use = subRule.use.filter(
                (u) =>
                  !(
                    typeof u === "object" &&
                    u.loader &&
                    u.loader.includes("thread-loader")
                  )
              );
            }
          });
        }
      });

      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => plugin.constructor.name !== "ForkTsCheckerWebpackPlugin"
      );

      webpackConfig.optimization.splitChunks = {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000,
      };

      webpackConfig.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      });

      webpackConfig.module.parser = {
        javascript: {
          exportsPresence: false,
        },
      };

      return webpackConfig;
    },
  },
};
