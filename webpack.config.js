
const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');


const PostCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('autoprefixer')
]

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader?url=false', { loader: 'postcss-loader',  options: {postcssOptions: { plugins: PostCSSPlugins}}}]
}

let pages = fse.readdirSync('./app').filter(function(file) {
    return file.endsWith('.html');
}).map(function(page) {
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    })
})

let config = {
    entry: './app/assets/scripts/App.js',
    plugins: pages,
    module: {
        rules: [
            cssConfig
        ]
    }
};

class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('copy images', function() {
            fse.copySync('./app/assets/images', './dist/assets/images');
        })
    }
}


if (currentTask == 'dev') {

    cssConfig.use.unshift('style-loader');

    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    }

    config.devServer = {
        before: function(app, server) {
            server._watch('./app/**/*.html');
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000
    }

    config.mode = 'development'
}


if (currentTask == 'build') {

    cssConfig.use.unshift(MiniCssExtractPlugin.loader);

    config.module.rules.push({
        test: /\.js/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }


    })

    // outputs the split files with a unique ID into the dist folder

    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    }

    // ensures that the bundled js file is a minimises version for production

    config.mode = 'production'

    // splits code out of bundled.js into seperate files ready for a browser

    config.optimization = {
        splitChunks: {chunks: 'all'},
        minimize: true,
        minimizer: [`...`, new CssMinimizerPlugin()]
    }

    // adds all necessary plugins for production / build

    config.plugins.push(
        new CleanWebpackPlugin(), 
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()
        );
   

}


module.exports = config;