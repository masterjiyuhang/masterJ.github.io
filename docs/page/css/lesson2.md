## Div是块级元素吗？块级元素和行内元素的区别？

div是经典的块级元素。h1~h6 ul li等，特点是块级元素独占一行，他的高度、宽度、内外边距大小都可控。行内元素span em a 等等，可以一行显示多个行内元素，不能直接设置宽和高，默认的大小是其内容的的宽度和高度。行内元素只能容纳文本或者其他的行内元素。行内块元素的和相邻行内元素（行内块）在一行上,但是之间会有空白缝隙。一行可以显示多个。默认宽度就是它本身内容的宽度。高度，行高、外边距以及内边距都可以控制。

## 说说display有哪几种属性？

**inline**  **行内元素**

- 可以与其他行内元素共享一行，不会独占一行. 如果内容占满一行则会换行显示
- 不能更改元素的height，width的值，大小由内容撑开.
- 可以使用padding上下左右都有效，margin只有left和right产生边距效果，但是top和bottom不行

**block**

- 使元素变成块级元素，独占一行，在不设置自己的宽度的情况下，块级元素会默认填满父级元素的宽度
- 能够改变元素的height，width的值
- 可以设置padding，margin的各个属性值，top，left，bottom，right都能够产生边距效果

**inline-block**

- 结合了inline与block的一些特点，结合了上述inline的第1个特点和block的第2,3个特点.



## 盒子模型

由四部分组成 包括  内容 content   边框border 内边距 padding  外边距margin

标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin
低版本IE盒子模型：宽度=内容宽度（content+border+padding）+ margin

### 1边框border

   围绕在内边距和内容外的边框。 border-color border-width border-style

### 2内边距 padding  

清除内容周围的区域，内边距是透明的。 内边距的作用：

| 值的个数 | 表达意思                                        |
| -------- | ----------------------------------------------- |
| 1个值    | padding：上下左右内边距;                        |
| 2个值    | padding: 上下内边距    左右内边距 ；            |
| 3个值    | padding：上内边距   左右内边距   下内边距；     |
| 4个值    | padding: 上内边距 右内边距 下内边距 左内边距 ； |

### 3 外边距margin 

清除边框外的区域，外边距是透明的。
块级盒子水平居中   盒子必须指定了宽度（width）后就给**左右的外边距都设置为auto**， 

~~~js
.header{ width:960px; margin:0 auto;}
~~~

###  4 内容 content 

盒子的内容，显示文本和图像。

![](https://www.runoob.com/images/box-model.gif)

## position 定位

~~~md
absolute: 绝对定位，相当于static以外的第一个父元素
fixed：绝对定位，相对于浏览器窗口进行定位
relative：相对定位，相对于正常位置进行定位
~~~

###  relative absolute fixed static 

| 定位模式         | 是否脱标占有位置     | 移动位置基准           | 模式转换（行内块） | 使用情况                 |
| ---------------- | -------------------- | :--------------------- | ------------------ | ------------------------ |
| 静态static       | 不脱标，正常模式     | 正常模式               | 不能               | 几乎不用                 |
| 相对定位relative | 不脱标，占有位置     | 相对自身位置移动       | 不能               | 基本单独使用             |
| 绝对定位absolute | 完全脱标，不占有位置 | 相对于定位父级移动位置 | 能                 | 要和定位父级元素搭配使用 |
| 固定定位fixed    | 完全脱标，不占有位置 | 相对于浏览器移动位置   | 能                 | 单独使用，不需要父级     |

父级要占有位置，子级要任意摆放，这就是**子绝父相**的由来。

**注意**：

1. **边偏移**需要和**定位模式**联合使用，**单独使用无效**；
2. `top` 和 `bottom` 不要同时使用；
3. `left` 和 `right` 不要同时使用。

包括这四种情况，前三种最主要，最后一种几乎是不用的。

**<u>*首先*</u>**，**相对定位**是元素**相对**于它  原来在标准流中的位置 来说的。它的特点是1，相对于自己原来在标准流中位置来移动的。2，原来**在标准流的区域还有它的位置**，后面的盒子仍然以标准流的方式对待它。

<u>***然后***</u>，**绝对定位**是元素以带有定位的父级元素来移动位置 （拼爹型）。它的特点是

1. **完全脱标** —— 完全不占位置；  
2. **如果父元素没有定位**，则以**浏览器**为准定位（Document 文档）。
3. **如果父元素有定位**
   * 将元素依据最近的已经定位（绝对、固定或相对定位）的父元素（祖先）进行定位。
   * 绝对定位的特点：（务必记住）

     - 绝对是以带有定位的父级元素来移动位置 （拼爹型） 如果父级都没有定位，则以浏览器文档为准移动位置
     - 不保留原来的位置，完全是脱标的。

***<u>最后</u>*，固定定位**是**绝对定位**的一种特殊形式： （认死理型）   如果说绝对定位是一个矩形 那么 固定定位就类似于正方形

1. **完全脱标** —— 完全不占位置；
2. 只认**浏览器的可视窗口** —— `浏览器可视窗口 + 边偏移属性` 来设置元素的位置；
   * 跟父元素没有任何关系；单独使用的
   * 不随滚动条滚动。

#### 绝对定位的盒子居中

1. `left: 50%;`：让**盒子的左侧**移动到**父级元素的水平中心位置**；
2. `margin-left: -100px;`：让盒子**向左**移动**自身宽度的一半**。

#### 堆叠顺序（z-index）

1. **属性值**：**正整数**、**负整数**或 **0**，默认值是 0，数值越大，盒子越靠上；
2. 如果**属性值相同**，则按照书写顺序，**后来居上**；
3. **数字后面不能加单位**。

**注意**：`z-index` 只能应用于**相对定位**、**绝对定位**和**固定定位**的元素，其他**标准流**、**浮动**和**静态定位**无效。

浮动元素、绝对定位(固定定位）元素的都不会触发外边距合并的问题。 （我们以前是用padding border overflow解决的）

## 清除浮动问题

浮动副作用---父容器高度塌陷。

~~~html
  <style>
      .parent{
          border: solid 5px;
          width:300px;
      }
      .child:nth-child(1){
          height: 100px;
          width: 100px;
          background-color: yellow;
          float: left;
      }
      .child:nth-child(2){
          height: 100px;
          width: 100px;
          background-color: red;
          float: left;
      }
      .child:nth-child(3){
          height: 100px;
          width: 100px;
          background-color: greenyellow;
          float: left;
      }
    </style>
</head>
<body>
<div class="parent">
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
</div>
</body>

~~~




### 给浮动元素的父元素添加高度

直接给父元素设置height，但是实际应用中不可能给所有的盒子增加高度。

### clear:both

在最后一个子元素新添加最后一个冗余元素，并将其设置clear:both，这样就可以清除浮动。**在父级元素末尾添加的元素必须是一个块级元素，否则无法撑起父级元素高度**。

### 伪元素清除浮动⭐

给浮动元素的父容器添加一个clearfix的类，然后给这个类添加一个:after伪元素，实现元素末尾添加一个看不见的块元素来清理浮动。这是通用的清理浮动方案，推荐使用。

~~~html
<div id="wrap" class="clearfix">
    <div id="inner"></div>
</div>
~~~

~~~css
  #wrap {
        border: 1px solid;
      }
      #inner {
        float: left;
        width: 200px;
        height: 200px;
        background: pink;
      }
      /*开启haslayout*/
      .clearfix {
        *zoom: 1;
      }
      /*ie6 7 不支持伪元素*/
      .clearfix:after {
        content: '';
        display: block;
        clear: both;
        height:0;
        line-height:0;
        visibility:hidden;//允许浏览器渲染它，但是不显示出来
      }
~~~

### 父元素使用overflow:hidden

这种方法令父容器形成了BFC（块级格式上下文），BFC可以包含浮动，解决浮动父元素塌陷的问题。

这里可以给父元素设置overflow:auto，但是为了兼容IE最好使用overflow:hidden。

使用浮动后，块状元素，会钻进浮动元素的下面，被浮动元素所覆盖。，元素会脱离标准的文档流。（标准的文档流就是按照不同的元素种类，如块元素，行元素按照各自的特点去排列显示，虽然属性不同，但都是按照从上到下，从左到右的顺序进行排列）。

```
<style type="text/css">
.divcss5 {
    width: 400px;
    border: 1px solid #F00;
    background: #FF0
}

.divcss5-left,.divcss5-right {
    width: 180px;
    height: 100px;
    border: 1px solid #00F;
    background: #FFF
}

.divcss5-left {
    float: left
}

.divcss5-right {
    float: right
}
</style>
```

```
<body>
    <div class="divcss5">
        <div class="divcss5-left">left浮动</div>
        <div class="divcss5-right">right浮动</div>
    </div>
</body>
```

### 浮动产生的副作用

**1、背景不能显示**

由于浮动产生，如果对父级设置了（[CSS background背景](http://www.divcss5.com/rumen/r125.shtml)）[CSS背景颜色](http://www.divcss5.com/jiqiao/j369.shtml)或[CSS背景图片](http://www.divcss5.com/jiqiao/j369.shtml)，而父级不能被撑开，所以导致[CSS背景](http://www.divcss5.com/rumen/r125.shtml)不能显示。

**2、边框不能撑开**

如上图中，如果父级设置了[CSS边框](http://www.divcss5.com/rumen/r120.shtml)属性（[css border](http://www.divcss5.com/rumen/r120.shtml)），由于子级里使用了float属性，产生浮动，父级不能被撑开，导致边框不能随内容而被撑开。

**3、margin padding设置值不能正确显示**

由于浮动导致[父级子级](http://www.divcss5.com/rumen/r239.shtml)之间设置了css padding、[css margin](http://www.divcss5.com/rumen/r128.shtml)属性的值不能正确表达。特别是上下边的padding和[margin](http://www.divcss5.com/rumen/r128.shtml)不能正确显示。

#### 解决方案（4）

1 对父级设置适合CSS高度  2 clear:both清除浮动 
3 父级div定义 `overflow:auto` 或者 `overflow:auto`

#### **1、对父级设置适合CSS高度**

对父级设置适合高度样式清除浮动，这里对“.divcss5”设置一定高度即可，一般设置高度需要能确定内容高度才能设置。这里我们知道内容高度是100PX+上下边框为2px，这样具体父级高度为102px。

父级div的css代码如下：

```
.divcss5 {
    width: 400px;
    border: 1px solid #F00;
    background: #FF0;
    height: 102px
}
```

#### **2、clear:both清除浮动**

在浮动元素后使用一个空元素如`<div class="clear"></div>`，并在CSS中赋予`.clear{clear:both;}`属性即可清理浮动。

亦可使用`<br class="clear" />`或`<hr class="clear" />`来进行清理。

但是 div 是最常用的，因为它没有浏览器默认样式；没有特殊功能，而且一般不会被 css 样式化。这个方法因为只是为了表现，因为空标签对页面没有上下文涵义，所以这种用法被纯语义论者嘲笑。诚然，从严格的角度来说他们是对的，但是这个方法有效而且没有任何伤害。

####  3、父级div定义 `overflow:auto` 或者 `overflow:auto`

如果父元素的这个属性设置为 auto 或者 hidden，父元素就会扩展以包含浮动。这个方法有着较好的语义性，因为他不需要额外元素。但是，如果需要增加一个新的 div 来使用这个方法，其实就和空 div 方法一样没有语义了。而且要记住，overflow 属性不是为了清除浮动而定义的。要小心不要覆盖住内容或者触发了不需要的滚动条。


#### **4、使用CSS的:after伪元素**

使用了一个聪明的 css 伪选择符(:after)来清除浮动。比起在父元素上设置 overflow，只需要给它增加一个额外的类似于”clearfix”的类。这个类使用如下 css:

通过CSS伪元素在容器的内部元素最后添加了一个看不见的空格"020"或点"."，并且赋予clear属性来清除浮动。需要注意的是为了IE6和IE7浏览器，要给clearfix这个class添加一条zoom:1;触发haslayout。

```
.clearfix:after {
    content: "020";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clearfix {
    /* 触发 hasLayout */
    zoom: 1;
}
```

 




## 垂直居中问题

解决方法：

~~~js
// 1.子绝父相 + 子元素:margin:auto + 子元素: top bottom left right 设置为0 
.fu {
  height: 100%;
  position: relative;
}
.zi {
  border: 1px solid #000000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 300px;
  width: 200px;
  margin: auto;
}
// 2.子绝父相 + 子： left top 都为50% + 负边距：margin-top、margin-left 设置为 -"父元素高度宽度的一半"
// 3.子绝父相 + 子： left top 都为50% + transform:translate(-50%,-50%)
#root {
  height: 100%;
  position: relative;
}
.friend-list {
  border: 1px solid #000000;
  height: 300px;
  width: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
// 4.flex弹性布局 父元素 display:flex +父：justify-content: center + 父：align-items: center
.fu {
    display: flex;
    justify-content: center;
    align-items: center;
}
// 5.计算属性
outer{
    position:relative
}
inner{
    position:absolute
}
~~~



## BFC块级格式上下文（BFC）

- 它是一块区域，规定了内部块盒的渲染方式以及浮动相互之间的影响关系；

- BFC有自己的一套内部子元素渲染规则，不影响外部渲染，也不受外部渲染影响

- 外部任何浮动元素区域和BFC区域是泾渭分明的，不可能重叠

- BFC在计算高度时，内部浮动元素的高度也要计算在内，即使BFC区域只有一个浮动元素，BFC的高度也不会发生塌陷，其高度大于等于浮动元素的高度

- 当一个BFC区域是一个浮动盒子的兄弟节点时，BFC会首先在浮动元素旁边渲染，若宽度不够，则在下方渲染

- BFC容器是一个隔离的容器，和其他元素互不干扰；所以我们可以用触发两个元素的BFC来解决垂直边距折叠问题。

  

### 构建BFC的方法

1. float的值不为none（left/right）
2. overflow的值不为visible（hidden/auto/scorll） visiable默认值，内容不会被修剪。hidden，内容将被裁减以适合填充框。scroll，内容将被剪裁以适合填充框。 浏览器显示滚动条，无论是否实际剪切了任何内容。auto，取决于用户代理。 如果内容适合填充框内部，则它看起来与可见内容相同，但仍会建立新的块格式化上下文。
3. display的值为table-cell/table-caption/inline-block
4. position的值不为static或relative（absolute/fixed）

### BFC的作用

1. 防止margin重叠：可以将两个元素放在不同的BFC中，就可以防止margin重叠（主要用于嵌套元素）
2. 在浮动问题中，防止产生塌陷（子浮动元素也参与高度计算）
3. 与浮动元素相邻的已生成BFC的元素不能与浮动元素相互覆盖

多栏布局（左右固定，中间自适应）

| .left{float:left;width:180px;} | .center{overflow:hidden;height:150px;} | .right{float:right;width:180px;} |
| ------------------------------ | -------------------------------------- | -------------------------------- |
|                                |                                        |                                  |



## px、em和rem的区别

- `px` `em `和`rem`都是长度单位，区别是，`px`的值是固定的，指定是多少就是多少，计算比较容易
- `em`的值不是固定的，并且`em`会继承父级元素的字体大小。在 font-size 中使用是相对于父元素的字体大小，在其他属性中使用是相对于自身的字体大小，如 width。
- `rem`相对于根元素(元素)



## Link 与 @import 的区别

- `link`是HTML方式。`@import` 是CSS方式
- `link`最大限度支持并行下载，`@import`过多嵌套导致串行下载，出现`FOUC`(文档样式短暂失效)
- `link` 优于 `@important`

## margin 坍塌 和 margin 合并

### **margin 坍塌**：

父子嵌套元素在垂直方向的margin,父子元素是结合在一起的,他们两个的margin会取其中最大的值。正常情况下,父级元素应该相对浏览器进行定位,子级相对父级定位。但由于margin的塌陷,父级相对浏览器定位.而子级没有相对父级定位,子级相对父级,就像坍塌了一样.

解决方法：1，给父级设置边框或内边距 2，触发块级格式上下文，改变父级的渲染规则有以下四种方法,给父级盒子添加

(1)position:absolute/fixed

(2)display:inline-block;

(3)float:left/right

(4)overflow:hidden

### **margin 合并**：

**两个兄弟结构的元素在垂直方向上的margin是合并的**

通过只设置上面的元素的margin-bottom来解决距离的问题

## bootstrap的原理

通过定义容器的大小，平分为12份（也有24份，23份的，取12份是一打，表示进阶完美的意思），再调整内外边距，最后结合媒体查询，制作出了强大的响应式网格系统。(可以通过重新编译LESS码源来修改12这个数值)。

1.数据行(.row)必须包含在容器(.container)中，以便赋予合适的对其方式和内边距(padding)。

2.在行(.row)中可以添加列(.column)，但列数之和不能超过平分的总列数，比如：12.

3.通过设置内边距(padding)从而创建列于列之间的间距。然后通过为第一列和最后一列设置负值的外距(margin)来抵消内距(padding)的影响。

4.不希望相邻的两个列紧靠近在一起，就用offset功能来实现。

## Div盒子变为圆角，怎么实现IE的兼容性

圆角矩形可以为4个角分别设置圆度， 但是是有顺序的

```
border-top-left-radius:20px;
border-top-right-radius:20px;
border-bottom-right-radius:20px;
border-bottom-left-radius:20px;
```

* 如果4个角，数值相同

  ~~~css
  border-radius: 15px;
  ~~~

* 里面数值不同，我们也可以按照简写的形式，具体格式如下:

~~~css
border-radius: 左上角 右上角  右下角  左下角;
~~~

## css-flex 

+ flex-direction：设置主轴的方向
+ justify-content：设置主轴上的子元素排列方式
+ flex-wrap：设置子元素是否换行  
+ align-content：设置侧轴上的子元素的排列方式（多行）
+ align-items：设置侧轴上的子元素排列方式（单行）
+ flex-flow：复合属性，相当于同时设置了 flex-direction 和 flex-wrap
+ `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。
  - `flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。
  - `flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
    - 如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。
  - `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

#### flex-内容宽度等分

~~~javascript
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
~~~

## 权重的计算

####   1). 公式

关于CSS权重，我们需要一套计算公式来去计算，这个就是 CSS Specificity（特殊性）

| 标签选择器                 | 计算权重公式 |
| -------------------------- | ------------ |
| 继承或者 *                 | 0,0,0,0      |
| 每个元素（标签选择器）.div | 0,0,0,1      |
| 每个类，伪类class          | 0,0,1,0      |
| 每个ID                     | 0,1,0,0      |
| 每个行内样式 style=""      | 1,0,0,0      |
| 每个!important  重要的     | ∞ 无穷大     |

- 值从左到右，左面的最大，一级大于一级，数位之间没有进制，级别之间不可超越。 
- 关于CSS权重，我们需要一套计算公式来去计算，这个就是 CSS Specificity（特殊性）
- ~~~css
    div {
        color: pink!important;  
    }
  ~~~


#### 2). 权重叠加

我们经常用交集选择器，后代选择器等，是有多个基础选择器组合而成，那么此时，就会出现权重叠加。

就是一个简单的加法计算

- `div ul  li`   ------>      0,0,0,3
- `.nav ul li`   ------>      0,0,1,2
- `a:hover`      -----—>   0,0,1,1
- `.nav a`       ------>      0,0,1,1

 注意： 

1. 数位之间没有进制 比如说： 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0, 1, 0， 所以不会存在10个div能赶上一个类选择器的情况。

#### 3). 继承的权重是0

这个不难，但是忽略很容易绕晕。其实，我们修改样式，一定要看该标签有没有被选中。

1） 如果选中了，那么以上面的公式来计权重。谁大听谁的。 
2） 如果没有选中，那么权重是0，因为继承的权重为0.



## 常用技巧(常见问题)

### 1.表格边框合并

~~~css
table{
  border-collapse: collapse;
}
~~~

### 2.隐藏文本

~~~css
text-indent: -9999px; 或者 font-size: 0;
~~~

### 3.卡卷效果

~~~html
<style>
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
</style>
<p class="coupon">
 <span>200</span>优惠券
</p>
~~~

### 4.三角形

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    /* 正三角 */
    .up-triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 25px 40px 25px;
        border-color: transparent transparent rgb(245, 129, 127) transparent;
    }

    /* border width当给定四个宽度时，该宽度分别依次作用于选定元素的上横边、右纵边、下横边、左纵边 （即按顺时针依次作用） */
    /* transparent 关键字表示一个完全透明的颜色，即该颜色看上去将是背景色。 从技术上说，它是带有阿尔法通道为最小值的黑色，是 rgba(0,0,0,0) 的简写。 */
    /* 倒三角 */
    .down-triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 40px 25px 0 25px;
        border-color: rgb(49, 190, 132) transparent transparent transparent;
    }

    div:last-child {
        margin-top: 1rem;
    }
</style>

<body>
    <div class="up-triangle"></div>
    <div class="down-triangle"></div>
</body>

</html>
~~~

### 5.隐藏滚动条或更改滚动条样式





### 6.如何让`<p>xx xx</p>`之间的空格变大？

1. 给P标签设置word-spacing
2. 将空格用一个span标签包裹起来，然后设置span标签的letter-spacing活word-spacing
3. `letter-spacing`把中文之间的间隙也放大了，而`word-spacing`则不放大中文之间的间隙。

### 7.如何解决inline-block空白问题？

~~~html
<style>
.child {
  background: yellowgreen;
  display: inline-block;
}
</style>
<body>
  <div class="parent">
    <div class="child">
      孩子
    </div>
    <div class="child">
      孩子
    </div>
    <div class="child">
      孩子
    </div>
  </div>
</body>
~~~


1. 删除html中的空白 即让div挨着写`</div><div></div>`
2. 设置负的边距。 `margin-left = -0.8em`
3. **给父级设置`font-size: 0`**,可以将空白的宽度设置为0。但是如果子级也有字的化，需要给子级的字设置font-size属性。