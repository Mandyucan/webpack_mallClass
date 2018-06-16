var UglifyJSPlugin = require('uglifyjs-webpack-plugin');//压缩代码 
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');//css单独打包，独立出css样式
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});

module.exports = {
	mode: 'development',
	// mode: 'production',
   entry: {
    	index: './src/js/index.js',
    	goodsInfo: './src/js/goodsInfo.js',
    },
    output: {
        filename: '[name].js',
        // filename: '[name]-[hash:8].js',  //当单个文件发生变化时，其他文件哈希值 也会一起变 ，文件会重复打包 
        // filename: '[name]-[chunkhash:8].js',//当该模块 文件变化时，其他模块的chunkhash不会变化，对应的文件也不会跟着变 ，避免重复打包，一般上线时使用
        path: __dirname + '/dist',
        publicPath: 'http://localhost:8080/dist' //一般会打包到服务器上，会写服务器地址
    },
    module: {
    	rules: [
            {test: /\.js$/, use: ['babel-loader']},
            {test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.css$/,use: [MiniCssExtractPlugin.loader,"css-loader"]},
            {test: /\.jpg|png|gif|svg$/, use: ['url-loader?limit=8192&name=./[name].[ext]']},//打包之后的图片是base64格式的图片，图片过大时不建议用base64编码格式，可以限定
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
        ]
    },
     plugins: [
     	new UglifyJSPlugin(), 
     	providePlugin,
     	new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
            }),//独立打包css 要用更新后的版本
    ],
    //打包公共模块
    // optimization:{
    //         runtimeChunk: false,
    //         splitChunks: {
    //             cacheGroups: {
    //                 common: {
    //                     name: "common",
    //                     chunks: "all",
    //                     minChunks: 2
    //                 }
    //             }
    //         }
    //     },
    
    // devServer:{
		  //   // 设置服务器访问的基本目录
		  //   // contentBase:'http://localhost:8090/dist', //最好设置成绝对路径
		  //   // 设置服务器的ip地址,可以是localhost
		  //   host:'localhost',
		  //   // 设置端口
		  //   port:8090,
		  //   // 设置自动拉起浏览器
		  //   open:true,
		  //   // 设置热更新
		  //   hot:true
    // }
}