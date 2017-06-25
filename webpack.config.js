var webpack = require("webpack");

module.exports = {
    entry: ["babel-polyfill", "./react/main.tsx"],
    output: {
        filename: "./public/js/bundle.js",
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "babel-loader?presets[]=es2015!babel-loader?presets[]=react!ts-loader" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.json$/, loader: 'json-loader' }
        ]
    }
};