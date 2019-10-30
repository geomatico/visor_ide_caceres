const path = require("path");

const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'ide_caceres': path.join(__dirname, "js", "app"),
        'ide_caceres-embedded': path.join(__dirname, "MapStore2", "web", "client", "product", "embedded"),
        'ide_caceres-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api")
    },
    {
        "themes/default": path.join(__dirname, "js", "themes", "ide_caceres", "theme.less")
    },
    paths,
    extractThemesPlugin,
    true,
    "/ide_caceres/dist/",
    '.ide_caceres',
    [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'indexTemplate.html'),
            chunks: ['ide_caceres'],
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'embeddedTemplate.html'),
            chunks: ['ide_caceres-embedded'],
            inject: true,
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'apiTemplate.html'),
            chunks: ['ide_caceres-api'],
            inject: 'head',
            hash: true,
            filename: 'api.html'
        })
    ],
    {
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
);
