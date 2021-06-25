## 1.表格边框合并

~~~css
table{
  border-collapse: collapse;
}
~~~

## 2.隐藏文本

~~~css
text-indent: -9999px; 或者 font-size: 0;
~~~

## 3.卡卷效果

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

## 4.三角形

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

## 5.隐藏滚动条或更改滚动条样式
~~~css
        .scroll-container {
            width: 500px;
            height: 150px;
            border: 1px solid #ddd;
            padding: 15px;
            overflow: auto;     /*必须*/
        }

        .scroll-container::-webkit-scrollbar {
            width: 8px;
            background: white;
        }

        .scroll-container::-webkit-scrollbar-corner,
            /* 滚动条角落 */
        .scroll-container::-webkit-scrollbar-thumb,
        .scroll-container::-webkit-scrollbar-track {      /*滚动条的轨道*/
            border-radius: 4px;
        }

        .scroll-container::-webkit-scrollbar-corner,
        .scroll-container::-webkit-scrollbar-track {
            /* 滚动条轨道背景 */
            background-color: rgba(180, 160, 120, 0.1);
            box-shadow: inset 0 0 1px rgba(180, 160, 120, 0.5);
        }

        .scroll-container::-webkit-scrollbar-thumb {
            /* 滚动条里面的小滚动条 */
            background-color: #00adb5;
        }
~~~





## 6.如何让`<p>xx xx</p>`之间的空格变大？

1. 给P标签设置word-spacing
2. 将空格用一个span标签包裹起来，然后设置span标签的letter-spacing活word-spacing
3. `letter-spacing`把中文之间的间隙也放大了，而`word-spacing`则不放大中文之间的间隙。

## 7.如何解决inline-block空白问题？

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