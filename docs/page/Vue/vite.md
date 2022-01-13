坚持学习，大势所趋。

## 切换node版本

nvm控制、切换node版本

nvm ls

nvm use 12.22.1

nvm use 10.15.3

## 模块规范

commonjs、amd、 cmd、 umd、 ES-Module



### commonjs

commonjs 定义一个全局性方法require()，用于加载模块。nodejs就是基于commonJS规范的。

- `var math = require('math');`
- Module.exoprts 、exports
- exports只是对module.exports的一个引用
- require执行后，必须等其中的方法全部加载完成。
- 放在浏览器取决于网速的快慢，可能需要等待很长时间，浏览器处于假死状态。

### amd

amd （Asynchronous Module Definitions ） 适用于浏览器端，因RequireJS而出名。

- ```javascript
  // a.js
  define(function (){
  　　return {
  　　　a:'hello world'
  　　}
  });
  // b.js
  require(['./a.js'], function (moduleA){
      console.log(moduleA.a); // 打印出：hello world
  });
  ```

- CommonJS是主要为了JS在后端的表现制定的，他是不适合前端的，AMD(异步模块定义)出现了，它就主要为前端JS的表现制定规范。
- 采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会执行。
- 管理模块之间的依赖性，便于代码的编写和维护。

### CMD 

CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

- 在AMD基础上改进的一种规范，和AMD不同在于对依赖模块的执行时机处理不同，CMD是就近依赖，而AMD是前置依赖。

- ```javascript
  // a.js
  define(function (require, exports, module){
  　　exports.a = 'hello world';
  });
  // b.js
  define(function (require, exports, module){
      var moduleA = require('./a.js');
      console.log(moduleA.a); // 打印出：hello world
  });
  ```

### umd

- 兼容AMD和commonJS规范的同时，还兼容全局引用的方式
- UMD在使用诸如Rollup/ Webpack之类的bundler时通常用作备用模块
- 前后端均通用，写法复杂

### ES Module

- 按需加载
- import export 只能在模块的顶层，不能在代码之中。
- import语句可以在代码块中实现异步动态按需加载。

## vite使用



### vite是什么？

一个新型前端构建工具，一个基于浏览器原生ES Modules的开发服务器，利用浏览器去解析模块，在服务器端按需编译返回，完全跳过了打包的概念。

Vite 目前更像是一个类似于 webpack-dev-server 的开发工具。

### 为啥要有打包工具？

最初是为了解决低版本浏览器不支持ESM模块化的问题，将各个分散的JavaScript模块合并成一个文件，同时将多个JavaScript脚本合并成一个文件，减少http请求的数量，提升页面首次访问的速度。

### 打包工具对比？

**webpack**

接连引入了Loader、Plugin机制，提供了各种构建相关的能力。如Babel转译、css合并、代码压缩等。

**vite**

针对Vue单页面组件的无打包开发服务器，可以直接在浏览器运行请求的vue文件。

注意他的特点是无打包，vite会启动一个本地服务器处理不同的加载需求。
相对于地址导入，要根据后缀名处理文件内容并返回。
对于裸模块导入需要修改他的路径为相对地址并再次请求。

Vite要求项目完全由ES Module模块组成，common.js模块不能直接在Vite上使用。

`vite`对比`webpack`

`webpack` 打包时，需要将所有模块打包成一个一个或多个模块，最终将所有的代码打包放入一个`bundle.js`文件之中。每次修改其中一个子模块，就需要所有代码重新打包，那么随着你写的代码越来越多，重新打包的时间就会越来越长。然后就要考虑到打包优化，比如分片啊，缓存啊之类的操作就往上丢，但是如果项目接着迭代，代码更进一步增多了呢。咋办？接着优化呗？在优化也得打包不是。

之所以打包变慢了，是因为  webpack 会将许多资源构成一个或多个bundle，如果我们跳过打包的过程，只在需要某个模块的时候在通过请求去获取资源，会有什么意想不到的效果呢？

所以，新一代的构建工具出现了，由于越来越多的浏览器开始支持ES模块，越来越多的工具使用编译型语言编写。

### 基本使用？

1. **npm init @vitejs/app**  ||  **npm init @vitejs/app my-vue-app --template vue**
2. **npm i @vitejs/plugin-vue-jsx -D**



### vite如何实现的？

特点：

- 冷启动
- 即时热模块更新
  - 背景： 随着应用体积的增长，打包启动时效率很低，更新速度直线下降。
- 按需编译

实现：

请求拦截原理实现

启动一个 koa 服务器拦截浏览器请求ES Module的请求。

- ✨Vite以ESM 的方式作为模块化格式，实际上是让浏览器接管了打包程序的部分工作：
  - Vite 只需要在浏览器请求源码时进行转换并按需提供源码。
  - 根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

热更新实现

- HMR（动态模块热重载）：允许一个模块热替换它自己，不会影响页面其余部分。Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活。
- Vite 同时利用 HTTP 头来加速整个页面的重新加载。
  - 源码模块的请求会根据 `304 Not Modified` 进行协商缓存，而依赖模块请求则会通过 `Cache-Control: max-age=31536000,immutable` 进行强缓存，因此一旦被缓存它们将不需要再次请求。

在Vite中，HMR是基于原生ESM上执行的。hot module reload

- ​	在客户端与服务端之间建立了一个webscoket链接，当代码修改时，服务端发送消息通知客户端去请求修改模块的代码，完成热更新。
- 服务端原理
  - 服务端做的就是监听代码文件的改变，在合适的时机向客户端发送webscoket信息去通知客户端请求新的模块代码。
- 客户端原理
  - Vite的 websocket 相关代码在 处理 html 中时被写入代码中。
  - 当request.path 路径是 /vite/client 时，请求得到对应的客户端代码，因此在客户端中我们创建了一个 websocket 服务并与服务端建立了连接。 Vite 会接受到来自客户端的消息。通过不同的消息触发一些事件。做到浏览器端的即时热模块更换（热更新）。



