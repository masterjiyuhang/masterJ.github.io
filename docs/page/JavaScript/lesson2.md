# 常见问题


## 原型 原型链

Js中是使用构造函数来新建一个对象的，每一个构造函数内部都会有一个prototype属性值，这个属性值也是一个对象，它包含了可以有该构造函数的所有实例共享的属性和方法。

当使用构造函数新建一个对象之后，在这个对象内部将包含一个指针，这个指针只想构造函数的prototype属性对应的值，在ES5中这个指针被称为对象的原型。

### 回答：

在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个prototype属性，这个属性指向函数的原型对象。

当函数经过new调用时，这个函数就成为了构造函数，返回一个全新的实例对象，在浏览器中这个实例对象有一个__proto__属性，指向构造函数的原型对象。

JavaScript对象通过prototype指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条, 即原型链。

#### js实现继承： 

###### 1.call方法

```js
 function Parent1(){
    this.name = 'parent1';
  }
  function Child1(){
    Parent1.call(this);
    this.type = 'child1'
  }
  console.log(new Child1);
//这样写的时候子类虽然能够拿到父类的属性值，但是问题是父类原型对象中一旦存在方法那么子类无法继承。那么引出下面的方法。
```

###### 2.借助原型链

```js
 function Parent2() {
    this.name = 'parent2';
    this.play = [1, 2, 3]
  }
  function Child2() {
    this.type = 'child2';
  }
  Child2.prototype = new Parent2();

  console.log(new Child2());
//===========
  var s1 = new Child2();
  var s2 = new Child2();
  s1.play.push(4);
  console.log(s1.play, s2.play);//(4)[1,2,3,4] (4)[1,2,3,4]
//明明我只改变了s1的play属性，为什么s2也跟着变了呢？很简单，因为两个实例使用的是同一个原型对象。
```

###### 3.结合1和2

```js
function Parent3 () {
    this.name = 'parent3';
    this.play = [1, 2, 3];
  }
  function Child3() {
    Parent3.call(this);
    this.type = 'child3';
  }
  Child3.prototype = new Parent3();
  var s3 = new Child3();
  var s4 = new Child3();
  s3.play.push(4);
  console.log(s3.play, s4.play);
//之前的问题都得以解决。但是这里又徒增了一个新问题，那就是Parent3的构造函数会多执行了一次（Child3.prototype = new Parent3();）。这是我们不愿看到的。那么如何解决这个问题？


```

###### 4.组合继承的优化

```js
  function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
  }
  function Child5() {
    Parent5.call(this);
    this.type = 'child5';
  }
  Child5.prototype = Object.create(Parent5.prototype);
  Child5.prototype.constructor = Child5;
```

js中为了让多个对象共享一个或多个方法，提出了原型的概念。js中的每个对象都有与之关联的对象，叫做原型对象。每一次获取对象属性都是一次查询过程，当在对象的自有属性中找不到时就会去查找它的原型对象。

​		在js中函数也是一个对象。每个函数都有一个prototype属性（只有函数才有prototype属性），这是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。prototype就是通过调用构造函数而创建的那个对象实例的原型对象。

​		对象的原型指向对象的父，而父的原型又指向父的父，这种原型层层的关系，叫做**原型链**。

​		`__proto__`指向当前对象的原型，prototype是函数才具有的属性，默认情况下，new 一个函数创建出的对象，其原型都指向这个函数的prototype属性。

JavaScript中的对象，都有一个内置属性[[Prototype]]，指向这个对象的原型对象。当查找一个属性或方法时，如果在当前对象中找不到定义，会继续在当前对象的原型对象中查找；如果原型对象中依然没有找到，会继续在原型对象的原型中查找（原型也是对象，也有它自己的原型）；如此继续，直到找到为止，或者查找到最顶层的原型对象中也没有找到，就结束查找，返回undefined。可以看出，这个查找过程是一个链式的查找，每个对象都有一个到它自身原型对象的链接，这些链接组成的整个链条就是原型链。拥有相同原型的多个对象，他们的共同特征正是通过这种查找模式体现出来的。

**最顶层的原型对象**，这个对象就是Object.prototype，这个对象中保存了最常用的方法，如toString、valueOf、hasOwnProperty等，因此我们才能在任何对象中使用这些方法。

```jsx
//1. class 更加简单 上手
//2. class 更加符合 面向对象语言的写法
//3. class 本质还是 语法糖，用的是 prototype

// js 实现拓展方法
function MathHandel(x,y){
    this.x = x;
    this.y= y;
}

MathHandel.prototype.add = function(){
    console.log('MathHandel add func',this.x+this.y);
}

let x = new MathHandel(5,6);
x.add();



// js 实现继承

function Animal(){
    this.eat=function(){
        console.log('animal can eat ...');
    }
}

function Dog(){
    this.break=function(){
        console.log('dog can break');
    }
}

Dog.prototype = new Animal();

let y = new Dog();
y.eat();
y.break();

// class 实现 继承


class Animalgg{
    constructor(name){
        this.name=name;
    }
    eat(){
        console.log('gg animal can wat 。。。');
    }
}

class Dogkk extends Animalgg{
    constructor(name){
        super(name)
    }
    break(){
        console.log('kk dog can break 。。。');
    }
}

let z = new Dogkk('xiao he');
z.eat();
z.break();
```



## 闭包

### 1. 闭包到底是啥

当前环境中存在指向父级作用域的引用。

函数执行之后返回结果是一个内部函数，并被外部变量所引用，如果内部函数持有被执行函数作用域的变量，就形成了闭包。

闭包是指有权访问另外一个函数作用域中的变量的函数。

闭包是指那些能够访问自由变量的函数。

- 闭包就是能够读取其他函数内部变量的函数
- 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个
- 函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域
- 闭包的特性：
  - 函数内再嵌套函数
  - 内部函数可以引用外层的参数和变量
  - 参数和变量不会被垃圾回收机制回收
- 优点：能够实现封装和缓存等
- 缺点：消耗内存、使用不当会内存溢出，
- 解决方法：在退出函数之前，将不使用的局部变量全部删除

### 2. 说说你对作用域链的理解

- 作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到 `window`对象即被终止，作用域链向下访问变量是不被允许的。
- 简单的说，作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期

### 3. 作用域

（什么是作用域链？）首先要明白**作用域链**的概念，其实很简单，在ES5中只存在两种作用域————全局作用域和函数作用域，`当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链`，值得注意的是，每一个子函数都会拷贝上级的作用域，形成一个作用域的链条。

对于作用域链我的理解就是，根据在内部函数可以访问外部函数变量的这种机制，用链式查找决定哪些数据能被内部函数访问。 想要知道js怎么链式查找，就得先了解js的执行环境。

### 4. 闭包产生的原因

闭包产生的本质就是，当前环境中存在指向父级作用域的引用。

### 5. 闭包的表现形式

1.返回一个函数。

2.作为函数的参数传递

```js
var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这就是闭包
  fn();
}
// 输出2，而不是1
foo();
```

3.在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。



### 6. 闭包为什么可以实现在函数外读取到函数内的变量？

- 原因：
  - f1是f2的父函数，f2被赋给了一个全局变量，f2始终存在内存中，f2的存在依赖f1，因此f1也始终存在内存中，不会在调用结束后，被垃圾回收机制回收。
  
  - ```js
    function f1(){
            var n = 123;
            function f2(){    //f2是一个闭包
                alert(n)
            }    
            return f2;
        }
    
    // js链式作用域：子对象会一级一级向上寻找所有父对象的变量，反之不行。
    ```

- 
  变量的作用域可以分为全局变量和局部变量。 


#### 全局作用域： 

最外层函数定义的变量拥有全局作用域，即对任何内部函数来说，都是可以访问的：

~~~js
<script>
      var outerVar = "outer";
      function fn(){
         console.log(outerVar);
      }
      fn();//result:outer
</script>
~~~

#### 局部作用域： 

和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，而对于函数外部是无法访问的，最常见的例如函数内部

~~~js
<script>
      function fn(){
         var innerVar = "inner";
      }
      fn();
      console.log(innerVar);// ReferenceError: innerVar is not defined
</script>
~~~


函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！

理解

~~~js
/**
 * [init description]
 * @return {[type]} [description]
 */
function init() {
    var name = "Chrome";    //创建局部变量name和局部函数alertName

    function alertName() { //alertName()是函数内部方法，是一个闭包
        alert(name); //使用了外部函数声明的变量，内部函数可以访问外部函数的变量
    }
    alertName();
}
init();
//一个变量在源码中声明的位置作为它的作用域，同时嵌套的函数可以访问到其外层作用域中声明的变量

/**
 * [outFun description]
 * @return {[type]} [description]
 */
function outFun(){
    var name = "Chrome";
    function alertName(){
        alert(name);
    }
    return alertName;   //alertName被外部函数作为返回值返回了,返回的是一个闭包
}

var myFun = outFun();
myFun();
/*
闭包有函数+它的词法环境；词法环境指函数创建时可访问的所有变量。
myFun引用了一个闭包，闭包由alertName()和闭包创建时存在的“Chrome”字符串组成。
alertName（）持有了name的引用，
myFunc持有了alertName（）的的访问，
因此myFunc调用时，name还是处于可以访问的状态。
 */


/**
 * [add description]
 * @param {[type]} x [description]
 */
function add(x){
    return function(y){
        return x + y;
    };
}

var addFun1 = add(4);
var addFun2 = add(9);

console.log(addFun1(2)); //6
console.log(addFun2(2));  //11
//add接受一个参数x，返回一个函数,它的参数是y，返回x+y
//add是一个函数工厂，传入一个参数，就可以创建一个参数和其他参数求值的函数。
//addFun1和addFun2都是闭包。他们使用相同的函数定义，但词法环境不同，addFun1中x是4，后者是5
~~~

闭包应用场景之setTimeout

```js
//原生的setTimeout传递的第一个函数不能带参数
    setTimeout(function(param){
        alert(param)
    },1000)


    //通过闭包可以实现传参效果
    function func(param){
        return function(){
            alert(param)
        }
    }
    var f1 = func(1);
    setTimeout(f1,1000);
```

### 7. 回答方式

闭包是指有权**访问另外一个函数作用域中**的变量的函数，

闭包是指那些能够访问自由变量的函数。

1. 首先你要讲出作用域链是啥。

   当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链。体现在函数中就是，每一个子函数都会拷贝上级的作用域，形成一个做那个与的链条。

   如下例：

   ~~~js
   var a = 1
   function f1(){
   	var a = 2
       function f2(){
           var a = 3
           console.log(a) // 3
       }
   }
   ~~~

   作用域是从最底层向上查找，一直会找到全局作用域window为止，如果全局还没有的话就会报错。

2. 然后你要说出来杂产生的。

   闭包产生的原因，是由于当前环境中存在指向父级作用域的引用。

   ~~~js
   function fu(){
       var n = 2
       function zi(){
           console.log(n) // 2
       }
       return zi
   }
   var res = fu()
   res()
   ~~~

   此时的res会拿到父级作用域中的变量，能够输出2.因为当前环境中，含有对`zi`的引用，`zi`中又引用window、fu、zi的作用域。因此zi可以访问到fu的作用域中的变量。

3. 最后你得说说应用场景吧，为啥用闭包啊，在哪里用的。

- 场景1 典型应用是模块封装，在各模块规范出现之前，都是用这样的方式防止变量污染全局。

  - ~~~
    var fn = (function () {
        // 这样声明为模块私有变量，外界无法直接访问
        var foo = 0;
    
        function fn() {}
        fn.prototype.bar = function bar() {
            return foo;
        };
        return fn;
    }());
    ~~~

- 场景二 在循环中创建闭包，防止取到意外的值。

  - ```js
    for (var i = 0; i < 3; i++) {
        document.getElementById('id' + i).onfocus = function() {
          alert(i);
        };
    }
    //可用闭包解决
    function makeCallback(num) {
      return function() {
        alert(num);
      };
    }
    for (var i = 0; i < 3; i++) {
        document.getElementById('id' + i).onfocus = makeCallback(i);
    }
    ```
    
  - 再来一个例子
    
  - ~~~js
    // 能够返回一个函数
    var a = 1
    function fu(){
        var a = 2
        function zi(){
            console.log(a)
        }
        mom(zi)
    }
    function mom(fn){
        fn() // 此时fn就是闭包
    }
    fu() // 2 
    ~~~



在定时器，事件监听，Ajax请求或者异步操作中，只要使用了回调函数callback，实际上就是应用了闭包。

1. 闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，我们可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
2. 函数的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

## 异步 单线程

作为浏览器语言，JavaScript的用途是用户交互和操作DOM，用途决定了JavaScript的单线程。

### 1.1 执行栈

所有同步任务都在主线程上执行，形成一个执行栈。

### 1.2 任务队列

由于单线程，意味着所有执行中的任务都需要排队。前一个任务结束才会执行后一个。如果前一个任务耗时很长，后一个任务就得一直等着。为了解决这种情况，JavaScript将任务分成两种，同步任务和异步任务。

- 同步任务是指在主线程上排队执行的任务。
- 异步任务指的是不进入主线程，而是进入任务队列的任务。由任务队列通知主线程，某个异步任务是否可以执行了，该任务才会进入主线程执行。
- 被处理的消息会被移出队列，并作为输入参数来调用与之关联的函数。

### 1.3 事件循环

事件循环负责收集事件（包括用户事件以及其他非用户事件），对任务队列进行排队以便在合适的时间执行回调。

当主线程处理完所有同步任务，这时执行栈就空了，主线程就会访问任务队列的头部，看看任务队列的头部有没有已经注册好的回调函数，如果有就把其放置执行栈，进行执行。执行完后执行栈又空了，就会继续前面的操作，如此循环往复。

### 1.4 执行上下文

引用MDN上的解释就是：当一段JavaScript 代码在运行的时候，它实际上是运行在**执行上下文**中。每个代码段开始执行的时候都会创建一个新的上下文来运行它，并且在代码退出的时候销毁掉。

- `全局执行上下文`： 代码开始执行时首先进入的环境。
- `函数执行上下文`：函数调用时，会开始执行函数中的代码。
- `eval执行上下文`：不建议使用，可忽略。

### 1.5 宏任务队列和微任务队列

- 整块代码块进入执行栈的行为就是一个宏任务。
- 每次当一个任务**退出且执行上下文为空**的时候，微任务队列中的每一个微任务会依次被执行。

- 当执行来自任务队列中的任务时，在每一次新的事件循环开始迭代的时候运行时都会执行队列中的每个任务。在每次迭代开始之后加入到队列中的任务需要**在下一次迭代开始之后才会被执行**。
- 微任务可以添加新的微任务到队列中，并在下一个任务开始执行之前且当前事件循环结束之前执行完所有的微任务。（在处理微任务（microtask）期间，如果有新添加的微任务（microtask），也会被添加到队列的末尾并执行）
- 宏任务：主代码块，setTimeout，setInterval，setImmediate，I/O，UI render
- 微任务： process.nextTick， Promise，Async/Await，MutationObserver

执行宏任务，然后执行该宏任务产生的微任务，若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。

## JS中的数据类型

### 原始数据类型

- boolean
- null
- undefined
- number
- string
- symbol

### 引用数据类型

- 对象Object
  - 普通对象-Object
  - 数组对象-Array
  - 正则对象-RegExp
  - 日期对象-Date
  - 数学函数-Math
  - 函数对象-Function

### 类型判断

#### typeof操作符

1. 由于js中的变量是松散类型的，所以它提供了一种检测当前变量的数据类型的方法，也就是typeof关键字.
   通过typeof关键字，对这5种数据类型会返回下面的值（以字符串形式显示)
2. undefined ---------- 如果值未定义 Undefined
3. boolean ---------- 如果这个值是布尔值
4. Booleanstring---------- 如果这个值是字符串String
5. number ---------- 如果这个值是数值类型 Number
6. object---------- 如果这个值是对象或null/Object

####  instanceof 能否判断基本数据类型？

 能，手动实现

instanceof的原理是基于原型链的查询，只要处于原型链中，判断永远为true。

```js
function myInstanceof(left, right) {
    //基本数据类型直接返回false
    if(typeof left !== 'object' || left === null) return false;
    //getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {
        //查找到尽头，还没找到
        if(proto == null) return false;
        //找到相同的原型对象
        if(proto == right.prototype) return true;
        proto = Object.getPrototypeof(proto);
    }
}
```

#### 数据类型的判断

`Object.prototype.toString.call()`

~~~js
var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
~~~

## this指向问题

https://www.cnblogs.com/peerless1029/p/9967098.html（讲解）

- 绝大多数情况下，函数的调用方式决定了this的指向问题。
- this不能在执行期间被赋值，并且在每次函数被调用时this的值可能不同。
- 此外，在严格模式和非严格模式之间也会有一些差别。

- this指向的对象称为函数的上下文对象context。
- this的指向取决于函数被调用方式 。

- 直接通过**函数名**来调用函数，this指向全局变量window;
- 通过**对象.函数名**调用函数，this指向该对象。

### DOM对象调用函数时this的指向问题

小结：this的指向不是函数声明是绑定的，而是在函数运行过程中动态绑定的。this的指向不是函数声明时绑定的，而是在函数运行过程中动态绑定的。

### 改变this指向的方法 apply call bind

~~~js
var liLei={
  name:'liLei',
  money:10,
  buyPen:function(){
    this.money=this.money-1;
    console.log(this.name+" have money:"+this.money)
  }
}

var hanMeiMei={
  name:'hanMeiMei',
  money:20,
  buyPan:function(){
    this.money=this.money-2;
    console.log(this.name+" have money:"+this.money)
  }
}

liLei.buyPen(); // liLei have money:9
hanMeiMei.buyPan(); //hanMeiMei have money:18
~~~

例子很好理解，输出的结果相信大家也能看得明白，哪天，韩梅梅想买一个盆，她买不了，因为她还没有这个方法，她一想：我没有这个方法，但是李雷有啊，我打电话给李雷把钱他让他帮我买啊；后来李雷想买一个盘，实现方法也是如此。那么，在代码中如何实现呢？

JavaScript有好几个方法可以实现：call,apply,bind。

#### **call方法:**

- 语法：call(thisObj，Object)
- 定义：调用一个对象的一个方法，以另一个对象替换当前对象。
- 说明：
  - call 方法可以用来代替另一个对象调用一个方法。
  - call 方法可将一个[函数](https://www.baidu.com/s?wd=函数&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。
  - 如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。

```
liLei.buyPen.call(hanMeiMei); //hanMeiMei have money:19
hanMeiMei.buyPan.call(liLei); //liLei have money:8
```

#### **apply方法：**

- 语法：apply(thisObj，[argArray])
- 定义：应用某一对象的一个方法，用另一个对象替换当前对象。
- 说明：
  - 如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。
  - 如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。

```
liLei.buyPen.apply(hanMeiMei); //hanMeiMei have money:19
hanMeiMei.buyPan.apply(liLei); //liLei have money:8
```

#### **bind方法：**

```
liLei.buyPen.bind(hanMeiMei)(); //hanMeiMei have money:19
hanMeiMei.buyPan.apply(liLei)(); //liLei have money:8
```

#### 小结：

三种方法的相同指出是：可以改变this的指向，不同之处是：apply接受的参数为一个数组，call接收的参数为一个个独立的值；apply，call会直接调用方法，bind改变this的指向返回一个方法不调用。

## 变量和函数声明

**未声明的变量**指的是程序中不存在且未声明的变量，程序调用会报错，运行时错误！
**未定义的变量**指的是程序中已声明但未赋值的变量；程序调用不会报错，返会`undefined`。

## ES6相关

### const和let

- `const/let` 不允许在同一个作用域内，重复声明
- `const`：声明一个常量，`let`：声明一个变量；`const/let` 声明的常量/变量都只能作用于代码块（块级作用域或函数作用域）里
- `const/let` 不存在变量提升，所以在代码块里必须先声明然后才可以使用，这叫暂时性死区；
- `const` 声明时必须初始化，且后期不能被修改，但如果初始化的是一个对象，那么不能修改的是该对象的内存地址；
- `const/let` 在全局作用域中声明的常量/变量不会挂到顶层对象（浏览器中是 window ）的属性中；

### 解构赋值

字符串解构

```js
let [a, b, c = 'c'] = '12'
console.log(a, b, c)  // '1' '2' 'c'
```

数值解构

```js
let {toFixed: str} = 10
console.log( str.call(Math.PI, 2) )  // 3.14
```

布尔值解构

```js
let {bal: str} = true
console.log( str.call(false) )  // 'false'
```

数组解构：等号右侧的数据具有 `Iterator` 接口可以进行数组形式的解构赋值；

```js
// 解构不成功的变量值为 undefined
let [a, b, c] = [1, 2]
console.log(a, b, c)  // 1, 2, undefined

// 可以设置默认值
let [x, y, z = 3] = [1, 2, null]
console.log(x, y, z)  // 1, 2, null
```

对象解构：与数组按照索引位置进行解构不同，对象解构是按照属性名进行解构赋值，如果在当前对象属性匹配不成功则会去对象的原型属性上查找。

```js
// 默认写法
let { name: name, age: age } = { name: '放逐大帝', age: 28 }
复制代码
// 简写
let { name, age } = { name: '放逐大帝', age: 28 }
```

### Symbol

- `Symbol` 是一个新的原始类型，用来表示一个独一无二的值
- 通过 `Symbol()` 函数来创建一个 `Symbol` 类型的值
- `Symbol` 类型无法通过数学运算符进行隐式类型转换，但是可以通过 `String()` 显示转成字符串或者通过 `Boolean()` 显示转成布尔值
- 引入 `Symbol` 最大的初衷其实就是为了让它作为对象的属性名而使用
- `Symbol` 属性的不可枚举性，不会被 `for...in`、`for...of`、`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()` 等枚举

### 迭代器与for...of

- 对于for...of循环，它则是ES6 创造出的一种新的用于遍历序列结构的语法。它可以配合迭代器使用，**只要实现了Iterator接口，任意对象都可以使用for...of循环遍历**。
- **迭代器**（Iterator）就是这样一种机制。它是一种**接口**，为各种不同的数据结构提供**统一的访问机制**。

- 常见数据类型

JavaScript常见的数据结构如Array、Set、Map、伪数组arguments等等，在它们的原型上**都有Symbol.iterator标识，并且有默认的Iterator实现**，所以它们的实例对象都可以使用for of语法遍历。

- 手动实现

普通对象是没有这个接口标识以及iterator的实现的，可以手动为普通对象添加这个标识以及对应的iterator实现，让它支持for...of循环遍历。

### Map

- Map的key相比较普通对象来说更为灵活，普通对象的key只能以基础数据类型作为key值，并且所有传入的key值都会被转化成string类型，而Map的key可以是各种数据类型格式。

- 对象的键只能是字符串或者 `Symbol`,`Map` 的键可以是任何类型（原始类型、对象或者函数）

- `Map` 中的键必须是唯一的

  - `Map.prototype.size`：返回 `Map` 对象的键值对数量；
  - `Map.prototype.set(key, value)`：设置 `Map` 对象中键的值。返回该 `Map` 对象；
  - `Map.prototype.get(key)`： 返回键对应的值，如果不存在，则返回 `undefined`；
  - `Map.prototype.has(key)`：返回一个布尔值，表示 `Map` 实例是否包含键对应的值；
  - `Map.prototype.delete(key)`： 如果 `Map` 对象中存在该元素，则移除它并返回 `true`；
  - `Map.prototype.clear()`： 移除 `Map` 对象的所有键/值对；
  - `Map.prototype.keys()`：返回一个新的 `Iterator` 对象， 它按插入顺序包含了 `Map` 对象中每个元素的键；
  - `Map.prototype.values()`：返回一个新的 `Iterator` 对象，它按插入顺序包含了 `Map` 对象中每个元素的值；
  - `Map.prototype.entries()`：返回一个新的 `Iterator` 对象，它按插入顺序包含了 `Map` 对象中每个元素的 `[key, value]` 数组；
  - `Map.prototype.forEach(callbackFn[, thisArg])`：按插入顺序遍历 `Map`；

- ### WeakMap

  - 类似于 `Map` 的结构，但是键必须是对象的弱引用，注意弱引用的是键名而不是键值，因而 `WeakMap` 是不能被迭代的；

### Set

- Set结构不会添加重复数据，可以接受具有iterable接口的其他数据结构作为参数。如果传递一个[可迭代对象],，它的所有元素将不重复地被添加到新的 **Set**中。如果不指定此参数或其值为`null`，则新的 **Set**为空。

- Set中的NaN等于自身。

- Set.size。size属性的默认值为0。

- Set.ptoperty表示`Set`构造器的原型，允许向所有`Set`对象添加新的属性。

- `Set` 是一种新的数据结构，类似数组，但是它没有键只有值，且值都是唯一的

  - `Set.prototype.constructor`：构造函数，默认就是 `Set` 函数；

  - `Set.prototype.size`：返回 `Set` 实例的成员总数；

  - `Set.prototype.add(value)`：添加某个值，返回 `Set` 结构本身；

  - `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功；

  - `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为Set的成员；

  - `Set.prototype.clear()`：清除所有成员，没有返回值；

  - `Set.prototype.keys()`：返回键名的遍历器；

  - `Set.prototype.values()`：返回键值的遍历器；

  - `Set.prototype.entries()`：返回键值对的遍历器；

  - `Set.prototype.forEach()`：使用回调函数遍历每个成员；

  - 相关应用

    - 使用Set取集合

      ~~~js
      let a = new Set([1, 2, 3]);
      let b = new Set([4, 3, 2]);
      
      // 并集
      let union = new Set([...a, ...b]);
      // Set {1, 2, 3, 4}
      
      // 交集
      let intersect = new Set([...a].filter(x => b.has(x)));
      // set {2, 3}
      
      // （a 相对于 b 的）差集
      let difference = new Set([...a].filter(x => !b.has(x)));
      // Set {1}
      
      
      ~~~

      - 数组去重

        ~~~js
        // 数组去重
        let arr = [1,1,2,3];
        arr = Array.from(new Set(arr));// 经过性能比较测试，表现优秀
        // arr = [1,2,3]
        
        // 字符串去重
        let str = 'aaabbsf';
        let newStr = '';
        new Set(str).forEach(item) => {newStr += item});
        // newStr absf
        ~~~

- WeakSet

  - `WeakSet` 对象允许将弱保持对象存储在一个集合中
  - **和 `Set` 的区别**
    - `WeakSet` 只能是对象的集合，而不能是任何类型的任意值；
    - `WeakSet` 持弱引用：集合中对象的引用为弱引用。如果没有其他的对 `WeakSet` 中对象的引用，那么这些对象会被当成垃圾回收掉。这也意味着 `WeakSet` 中没有存储当前对象的列表。正因为这样，`WeakSet` 是不可枚举的，也就没有 `size` 属性，没有 `clear` 和遍历的方法。

### Object.values()

返回一个由对象自身所有可遍历属性的**属性值**组成的数组

~~~js
const player = { name: '大拐' };
Object.defineProperty(player, 'age', {
    value: 12,
    enumrable: false  // age 属性将不可遍历
})
console.log(Object.values(player))  // ['大拐']

// 类似 str.split('') 效果
console.log(Object.values('abc'))  // ['a', 'b', 'c']
~~~

### Object.entries()

返回一个由对象自身所有可遍历属性的**键值对**组成的数组

~~~js
const player = { name: '大拐', age: 32 };
console.log(Object.entries(player))  // [["name", "大拐"], ["age", 32]]
~~~

利用这个方法可以很好的将对象转成正在的 `Map` 结构：

~~~js
const map = new Map(Object.entries(player))
console.log(map)  // Map { name: '大拐', age: 32 }
~~~

### Object.getOwnPropertyDescriptors()

`Object.getOwnPropertyDescriptor()` 会返回指定对象某个自身属性的的描述对象，而 `Object.getOwnPropertyDescriptors()` 则是返回指定对象自身所有属性的描述对象

## 事件相关知识

### 1.DOM事件级别

- DOM 0级事件

  - ~~~js
    el.onclick=function(){}
    ~~~

- DOM 2级事件

  - ~~~js
    el.addEventListener(event-name, callback, useCapture)
    ~~~

  - **useCapture: 默认是false，代表事件句柄在冒泡阶段执行**

- DOM 3级事件

  - 在DOM 2级事件的基础上添加了更多的事件类型。
  - 鼠标事件  dblclick、mouseup
  - 键盘事件 keydown、keypress
  - 合成事件等 compositionstart



### 2.DOM事件模型和事件流

**DOM事件模型分为捕获和冒泡**。一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

（1）捕获阶段：事件从window对象自上而下向目标节点传播的阶段；

（2）目标阶段：真正的目标节点正在处理事件的阶段；

（3）冒泡阶段：事件从目标节点自下而上向window对象传播的阶段。



### 3.事件代理（事件委托)

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

优点

1. 减少内存消耗，提高性能
2. 动态绑定事件

~~~js
// 给父层元素绑定事件
document.getElementById('ul').addEventListener('click', function (e) {
  // 兼容性处理
  var event = e || window.event;
  var target = event.target || event.srcElement;
  // 判断是否匹配目标元素
  if (target.nodeName.toLocaleLowerCase === 'li') {
    console.log('the content is: ', target.innerHTML);
  }
});

~~~

### 4.常见应用

- event. preventDefault()  **如果调用这个方法，默认事件行为将不再触发**。
- event.stopPropagation() & event.stopImmediatePropagation()
  -  **event.stopPropagation() 方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行**。
  - **stopImmediatePropagation 既能阻止事件向父元素冒泡，也能阻止元素同事件类型的其它监听器被触发。而 stopPropagation 只能实现前者的效果**。
- event.target & event.currentTarget
  - `event.target`指向引起触发事件的元素，**事件的真正发出者**
  - `event.currentTarget`则是事件绑定的元素，**监听事件者**

## 常见问题

### 1.创建对象有几种方法

- ####  字面量 


- #### Object 


- ####  构造函数


```js
// 1.字面量
var o1 = {
    name: 'o1'
};
var o2 = new Object({
    name: 'o2'
});
// 2.Object.create()
var o3 = Object.create({
    name: 'o3'
});
// 3.构造函数
var M = function () {
    this.name = 'o3'
};
var o4 = new M();
```

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的____proto____。 

### 2.js判断数组的方法

~~~js
let arr = []

1.  instanceof 

    arr isntanceof Array

2. __proto__

    arr.__proto__  === Array.prototype

3. constructor

    arr.constructor === Array

4. Object.prototype.toString

   Object.prototype.toString.call(arr) === '[object Array]'

5. Array.isArray

    Array.isArray(arr)

//其中方法1，2，3 主要是通过原型去判断的， 4是通过object类型的副属性class去判断的，其中函数的class是Function，结果是[object Function]， 普通的对象是Object，结果是[object Object]，5是es6新增的方法
~~~



### 3.== 和 === 

当进行双等号比较时候： 先检查两个操作数数据类型，如果相同， 则进行===比较， 如果不同， 则愿意为你进行一次类型转换， 转换成相同类型后再进行比较， 而===比较时， 如果类型不同，直接就是false.

双等号==： == 中，左右两边都需要转换为数字然后进行比较。

　　（1）如果两个值类型相同，再进行三个等号(===)的比较

　　（2）如果两个值类型不同，也有可能相等，需根据以下规则进行类型转换在比较：

　　　　1）如果一个是null，一个是undefined，那么相等

　　　　2）如果一个是字符串，一个是数值，把字符串转换成数值之后再进行比较

类型不同时，其实用的是Number(a)==Number(b)判断；

如果有一个操作数是 NaN，则相等操作符返回 false。

　　

　　三等号===: 严格相等，不仅左右两边的值要相等，并且类型也应相等。

　　（1）如果类型不同，就一定不相等

　　（2）如果两个都是数值，并且是同一个值，那么相等；如果其中至少一个是NaN，那么不相等。（判断一个值是否是NaN，只能使用isNaN( ) 来判断）

　　（3）如果两个都是字符串，每个位置的字符都一样，那么相等，否则不相等。

　　（4）如果两个值都是true，或是false，那么相等

　　（5）如果两个值都引用同一个对象或是函数，那么相等，否则不相等

　　（6）如果两个值都是null，或是undefined，那么相等

如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString()方法，然后再次依照前面的规则转换返回的字符串值。

~~~js
    console.log({}=={}, {}==!{}); // false false
// {}-->true !{}-->false-->0
    console.log([]==[], []==![]); // false true
Number(false) // 0
Number([]) // 0
Number({}) //NaN
~~~



### 4.[] == ![]的结果

结果为true

[]转换为数字为0。

![] 首先是转换为布尔值，由于[]作为一个引用类型转换为布尔值为true, 因此![]为false，进而在转换成数字，变为0。

### 5.BOM DOM

DOM是文档对象模型，把文档当坐一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

BOM是浏览器对象模型，把浏览器当做一个对象来对待，这个对象主要定义了与浏览器对象进行交互的方法和接口。BOM的核心就是window，而window对象具有双重角色。

### 6.事件委托

本质上是利用了浏览器事件冒泡的机制。

**addEventListener(*event*, *function*, *useCapture*)**

- event:必须。字符串，指定事件名。 不加'on'，如click
- function:必须。指定要事件触发时执行的函数。
- useCapture：可选。布尔值，指定事件是否在捕获或冒泡阶段执行(true-事件句柄在捕获阶段执行；false-默认。事件句柄在冒泡阶段执行)。

**removeEventListener** 移除事件监听。通过addEventListener()添加的**匿名函数**无法移除。

~~~js
window.onload = function(){
    var box =doucument.getElmentById("box");
    box.addEventListener("click",function(){
        console.log('哈哈')
    })
}
~~~

### 7. 0.1+0.2 === 0.3 ?

JavaScirpt 使用 Number 类型来表示数字（整数或浮点数），遵循 IEEE 754 标准，通过 64 位来表示一个数字（1 + 11 + 52）

- 1 符号位，0 表示正数，1 表示负数 s
- 11 指数位（e）
- 52 尾数，小数部分（即有效数字）

最大安全数字：Number.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1，转换成整数就是 16 位，所以 0.1 === 0.1，是因为通过 toPrecision(16) 去有效位之后，两者是相等的。

在两数相加时，会先转换成二进制，0.1 和 0.2 转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，JS 引擎对二进制进行截断，所以造成精度丢失。

### 8. 常见数据类型

两大类  

基本类型

- Number 
  - JS整数是怎么表示的？**通过Number类型来表示，最大安全数字是Math.pow(2,53)-1，对于16位十进制。**
  - Number()的存储空间是多大？如果后台发送了一个超过最大值的数字怎么办？**Math.pow(2, 53) ，53 为有效数字，会发生截断，等于 JS 能支持的最大数字。**
- Boolean 
- String 
- null
-  undefined 
- symbol 
- BigInt

引用类型

- Object
- Array
- Function

### 9. 说说事件流

事件流是网页元素接收事件的顺序。

DOM2级事件 规定事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。首先发生的事件捕获，为截获事件提供机会。然后是实际的目标接受事件。最后一个阶段是时间冒泡阶段，可以在这个阶段对事件做出响应。 虽然捕获阶段在规范中规定不允许响应事件，但是实际上还是会执行，所以有两次机会获取到目标对象。

当容器元素及嵌套元素，即在捕获阶段又在冒泡阶段调用事件处理程序时：事件按DOM事件流的顺序执行事件处理程序

- 父级捕获
- 子级冒泡
- 子级捕获
- 父级冒泡

### 10 new一个函数发生了什么？

- 创建一个全新的对象 Object.create()
- 这个对象会被执行[[Prototype]]连接，将这个新对象的[[Prototype]]链接到这个构造函数.prototype所指向的对象。
- 这个新对象会被绑定到函数调用的this
- 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。



1. 以ctor.prototype为原型创建一个对象 `Object.create(ctor.prototype)`
   1. 创建一个全新的对象
   2. 这个对象会被执行__proto__链接
2. 执行构造函数并将this绑定到新创建的对象上 `const res = ctor.apply(obj, args);`
   1. 通过new创建的每个对象最终都会被链接到这个函数的prototype对象上
3. 排除null的特殊形式
   1. const isObject = typeof res === "object" && res !== null;
   2.  const isFunction = typeof res === "function";
4. 如果构造函数返回非空对象，则返回该对象；否则返回刚创建的对象  `return isObject||isFunction?res: obj;`

### 11 `symbol` 的用处

- 用来表示一个独一无二的变量防止命名冲突。

- 利用 `symbol` 不会被常规的方法（除了 `Object.getOwnPropertySymbols` 外）遍历到，所以可以用来模拟私有变量
- 用来提供遍历接口，布置了 `symbol.iterator` 的对象才可以使用 `for···of` 循环，可以统一处理数据结构。调用之后回返回一个遍历器对象，包含有一个 next 方法，使用 next 方法后有两个返回值 value 和 done 分别表示函数当前执行位置的值和是否遍历完毕。



###  12.闭包是什么？

闭包是指有权访问另外一个函数作用域中的变量的函数。

- 什么是作用域？

ES5中存在两种作用域：全局作用域和局部作用域。在 JavaScript 中将**作用域定义为一套规则**，这套规则用来管理引擎如何在当前作用域以及嵌套子作用域中根据标识符名称进行变量（变量名或者函数名）查找。

- 什么是作用域链？

作用域链，就是有当前作用域与上层作用域的一系列变量对象组成，它保证了当前执行的作用域对符合访问权限的变量和函数的有序访问。

- 闭包产生的本质

当前环境中存在指向父级作用域的引用

- 什么是闭包
- 一般如何产生闭包

返回函数

函数当成参数传递

- 闭包的应用场景

函数柯里化

模块化

###  13. JS 隐式转换，显示转换

非基础类型机型转换时会先调用valueOf 如果valueOf无法返回基本类型值，就会接着调用toString

#### 字符串与数字

转换为数字然后比较

#### 其他类型与布尔类型

- 先把布尔类型转换为数字，然后继续进行比较

#### 对象与非对象

- 执行对象的 ToPrimitive(对象）然后继续进行比较

### 14 setTimeout(fn, 0)

指定某个任务在主线程最早可得的空闲时间执行，也就是说，当前代码执行完（执行栈清空）以后，尽可能的早执行。它在“任务队列”的尾部添加一个事件，因此要等到同步任务和“任务队列”现有的事件都处理完，才会得到执行。

HTML5标准规定了setTimeout()的第二个参数的最小值不得小于4毫秒，如果低于这个值，则默认是4毫秒。

setTimeout()只是将事件插入了“任务队列”，必须等当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。

### 15 Babel是如何编译Class的？

当使用`Babel`编译时默认的`loose`为`false`，即非宽松模式

无论哪种模式，转换后的定义在类内部的属性方法是被定义在构造函数的原型对象上的；静态属性被定义到构造函数上

只不过非宽松模式时，这些属性方法会被`_createClass`函数处理，函数内通过`Object.defineProperty()`设置属性的可枚举值`enumerable`为`false`

由于在`_createClass`函数内使用了`Object`，所以非宽松模式下是会产生副作用的，而宽松模式下不会。

`webpack`中的`UglifyJS`依旧还是会将宽松模式认为是有副作用的，而`rollup`有**「程序流程分析」**的功能，可以更好的判断代码是否真正产生副作用，所以它会认为宽松模式没有副作用。

- 为什么`Babel`对于类的处理会使用`Object.defineProperty`这种形式呢？它和直接使用原型链有什么不同吗？

  - 通过原型链声明的属性和方法是可枚举的，也就是可以被`for...of...`搜寻到

  - 而类内部声明的方法是不可枚举的

  - babel为了符合ES6真正的语义，编译类时采取了`Object.defineProperty`来定义原型方法。

  - 可以通过设置`babel`的`loose`模式(宽松模式)为`true`，它会不严格遵循ES6的语义，而采取更符合我们平常编写代码时的习惯去编译代码，在`.babelrc`中可以如下设置：

  - ~~~JS
    {
      "presets": [["env", { "loose": true }]]
    }
    ~~~

    

### 16 js加载方式 async defer

- 正常模式

  - ~~~js
    <script src="fn.js"></script>
    ~~~

  - 这种模式下JS会阻塞浏览器，浏览器必须等待fn.js加载和执行完毕以后才能去做其他事情。

- async 异步模式

  - async模式下，JS不会阻塞浏览器做其他的事情。它的加载是异步的，当它的加载结束，js脚本会立即执行。

  - ~~~js
    <script async src="fn.js"></script>
    ~~~

- defer 延迟模式

  - defer 模式下，JS 的加载是异步的，执行是被推迟的。等整个文档解析完成、DOMContentLoaded 事件即将被触发时，被标记了 defer 的 JS 文件才会开始依次执行。

###  17 如何判断一个对象是不是空对象？

`Object.keys(obj).length === 0`

### 18 **什么是原型链？**

当对象查找一个属性的时候，如果没有在自身找到，那么就会查找自身的原型，如果原型还没有找到，那么会继续查找原型的原型，直到找到 Object.prototype 的原型时，此时原型为 null，查找停止。 这种通过 通过原型链接的逐级向上的查找链被称为原型链

**原型继承**

一个对象可以使用另外一个对象的属性或者方法，就称之为继承。具体是通过将这个对象的原型设置为另外一个对象，这样根据原型链的规则，如果查找一个对象属性且在自身不存在时，就会查找另外一个对象，相当于一个对象可以使用另外一个对象的属性和方法了。

### 19 函数中的arguments是数组吗？类数组转数组的方法了解一下？

是类数组，长得像数组，但不能调用数组的原型上的函数。

- push
- pop
- splice
- slice
- shift
- unshift
- sort
- find
- findIndex
- map/filter/reduce 等函数式编程方法

### 20.类数组转数组的方法？

- ... 运算符

- Array.from

- Array.prototype.slice.apply(arguments)

  

### 21.箭头函数和普通函数有啥区别？箭头函数能当构造函数吗？

- 箭头函数没有 [[Construct]] 方法，不能被用作构造函数调用，当使用 new 进行函数调用时会报错。
- 普通函数通过 function 关键字定义， this 无法结合词法作用域使用，在运行时绑定，只取决于函数的调用方式，在哪里被调用，调用位置。
- 箭头函数不应用普通函数 this 绑定的四种规则，而是根据外层（函数或全局）的作用域来决定 this，且箭头函数的绑定无法被修改（new 也不行）。

### 22. 事件循环机制 （Event Loop）

事件循环机制从整体上告诉了我们 JavaScript 代码的执行顺序 `Event Loop`即事件循环，是指浏览器或`Node`的一种解决`javaScript`单线程运行时不会阻塞的一种机制，也就是我们经常使用**异步**的原理。

先执行宏任务队列，然后执行微任务队列，然后开始下一轮事件循环，继续先执行宏任务队列，再执行微任务队列。

- 宏任务：script/setTimeout/setInterval/setImmediate/ I/O / UI Rendering
- 微任务：process.nextTick()/Promise.then()

###  23. 数组扁平化

~~~js
unction flatten(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result = result.concat(arr[i]);
    }
  }

  return result;
}

~~~



###  24. 函数柯里化

柯里化是指这样一个函数，它接收函数 A，并且能返回一个新的函数，这个新的函数能够处理函数 A 的剩余参数

~~~js
function createCurry(func, args) {
  var argity = func.length;
  var args = args || [];
  
  return function () {
    var _args = [].slice.apply(arguments);
    args.push(..._args);
    
    if (args.length < argity) {
      return createCurry.call(this, func, args);
    }
    
    return func.apply(this, args);
  }
}

~~~



###  25.实现bind,call,apply函数

~~~js
// bind
Function.prototype.mybind = function (context, args) {
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }
  var self = this;
  return function F() {
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, [...args, ...arguments]);
  };
};
// call
// call 与apply的区别仅在于接收的是数组还是参数列表
Function.prototype.mycall = function (context = window, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Type Error");
  }
  const fn = Symbol("fn");

  context[fn] = this;

  const res = context[fn](...args);
  
  delete context[fn];
  return res;
};
// apply
Function.prototype.myapply = function (context = window, args) {
  if (typeof this !== "function") {
    throw new Error("Type Error");
  }

  const fn = Symbol("fn");
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];
  return res;
};
~~~

