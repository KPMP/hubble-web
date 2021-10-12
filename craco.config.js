const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "txml/txml": "./node_modules/txml/dist/txml",
        }
      }
    }
  ]
}
