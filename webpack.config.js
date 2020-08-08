const path                    = require('path');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const TerserJSPlugin          = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin      = require('clean-webpack-plugin');


module.exports = {
  mode   : 'development',// ['production', 'development']
  devtool: 'inline-source-map',
  entry  : { bundle:  './src/_dev_js_sass/js/index.js'},
  output: {
    path      : path.resolve(__dirname, './src/include'),
    filename  : 'js/[name].js',
    publicPath: './src/include/'
  },

  module: {
    rules: [

      //--SCSS
       { test: /\.(sa|sc|c)ss$/,
         use : [
                MiniCssExtractPlugin.loader,
                'css-loader' ,
                { loader: 'postcss-loader', options: { config: { path:'./config/postcss.config.js'} } },
                { loader: 'sass-loader',options: {sourceMap: true, sourceMapContents: false} }
            ] },
      //--HTML
       { test: /\.html$/ , loader: "html-loader" },
      //---IMG
      //  {test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', options: { name : '[name].[ext]',   context: 'src', publicPath: '../' } },
       {test: /\.(png|jpg|gif|svg)$/, loader: 'url-loader', },

      //--Babel
       { test: /\.js$/ , exclude: /node_modules/, loader: "babel-loader", options: { presets: ["@babel/preset-env"] } }
    ]
 },
 plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css'}),
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: './src/index.html'
    //   }),
 ],
 optimization: {
    minimizer: [
    				new TerserJSPlugin({}),
    				new OptimizeCSSAssetsPlugin({})
    			],
  },

}