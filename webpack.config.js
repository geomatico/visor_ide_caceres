const path = require("path");

const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'ide_caceres': path.join(__dirname, "js", "app"),
        'ide_caceres-embedded': path.join(__dirname, "MapStore2", "web", "client", "product", "embedded"),
        'ide_caceres-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api")
    },
    {
        "themes/default": path.join(__dirname, "js", "themes", "ide_caceres", "theme.less")
    },
    {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
    },
    extractThemesPlugin,
    false,
    "dist/",
    '.ide_caceres',
    [],
    {
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
);
