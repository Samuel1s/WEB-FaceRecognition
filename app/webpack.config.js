const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',  // Opcional ou em package.json --mode development
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundler.js'
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
 
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new Dotenv({
            path: './src/.env', // Path to .env file (this is the default)
        })
    ]

}