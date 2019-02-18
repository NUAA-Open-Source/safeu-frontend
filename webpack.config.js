const {join:pathJoin} = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // +++
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode:'production',
    entry:{
        app:'./src/main.js'
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'antd': 'antd',
    },
    output:{
        filename:'[name].bundle.js',
        path:pathJoin(__dirname,'./dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'] // +++
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ] // +++
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=/public/icons/[name].[ext]"
            }
        ]
    },
    plugins:[
      new VueLoaderPlugin(),
      new BundleAnalyzerPlugin()
    ]
}
