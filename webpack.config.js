const path = require("path");

//Plugins
const webpackBuilder = require("@reactway/webpack-builder");
const typeScript = require("@reactway/webpack-builder-plugin-typescript");
const webpackDevServer = require("@reactway/webpack-builder-plugin-web-dev");
const htmlPlugin = require("@reactway/webpack-builder-plugin-html");
const styles = require("@reactway/webpack-builder-plugin-styles");
const images = require("@reactway/webpack-builder-plugin-images");
const clean = require("@reactway/webpack-builder-plugin-clean");
const writeFile = require("@reactway/webpack-builder-plugin-write-file");

const fullOutputPath = path.resolve(__dirname, "dist");

let publicPath = process.env.PUBLIC_PATH;

if (publicPath == null) {
    publicPath = "/";
}

const webpackMode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = new webpackBuilder.Builder(__dirname, {
    entry: "./src/app.tsx",
    mode: webpackMode,
    output: {
        path: fullOutputPath,
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[contenthash].js",
        publicPath: publicPath
    }
})
    .use(typeScript.TypeScriptPlugin)
    .use(styles.StylesPlugin, {
        sassLoaderOptions: {
            options: {
                includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss"), path.resolve(__dirname, "src/styles/")]
            }
        }
    })
    .use(images)
    .use(webpackDevServer)
    .use(htmlPlugin, {
        inject: false,
        appMountId: "root",
        title: "Martynas Veikutis Saitynai",
        template: require("html-webpack-template"),
        baseHref: publicPath,
        meta: [
            {
                charset: "UTF-8"
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
            }
        ]
    })
    .use(writeFile)
    .use(clean)
    .toConfig(true);
