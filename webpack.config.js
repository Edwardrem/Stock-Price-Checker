var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: ['./views/main.jsx'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {   
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'views'),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                          '@babel/plugin-proposal-class-properties',
                        ]
                    }
                }
            },
            {
              test: /\.s?css$/,
              use: ["style-loader", "css-loader", "sass-loader"]
            },
        ]
    },
    node: {
      fs: "empty"
    }
};