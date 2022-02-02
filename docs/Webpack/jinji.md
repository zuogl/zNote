
#  webpack基础用法

##  1.  核心概念之entry 

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。

 单入口写法

```js
module.exports={
    entry:'./src/index.js'
}
```

多入口文件写法：

```js
module.exports={
    entry:{
        app:'./src/app.js',
        adminApp:'./src/adminApp.js'
    }
}
```

## 2.  核心概念之output

output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。一般在配置output时，需要配置输出的路径和文件名。

```js
const path = require('path')
module.exports={
    entry:'index.js',
    output:{
        path:path.join(__dirname,'dist'),
         // filename:'bundle.js' //打包完后的名字（单入口写法）
        filename:'[name].js'//多入口写法，这个name会自动读取每个入口的名字并使用
    },
}
```

## 3.  核心概念之Loaders

* Webpack 本身只能加载 JS/JSON 模块，如果要加载其他类型的文件(模块)，就需要使用对应的loader 进行转换/加载，并将其加入到依赖树中。
* Loader 本身也是运行在 node.js 环境中的 JavaScript 模块
* 本身是一个函数，接受源文件作为参数，返回转换的结果
* loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 less-loader。

### 3.1  常见的Loaders

| loader名称    | 功能简述                                |
| ------------- | --------------------------------------- |
| babel-loader  | 将ES6/7等新语法转换为浏览器能接收的语法 |
| css-loader    | 支持.css文件的加载和解析                |
| less-loader   | 将less文件转换成css                     |
| ts-loader     | 将TS转换成JS                            |
| file-loader   | 进行图片、字体等的打包                  |
| raw-loader    | 将文件以字符串的形式导入                |
| thread-loader | 多进程打包JS和CSS                       |

### 3.2 基本写法

`loader`在配置时，写在`module`下的`rules`中，`rules`是一个数组，数组中的每一项代表一个`loader`的配置项，

在每个配置项中，一般都会有如下两个参数

	- test: 用于指定匹配规则,一般是正则表达式
	- use:用于指定要使用的loade,是一个数组。该数组中，执行loader的顺序是从下到上，从右到左。

```js
module.exports={
     module:{
        rules:[
            {
                test:/\.less$/,  		// 检查文件是否以.less结尾（检查是否是less文件）
                use:[					// 数组中loader执行是从下到上，从右到左顺序执行
                    'style-loader', 	// 创建style标签，添加上js中的css代码
                    'css-loader', 		// 将css以commonjs方式整合到js文件中
                    'less-loader' 		// 将less文件解析成css文件
                ]
            }
        ]
    },
}

```

## 4. 核心概念之Plugins