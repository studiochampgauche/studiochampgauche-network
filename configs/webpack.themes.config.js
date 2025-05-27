import path from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const themes = [
	'account',
	'azimut',
	'core',
	'maxium',
	'merinair',
	'on-rails',
	'siterapide',
	'champgauche',
	'the-next',
	'toiture',
	'tolerie-so'
];

const main = {
	cache: true,
	entry: themes.reduce((entries, themeName) => {

		entries[themeName] = [
			`../src/themes/${themeName}/js/App.jsx`,
			`../src/themes/${themeName}/scss/App.scss`,
			`../src/themes/${themeName}/medias/Medias.js`
		];

		return entries;

	}, {}),
	output: {
		filename: '[name]/assets/js/[name].min.js',
		path: path.resolve(__dirname, '../dist/wp-content/themes/')
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: (file) => {


								const index = themes.findIndex(theme => file.includes(`\\${theme}\\`));
								const themeName = themes[index];

								return `${themeName}/assets/css/${themeName}.min.css`;
							}
						}
					},
					'sass-loader'
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: (file) => {

								const index = themes.findIndex(theme => file.includes(theme));
								const themeName = themes[index];

								return `${themeName}/assets/images/[name].[ext]`;
							}
						}
					}
				]
			},
			{
				test: /\.(mp4)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: (file) => {

								const index = themes.findIndex(theme => file.includes(theme));
								const themeName = themes[index];

								return `${themeName}/assets/videos/[name].[ext]`;
							}
						}
					}
				]
			},
			{
				test: /\.(mp3)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: (file) => {

								const index = themes.findIndex(theme => file.includes(theme));
								const themeName = themes[index];

								return `${themeName}/assets/audios/[name].[ext]`;
							}
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: (file) => {

								const index = themes.findIndex(theme => file.includes(theme));
								const themeName = themes[index];

								return `${themeName}/assets/fonts/[name].[ext]`;
							}
						}
					}
				]
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: '../src/core',
					to: path.resolve(__dirname, '../dist'),
					noErrorOnMissing: true
				},
				...themes.map(themeName => ({
			        from: path.resolve(__dirname, `../src/themes/${themeName}/template`),
			        to: path.resolve(__dirname, `../dist/wp-content/themes/${themeName}`),
			        noErrorOnMissing: true,
			    }))
			]
		}),
	],
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['jpegtran', { progressive: true }],
							['mozjpeg', { quality: 75 }],
							['optipng', { optimizationLevel: 5 }],
							['pngquant', { quality: [0.65, 0.90], speed: 4, }],
							['svgo', { plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false }}}]}]
						],
					},
				},
			}),
			new TerserPlugin()
		],
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules')
		],
		extensions: ['.js', '.jsx']
	}
};


export default main;