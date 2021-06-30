# CSS 基础知识

## 1、`CSS`盒模型，在不同浏览器的差异

由四部分组成 包括 内容 content 边框 border 内边距 padding 外边距 margin

标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin
低版本 IE 盒子模型：宽度=内容宽度（content+border+padding）+ margin

## 2、css 单位

- % 百分比
- px 像素。一个点为 1px
- em 相对单位，相对于父元素计算
- rem 相对单位，相对于根元素计算。
- rpx 微信小程序相对单位。1rpx = 屏幕宽度/750px

## 3、css 选择器

### 常见选择器

- 通配符：`*`
- ID 选择器：`#ID`
- 类选择器：`.class`
- 元素选择器：`p`、`a`、`span`
- 后代选择器：`p span`、`div a`
- 伪类选择器：`a:hover`
- 属性选择器：`input[type="text"]`
- 子元素选择器：`li:firth-child`、`p:nth-child(1)` 等……

### 权重

!important -> 行内样式 -> #id -> .class -> 元素和伪元素 -> \* -> 继承 -> 默认

## 4、常见布局

### 圣杯布局

就是两边顶宽，中间自适应的三栏布局，中间栏要在放在文档流前面以优先渲染。

圣杯布局，为了中间 div 内容不被遮挡，将中间 div 设置了左右 padding-left 和 padding-right 后，将左右两个 div 用相对布局 position: relative 并分别配合 right 和 left 属性，以便左右两栏 div 移动后不遮挡中间 div。

### 双飞翼布局

就是两边顶宽，中间自适应的三栏布局，中间栏要在放在文档流前面以优先渲染。

双飞翼布局，为了中间 div 内容不被遮挡，直接在中间 div 内部创建子 div 用于放置内容，在该子 div 里用 margin-left 和 margin-right 为左右两栏 div 留出位置。

### 三角形

```css
.div2 {
	width: 0;
	height: 0;
	border-left: 150px solid palevioletred;
	border-right: 150px solid orchid;
	border-top: 300px solid red;
}
```

### 两栏布局

```css
/* BFC原理 */
aside {
	float: left;
	width: 200px;
}
main {
	overflow: hidden;
}
/* float + margin */
aside {
	float: left;
	width: 200px;
}
main {
	margin-left: 200px;
}
/* flex */
.layout {
	display: flex;
}
aside {
	width: 200px;
}
main {
	flex: 1;
}
/* grid */
.layout {
	display: grid;
	grid-template-columns: 200px auto;
}
```

## 5、Div 是块级元素吗？块级元素和行内元素的区别？

div 是经典的块级元素。h1~h6 ul li 等，特点是块级元素独占一行，他的高度、宽度、内外边距大小都可控。行内元素 span em a 等等，可以一行显示多个行内元素，不能直接设置宽和高，默认的大小是其内容的的宽度和高度。行内元素只能容纳文本或者其他的行内元素。行内块元素的和相邻行内元素（行内块）在一行上,但是之间会有空白缝隙。一行可以显示多个。默认宽度就是它本身内容的宽度。高度，行高、外边距以及内边距都可以控制。

## 6、说说 display 有哪几种属性？

**inline** **行内元素**

- 可以与其他行内元素共享一行，不会独占一行. 如果内容占满一行则会换行显示
- 不能更改元素的 height，width 的值，大小由内容撑开.
- 可以使用 padding 上下左右都有效，margin 只有 left 和 right 产生边距效果，但是 top 和 bottom 不行

**block**

- 使元素变成块级元素，独占一行，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度
- 能够改变元素的 height，width 的值
- 可以设置 padding，margin 的各个属性值，top，left，bottom，right 都能够产生边距效果

**inline-block**

- 结合了 inline 与 block 的一些特点，结合了上述 inline 的第 1 个特点和 block 的第 2,3 个特点.

## 7、盒子模型

由四部分组成 包括 内容 content 边框 border 内边距 padding 外边距 margin

标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin
低版本 IE 盒子模型：宽度=内容宽度（content+border+padding）+ margin

### 1 边框 border

围绕在内边距和内容外的边框。 border-color border-width border-style

### 2 内边距 padding

清除内容周围的区域，内边距是透明的。 内边距的作用：

| 值的个数 | 表达意思                                        |
| -------- | ----------------------------------------------- |
| 1 个值   | padding：上下左右内边距;                        |
| 2 个值   | padding: 上下内边距 左右内边距 ；               |
| 3 个值   | padding：上内边距 左右内边距 下内边距；         |
| 4 个值   | padding: 上内边距 右内边距 下内边距 左内边距 ； |

### 3 外边距 margin

清除边框外的区域，外边距是透明的。
块级盒子水平居中 盒子必须指定了宽度（width）后就给**左右的外边距都设置为 auto**，

```
.header{ width:960px; margin:0 auto;}
```

### 4 内容 content

盒子的内容，显示文本和图像。

![](https://www.runoob.com/images/box-model.gif)

## 8、position 定位

```md
absolute: 绝对定位，相当于 static 以外的第一个父元素
fixed：绝对定位，相对于浏览器窗口进行定位
relative：相对定位，相对于正常位置进行定位
```

### 1.relative absolute fixed static

| 定位模式          | 是否脱标占有位置     | 移动位置基准           | 模式转换（行内块） | 使用情况                 |
| ----------------- | -------------------- | :--------------------- | ------------------ | ------------------------ |
| 静态 static       | 不脱标，正常模式     | 正常模式               | 不能               | 几乎不用                 |
| 相对定位 relative | 不脱标，占有位置     | 相对自身位置移动       | 不能               | 基本单独使用             |
| 绝对定位 absolute | 完全脱标，不占有位置 | 相对于定位父级移动位置 | 能                 | 要和定位父级元素搭配使用 |
| 固定定位 fixed    | 完全脱标，不占有位置 | 相对于浏览器移动位置   | 能                 | 单独使用，不需要父级     |

父级要占有位置，子级要任意摆放**，这就是**子绝父相**的由来。**

**注意**：

1. **边偏移**需要和**定位模式**联合使用，**单独使用无效**；
2. `top` 和 `bottom` 不要同时使用；
3. `left` 和 `right` 不要同时使用。

包括这四种情况，前三种最主要，最后一种几乎是不用的。

**<u>_首先_</u>**，**相对定位**是元素**相对**于它 原来在标准流中的位置 来说的。它的特点是 1，相对于自己原来在标准流中位置来移动的。2，原来**在标准流的区域还有它的位置**，后面的盒子仍然以标准流的方式对待它。

<u>**_然后_**</u>，**绝对定位**是元素以带有定位的父级元素来移动位置 （拼爹型）。它的特点是

1. **完全脱标** —— 完全不占位置；
2. **如果父元素没有定位**，则以**浏览器**为准定位（Document 文档）。
3. **如果父元素有定位**

   - 将元素依据最近的已经定位（绝对、固定或相对定位）的父元素（祖先）进行定位。
   - 绝对定位的特点：（务必记住）

     - 绝对是以带有定位的父级元素来移动位置 （拼爹型） 如果父级都没有定位，则以浏览器文档为准移动位置
     - 不保留原来的位置，完全是脱标的。

**_<u>最后</u>_，固定定位**是**绝对定位**的一种特殊形式： （认死理型） 如果说绝对定位是一个矩形 那么 固定定位就类似于正方形

1. **完全脱标** —— 完全不占位置；
2. 只认**浏览器的可视窗口** —— `浏览器可视窗口 + 边偏移属性` 来设置元素的位置；
   - 跟父元素没有任何关系；单独使用的
   - 不随滚动条滚动。

#### 绝对定位的盒子居中

1. `left: 50%;`：让**盒子的左侧**移动到**父级元素的水平中心位置**；
2. `margin-left: -100px;`：让盒子**向左**移动**自身宽度的一半**。

#### 堆叠顺序（z-index）

1. **属性值**：**正整数**、**负整数**或 **0**，默认值是 0，数值越大，盒子越靠上；
2. 如果**属性值相同**，则按照书写顺序，**后来居上**；
3. **数字后面不能加单位**。

**注意**：`z-index` 只能应用于**相对定位**、**绝对定位**和**固定定位**的元素，其他**标准流**、**浮动**和**静态定位**无效。

浮动元素、绝对定位(固定定位）元素的都不会触发外边距合并的问题。 （我们以前是用 padding border overflow 解决的）

## 9、清除浮动问题

浮动副作用---父容器高度塌陷。

### 给浮动元素的父元素添加高度

直接给父元素设置 height，但是实际应用中不可能给所有的盒子增加高度。

### clear:both

在最后一个子元素新添加最后一个冗余元素，并将其设置 clear:both，这样就可以清除浮动。**在父级元素末尾添加的元素必须是一个块级元素，否则无法撑起父级元素高度**。

### 伪元素清除浮动 ⭐

给浮动元素的父容器添加一个 clearfix 的类，然后给这个类添加一个:after 伪元素，实现元素末尾添加一个看不见的块元素来清理浮动。这是通用的清理浮动方案，推荐使用。

### 父级 `div` 也浮动

需要定义宽度

### 结尾处加 `br` 标签 `clear:both`

## 10、水平居中的方法

- 元素为行内元素，设置父元素 `text-align:center`
- 如果元素宽度固定，可以设置左右 `margin 为 auto `;
- 如果元素为绝对定位，设置父元素 `position 为 relative `，元素设`left:0;right:0;margin:auto;`
- 使用 `flex-box` 布局，指定 `justify-content` 属性为`center `
- `display` 设置为 `tabel-ceil`

## 11、垂直居中的方法

- 将显示方式设置为表格， `display:table-cell` ,同时设置 `vertial-align：middle`
- 使用 `flex` 布局，设置为 `align-item：center`
- 绝对定位中设置 `bottom:0,top:0 `,并设置 `margin:auto`
- 绝对定位中固定高度时设置`top:50%，margin-top`值为高度一半的负值
- 文本垂直居中设置 `line-height` 为 `height `值

## 12、BFC 块级格式上下文（BFC）

- 它是一块区域，规定了内部块盒的渲染方式以及浮动相互之间的影响关系；

- BFC 有自己的一套内部子元素渲染规则，不影响外部渲染，也不受外部渲染影响

- 外部任何浮动元素区域和 BFC 区域是泾渭分明的，不可能重叠

- BFC 在计算高度时，内部浮动元素的高度也要计算在内，即使 BFC 区域只有一个浮动元素，BFC 的高度也不会发生塌陷，其高度大于等于浮动元素的高度

- 当一个 BFC 区域是一个浮动盒子的兄弟节点时，BFC 会首先在浮动元素旁边渲染，若宽度不够，则在下方渲染

- BFC 容器是一个隔离的容器，和其他元素互不干扰；所以我们可以用触发两个元素的 BFC 来解决垂直边距折叠问题。

### 构建 BFC 的方法

1. float 的值不为 none（left/right）
2. overflow 的值不为 visible（hidden/auto/scorll） visiable 默认值，内容不会被修剪。hidden，内容将被裁减以适合填充框。scroll，内容将被剪裁以适合填充框。 浏览器显示滚动条，无论是否实际剪切了任何内容。auto，取决于用户代理。 如果内容适合填充框内部，则它看起来与可见内容相同，但仍会建立新的块格式化上下文。
3. display 的值为 table-cell/table-caption/inline-block
4. position 的值不为 static 或 relative（absolute/fixed）

### BFC 的作用

1. 防止 margin 重叠：可以将两个元素放在不同的 BFC 中，就可以防止 margin 重叠（主要用于嵌套元素）
2. 在浮动问题中，防止产生塌陷（子浮动元素也参与高度计算）
3. 与浮动元素相邻的已生成 BFC 的元素不能与浮动元素相互覆盖

## 13、margin 坍塌 和 margin 合并

### **margin 坍塌**：

父子嵌套元素在垂直方向的 margin,父子元素是结合在一起的,他们两个的 margin 会取其中最大的值。正常情况下,父级元素应该相对浏览器进行定位,子级相对父级定位。但由于 margin 的塌陷,父级相对浏览器定位.而子级没有相对父级定位,子级相对父级,就像坍塌了一样.

解决方法：1，给父级设置边框或内边距 2，触发块级格式上下文，改变父级的渲染规则有以下四种方法,给父级盒子添加

(1)position:absolute/fixed

(2)display:inline-block;

(3)float:left/right

(4)overflow:hidden

### **margin 合并**：

**两个兄弟结构的元素在垂直方向上的 margin 是合并的**

通过只设置上面的元素的 margin-bottom 来解决距离的问题

## 14、css-flex

- flex-direction：设置主轴的方向
- justify-content：设置主轴上的子元素排列方式
- flex-wrap：设置子元素是否换行
- align-content：设置侧轴上的子元素的排列方式（多行）
- align-items：设置侧轴上的子元素排列方式（单行）
- flex-flow：复合属性，相当于同时设置了 flex-direction 和 flex-wrap
- `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。
  - `flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。
  - `flex-shrink`属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
    - 如果所有项目的`flex-shrink`属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为 0，其他项目都为 1，则空间不足时，前者不缩小。
  - `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

#### flex-内容宽度等分

```javascript
//css
       .box {
            display: flex;
        }

        .box div {
            flex: 1;
            border: 1px solid red;
        }
//html
    <div class="box">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </div>
```

## 15、常用技巧

### 1.表格边框合并

```css
table {
	border-collapse: collapse;
}
```

### 2.隐藏文本

```css
text-indent: -9999px; 或者 font-size: 0;
```

### 3.卡卷效果

```css
.coupon {
 width: 300px;
  height: 100px;
  line-height: 100px;
  margin: 50px auto;
  text-align: center;
  position: relative;
  background: radial-gradient(circle at right bottom, transparent 10px, #ffffff 0) top right /50% 51px no-repeat,
  radial-gradient(circle at left bottom, transparent 10px, #ffffff 0) top left / 50% 51px no-repeat,
  radial-gradient(circle at right top, transparent 10px, #ffffff 0) bottom right / 50% 51px no-repeat,
  radial-gradient(circle at left top, transparent 10px, #ffffff 0) bottom left / 50% 51px no-repeat;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .2));
}
.coupon span {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  color: red;
  font-size: 50px;
  font-weight: 400;
}
<p class="coupon">
 <span>200</span>优惠券
</p>
```

### 4 .字符超出部分换行

```css
.content {
	overflow-wrap: break-word;
}
```

### 5.单行文本超出省略

```css
.ellipsis {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
```

### 6.多行文本超出省略

```css
.line-clamp {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
```

### 7.设置 placeholder 的样式

```css
input::-webkit-input-placeholder {
	/* Chrome/Opera/Safari */
	color: red;
}
input::-moz-placeholder {
	/* Firefox 19+ */
	color: red;
}
input:-ms-input-placeholder {
	/* IE 10+ */
	color: red;
}
input:-moz-placeholder {
	/* Firefox 18- */
	color: red;
}
```

### 8.**IOS 页面滑动卡顿**

```css
body,
html {
	-webkit-overflow-scrolling: touch;
}
```

### 9. 使元素鼠标事件失效

```css
wrap {
	// 如果按tab能选中该元素，如button，然后按回车还是能执行对应的事件，如click。
	pointer-events: none;
	cursor: default;
}
```

### 10.**消除 transition 闪屏**

```css
.wrap {
	-webkit-transform-style: preserve-3d;
	-webkit-backface-visibility: hidden;
	-webkit-perspective: 1000;
}
```

### 11.**CSS 显示链接之后的 URL**

```css
<a href="//www.webqdkf.com">有课前端网</a>
<style>
a:after {content: " (" attr(href) ")";}
</style>
```

### 12.**div 里的图片和文字同时上下居中**

```css
.wrap {
  height: 100,
  line-height: 100
}
img {
  vertival-align：middle
}
// vertical-align css的属性vertical-align用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。只对行内元素、表格单元格元素生效，不能用它垂直对齐块级元素
// vertical-align：baseline/top/middle/bottom/sub/text-top;
```

### 13.**vertical-align 属性不生效**

在使用 vertical-align:middle 实现垂直居中的时候，经常会发现不生效的情况。

生效需要满足的条件：

- **作用环境：**父元素设置 line-height。需要和 height 一致。或者将 display 属性设置为 table-cell，将块元素转化为单元格。
- **作用对象：**子元素中的 inline-block 和 inline 元素。

### 14.**1px 边框变粗问题**

出现 1px 变粗的原因，比如在 2 倍屏时 1px 的像素实际对应 2 个物理像素。

```css
.dom {
	height: 1px;
	background: #dbdbdb;
	transform: scaleY(0.5);
}
```

### 15.**全屏背景图片的实现**

```css
.swper {
	background-image: url(./img/bg.jpg);
	width: 100%;
	height: 100%; //父级高不为100%请使用100vh
	zoom: 1;
	background-color: #fff;
	background-repeat: no-repeat;
	background-size: cover;
	-webkit-background-size: cover;
	-o-background-size: cover;
	background-position: center 0;
}
```

### 16.**实现立体字的效果**

```css
<div class="text_solid">立体字</div>
<style>
.text_solid{
    font-size: 32px;
    text-align: center;
    font-weight: bold;
    line-height:100px;
    text-transform:uppercase;
    position: relative;
  background-color: #333;
    color:#fff;
    text-shadow:
    0px 1px 0px #c0c0c0,
    0px 2px 0px #b0b0b0,
    0px 3px 0px #a0a0a0,
    0px 4px 0px #909090,
    0px 5px 10px rgba(0, 0, 0, 0.6);
}
</style>
```

### 17.背景渐变

`linear-gradient`:用来定义线性渐变，用于图形元素的填充或描边。

```css
<div class="text_gradient"></div>
<style>
.text_gradient{
  width:500px;
  height:100px;
  background: linear-gradient(25deg, rgb(79, 107, 208), rgb(98, 141, 185), rgb(102, 175, 161), rgb(92, 210, 133)) rgb(182, 228, 253);
}
</style>
```

### 18、rgba()和 opacity 的透明效果有什么不同？

- `rgba()` 和 `opacity` 都能实现透明效果，但最大的不同是 `opacity` 作用于元素，以及元素内的所有内容的透明度，
- 而 `rgba()` 只作用于元素的颜色或其背景色。（设置 rgba 透明的元素的子元素不会继承透明效果！）

## 16、文档流

在 CSS 的世界中，会把内容按照从左到右、从上到下的顺序进行排列显示。正常情况下会把页面分割成一行一行的显示，而每行又可能由多列组成，所以从视觉上看起来就是从上到下从左到右，而这就是 CSS 中的流式布局，又叫文档流。文档流就像水一样，能够自适应所在的容器，一般它有如下几个特性：

- 块级元素默认会占满整行，所以多个块级盒子之间是从上到下排列的；
- 内联元素默认会在一行里一列一列的排布，当一行放不下的时候，会自动切换到下一行继续按照列排布；

### **如何脱离文档流？**

脱流文档流指节点脱流正常文档流后，在正常文档流中的其他节点将忽略该节点并填补其原先空间。文档一旦脱流，计算其父节点高度时不会将其高度纳入，脱流节点不占据空间。有两种方式可以让元素脱离文档流：浮动和定位。

- 使用浮动（float）会将元素脱离文档流，移动到容器左/右侧边界或者是另一个浮动元素旁边，该浮动元素之前占用的空间将被别的元素填补，另外浮动之后所占用的区域不会和别的元素之间发生重叠；
- 使用绝对定位（`position: absolute;`）或者固定定位（`position: fixed;`）也会使得元素脱离文档流，且空出来的位置将自动被后续节点填补。
