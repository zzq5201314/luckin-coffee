/*
 * @Author: 清羽
 * @Date: 2022-12-09 22:46:22
 * @LastEditTime: 2022-12-10 21:02:34
 * @LastEditors: you name
 * @Description: 
 */
//vue.config.js
const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()
module.exports = {

	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		],

	}
}
