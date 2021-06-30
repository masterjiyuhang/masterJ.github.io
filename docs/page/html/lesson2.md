## 1、link 和@import 有什么区别？

1.link 是 HTML 标签，@import 是 css 提供的。
2.link 引入的样式页面加载时同时加载，@import 引入的样式需等页面加载完成后再加载。
3.link 没有兼容性问题，@import 不兼容 ie5 以下。
4.link 可以通过 js 操作 DOM 动态引入样式表改变样式，而@import 不可以。

## 2、src、href 的区别是什么?

src 和 href 都是用于外部资源的引入， src 一般引入 js 文件， 图片文件，href 一般链接 css 资源文件，网页资源文件。

## 3、说说`<script>`、`<script async>`和`<script defer>`的区别

- `<script>` : 加载的时候是同步的会阻塞后面代码的执行，加载立即执行。
- `<script async>`: 异步加载，加载和执行是并行的。
- `<script defer>`: 异步加载，需等到所有文档加载完才执行。

js 放在 `<head>` 中，如果不添加 `async` 或者 `defer` 时，当浏览器遇到 `script` 时，会阻塞 DOM 树的构建，进而影响页面的加载。当 js 文件较多时，页面白屏的时间也会变长。

## 4、HTML 元素有什么？

常用块级元素：

1. 常用：div、p、ul、li、ol
2. 结构：aside、**footer**、**header**、**nav**、**section**、main
3. 文章：address、**article**、figure、figcaption、h1、h2、h3、h4、h5、h6、pre
4. 表格：table、thead、tbody、tfoot、th、td、caption
5. 表单：form
6. 其他：**canvas**

常用行内元素：

1. 常用：a、img、span
2. 文本：em、i、strong、small
3. 表单：button、input、label、option、progress、select、textarea
4. 媒体：**audio**、**video**

## 5、HTML5 有哪些优势？

### 5.1 新特性

1. 标签结构化
2. canvas 绘画
3. localStorage 本地离线存储
4. sessionStorage 储数据在关闭浏览器自动删除
5. **websocket 通信** 慎重回答（会被刨根问底）
6. 表单的控件 date、time、email、url、section

### 5.2 新增的 API

- 两个选择器 API
  - `document.querySelector()`
  - `document.querySelectAll()`
- 地理定位 API
  - `getCurrrentPosition()`
- 多媒体 API
  - `<video></video>`
  - `<audio></audio>`
- 拖放

```html
<div ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<div draggable="true" ondragstart="drag(event)"></div>
```

- 文件
  `window.requestFileSystem()`
- XHR2

```js
var xhr = new XMLHttpRequest();
xhr.open("POST", "@Url.Action("Upload")")
```

- 本地存储 API
  - `localStorage`
  - `sessionStorage`
- canvas 绘画

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

- svg

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
	<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

## 6、浏览器内多个标签页之间的通信方式有哪些？

- WebSocket （可跨域）
- postMessage（可跨域）
- localStorage
- Cookies
- BroadcastChannel

## 7、如何禁止 html 页面缓存？

```html
<meta
	http-equiv="Cache-Control"
	content="no-cache, no-store, must-revalidate"
/>
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

## 8、元素的 alt 和 title 有什么区别？

- alt
  - `<img> `标签的 alt 属性指定了替代文本，用于在图像无法显示或者用户禁用图像显示时，代替图像显示在浏览器中的内容。
  - `alt` 属性可以用在 `img`、`area` 和 `input` 元素中（包括 `applet` 元素）。对于 `input` 元素，`alt` 属性意在用来替换提交按钮的图片。
- title
  - `title` 属性规定关于元素的额外信息。
  - `title` 属性常与 `form` 以及 `a` 元素一同使用，以提供关于输入格式和链接目标的信息。

## 9、From 表单提交时为什么会刷新页面？

早期网页交互模型没有编程式发送网络请求的 API，更没有前端路由管理的概念。网页交互只能通过浏览器提交数据给服务器，服务器做出响应重新返回一个页面，浏览器加载这个页面进行显示的方式进行。

如果不想刷新可以使用 JS 拦截 form 的 onsubmit 事件，阻止掉浏览器的默认行为，然后用 ajax/fetch 和后台交互。

另一个偏方是使用 iframe 作为 form 的 target，不过 JS 处理方面不如让浏览器别管自己全手动发请求来得简单。

## 10、input 的 onblur 和 onchange 事件区别是什么？

onchange 是指值改变并且失去焦点时触发的事件
onblur 失去焦点时就触发，不管值有没有改变

## 11、说说 Canvas 和 SVG 图形的区别是什么？

- canvas 是基于 js 绘制的，svg 是基于 xml 进行定义的，因此 svg 有节点的概念，可对其中部分节点绑定事件。
- canvas 发生任何变化都需要重新生成，不易修改。
- canvas 有像素的概念，svg 没有，不会失真。
- svg 可为其中个别节点绑定事件。
- svg 复杂度高会减慢渲染速度，适合带有大型渲染区域的应用程序。
- canvas 能够以 .png 或 .jpg 格式保存结果图像，不支持事件处理器。

## 12、a 标签下的`href="javascript:void(0)"`起到了什么作用？

- 当用户点击一个以 javascript: URI 时，它会执行 URI 中的代码，然后用返回的值替换页面内容，除非返回的值是 undefined。

- `void`关键字在`js`的含义为执行一个表达式，但不会返回任何值（即`undefined`）；因此`void(0)`语句相当于执行表达式`0`，然后不返回任何值；
- `href="javascript:void(0)"`的作用是点击链接后不发生任何行为，常用于阻止页面刷新或跳转；这么做往往是为了保留链接的样式，不让链接执行实际操作。
