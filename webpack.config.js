const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const inProduction = process.env.NODE_ENV === 'production'

const plugins = [
	new ExtractTextPlugin({
		filename: './public/dist/bundle.css'
	})
]

if (inProduction) {
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		include: /^bundle\.js$/,
		minimize: true
	}))
}

module.exports = {
	plugins: plugins,
	watch: !inProduction,
	devtool: !inProduction && 'source-map',
	entry: './public/src/js/app.js',
	output: {
		filename: './public/dist/bundle.js'
	},
	resolve: {
		extensions: ['.js', '.sass'],
		alias: {
			'@': `${__dirname}/public/src/js`
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			},
			{
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: inProduction
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
									autoprefixer({
										browsers: [
											'> 1%',
											'last 4 version',
											'not ie <= 8'
										]
									})
								]
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				})
			}
		]
	}
}
