# 企业资金管理系统课程设计

## 需求分析
### 总体设计
用户登录系统, 后台实现对应的接口, 前台实现登录以及对相应的数据的增删改查, 不同身份的用户有不同权限
### 具体设计 :
- 后端
    - 允许用户使用自己的邮箱和密码进行注册
    - 注册邮箱进行格式认证, 不符合邮箱的格式前台不予通过
    - 密码不得少于6位
    - 使用全球公认头像gravater默认注册
    - 将用户数据和资金数据存储到云数据库中
    - 对于用户输入的无效路由返回404界面
    - 在未登录情况下请求登录路由将重定向至登录页面
    - 用户登录在48小时后失效, 需要重新登录
    - 将用户密码加密后存储到数据库中

- 前端
    - 用户退出时清除登录信息
    - 在用户页面展示用户信息
    - 顶部导航栏和下拉菜单设计
    - 首页和个人信息页设计
    - 左侧导航栏设计
    - 展示资金管理页面细节
    - 资金添加按钮完成添加功能
    - 资金编辑和删除功能
    - 实现分页结构和分页功能
    - 实现筛选功能
    - 实现不同用户的不同权限配置

## 总体设计
- 项目服务器端dev/build/product环境:`Node.js`
- 前端:`Vue`
    - 前端样式加载:`sass`
    - 前端开发组件:`ElementUI`
- 后台: `Express`
- 数据库:`MongoDB`
    - 云数据库提供厂商:`MLab`、`MongoDB Atlas`

### 后端使用的NPM模块
|模块名|版本|功能|
|---|---|---|
|bcrypt|3.0.7|用户密码加密|
|body-parser|1.19.0|中间件,实现网络请求|
|passport|0.4.1|用户登录模块|
|concurrently|5.0.2|实现前后点连载|
|mongoose|5.8.3|连接和操作数据库|
|passport-jwt|4.0.0|验证用户密码并生成token|
|gravatar|1.8.0|全球公认头像|
|jsonwebtoken|8.5.1|解析json数据|

### 前端使用的依赖和插件
|模块名|版本|功能|
|---|---|---|
|vue/cli-plugin-babel|latest|VueCLI脚手架|
|vue/cli-plugin-eslint|latest|样式检查工具|
|vue/cli-service|latest|脚手架辅助工具|
|axios|0.19.0|发送请求工具|
|babel-eslint|10.0.3|样式检查工具|
|element-ui|2.13.0|前端优美的组件|
|eslint|6.8.0|样式检查工具|
|jwt-decode|2.2.0|密码加密工具|
|node-sass|4.13.0|sass样式编译工具|
|sass-loader|8.0.0|sass样式加载依赖|
|vue-template-compiler|2.6.10|template编译工具|

### 后台开发目录

```
.
├── config
│   ├── keys.js     储存云数据库请求链接和密码
│   └── passport.js     
├── models
│   ├── Profile.js      MongoDB资金数据模型
│   └── User.js     MongoDB用户模型
├── package-lock.json
├── package.json    记录包文件
├── routes
│   └── api
│       ├── profiles.js     资金数据的处理
│       └── users.js        用户登录的处理
├── server.js       后台入口文件
└── yarn.lock
```

### 前台开发目录

```
.
├── README.md
├── babel.config.js
├── http.js                 请求接口文件
├── package-lock.json
├── package.json            包管理文件
├── public
│   ├── css
│   │   └── reset.css
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue             根vue文件
│   ├── assets              图片资源
│   │   ├── 404.gif
│   │   ├── bg.jpg
│   │   ├── logo.png
│   │   └── showcase.png
│   ├── components
│   │   ├── Dialog.vue      对话框组件
│   │   ├── HeadNav.vue     顶部导航栏组件
│   │   └── LeftMenu.vue    左侧导航栏组件
│   ├── main.js             项目配置文件
│   ├── router
│   │   └── index.js        路由
│   ├── store
│   │   └── index.js        vuex
│   └── views
│       ├── 404.vue         404页面
│       ├── FundList.vue    资金管理页面
│       ├── Home.vue        主页
│       ├── InfoShow.vue    用户信息页面
│       ├── Login.vue       登录页面
│       ├── Register.vue    注册页面
│       └── index.vue       入口页面
└── vue.config.js           项目配置
```

### 部分配置代码
- 后端`package.json`

```json
{
  "name": "app",
  "version": "1.0.0",
  "description": "restful api",
  "main": "server.js",
  "scripts": {
    "client-install": "npm install --prefix client",
    "client": "npm start --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
  "author": "Bureaux Tao",
  "license": "ISC",
  "devDependencies": {
    "bcrypt": "^3.0.7",
    "body-parser": "^1.19.0",
    "concurrently": "^5.0.2",
    "express": "^4.17.1",
    "gravatar": "^1.8.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.8.3",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0"
  }
}
```

- 前台`package.json`

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": false,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "start": "npm run serve"
  },
  "dependencies": {
    "core-js": "^3.4.4",
    "vue": "^2.6.10",
    "vue-router": "^3.1.3",
    "vuex": "^3.1.2"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "latest",
    "@vue/cli-plugin-eslint": "latest",
    "@vue/cli-service": "latest",
    "axios": "^0.19.0",
    "babel-eslint": "^10.0.3",
    "element-ui": "^2.13.0",
    "eslint": "^6.8.0",
    "jwt-decode": "^2.2.0",
    "node-sass": "^4.13.0",
    "sass-loader": "^8.0.0",
    "vue-template-compiler": "^2.6.10"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/recommended",
      "@vue/prettier"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}
```

- 前台`vue.config.js`

```js
const path = require("path");
const debug = process.env.NODE_ENV !== "production";

module.exports = {
	publicPath: "/", // 根域上下文目录
	outputDir: "dist", // 构建输出目录
	assetsDir: "assets", // 静态资源目录 (js, css, img, fonts)
	lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
	runtimeCompiler: true, // 运行时版本是否需要编译
	transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
	productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
	configureWebpack: config => {
		// webpack配置，值位对象时会合并配置，为方法时会改写配置
		if (debug) {
			// 开发环境配置
			config.devtool = "cheap-module-eval-source-map";
		} else {
			// 生产环境配置
		}
	},
	chainWebpack: config => {
		// webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
		if (debug) {
			// 本地开发配置
		} else {
			// 生产开发配置
		}
	},
	parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译
	pluginOptions: {
		// 第三方插件配置
	},
	pwa: {
		// 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	},
	devServer: {
		open: true,
		host: "localhost",
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: {
			// 配置跨域
			"/api": {
				target: "http://localhost:5000/api/",
				ws: true,
				changOrigin: true,
				pathRewrite: {
					"^/api": ""
				}
			}
		},
		before: app => {}
	}
};
```

## 项目实现
### 接口部分
- 注册接口
![s2020-01-06_12.27.10](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106122710.png)

- 登录接口
![s2020-01-06_12.27.19](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106122719.png)
- 获取token接口
![s2020-01-06下午12.27.25](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106xia-wu122725.png)

- 增加数据接口
![s2020-01-06下午12.27.37](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106xia-wu122737.png)

- 编辑数据接口
![s2020-01-06下午12.27.44](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106xia-wu122744.png)

- 查看所有数据接口
![s2020-01-06下午t0](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106xia-wut0.png)

- 删除数据接口
![s2020-01-06下午t5](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106xia-wut5.png)

### 前台部分
- 登录页面
![s2020-01-06_12.37.13](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123713.png)

- 注册页面
![s2020-01-06_12.37.25](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123725.png)

- 注册信息验证
![s2020-01-06_12.37.55](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123755.png)

- 主页
![s2020-01-06_12.38.10](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123810.png)

- 用户信息界面
![s2020-01-06_12.38.20](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123820.png)

- 左侧导航栏
![s2020-01-06_12.38.39](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123839.png)

- 下拉菜单
![s2020-01-06_12.38.48](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123848.png)

- 资金管理界面
![s2020-01-06_12.39.01](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123901.png)

- 设置分页
![s2020-01-06_12.39.12](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123912.png)

- 添加资金信息界面
![s2020-01-06_12.39.24](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123924.png)

- 修改资金信息界面
![s2020-01-06_12.40.35](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106124035.png)

- 修改资金信息验证
![s2020-01-06_12.39.41](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106123941.png)

- 筛选![s2020-01-06_12.40.57](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/s20200106124057.png)

### 编译数据

![Xnip2020-01-06_12-53-27](http://mweb-image.oss-cn-shanghai.aliyuncs.com/2020/01/06/xnip20200106125327.png)


