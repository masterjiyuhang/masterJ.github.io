
常见的一些问题
## 1. Vue3 较 Vue2有什么优化？

- 采用`TypeScript`开发，作为强类型语言，可以在编码期间做类型检查，避免一些因类型问题导致的错误。较于`Vue2`使用`Flow`检查数据类型，对于一些复杂场景的类型检查支持较好。

- 源码体积优化，`tree-shaking`减少打包体积。

- 数据响应式实现，数据发生变化自动更新DOM，只需要关注数据的修改。

  - Vue2内部通过 Object.defineProperty 这个 API 去劫持数据的 getter 和 setter。但是对于嵌套层级比较深的对象，如果要劫持它内部深层次的对象变化，就需要递归遍历这个对象，执行 Object.defineProperty 把每一层对象数据都变成响应式的。

  - 并且Object.defineProperty需要提前知道要拦截的key是什么，不能检测对象属性的添加和删除。

  - Vue.js 3.0 使用了 Proxy API 做数据劫持。

    ~~~js
    observed = new Proxy(data, {
      get() {
        // 收集
      },
      set() {
        // 触发
      }
    })
    ~~~

  - Proxy劫持的是整个对象，所以对于对象属性的增加和删除都能检测到。

  - Proxy并不能检测到内部深层次的对象变化，Vue3在getter中去递归响应式，当真正访问到的内部对象才会变成响应式，不是把对象的所有属性都遍历一次。

- 编译层次上的优化。Vue3通过编译阶段对静态模板的分析，编译生成了 Block tree。借助 Block tree，Vue.js 将 vnode **更新性能**由与模版整体大小相关提升为**与动态内容的数量相关**。

- 组合式API （Composition API）。从新的 setup 函数返回JavaScript变量，而不是将组件的功能（例如state、method、computed等）定义为对象属性。

  - 可以解决当一个组件中包含多个mixins时，命名冲突的问题。
  - 将某个功能的逻辑封装在一个函数中，不像Vue2需要来回修改data，methods。

## 2. 详细说一下Vue2的数据响应式。

### 发布订阅模式和观察者模式

提到数据响应式，不得不说先说一下发布订阅模式和观察者模式。

- 发布订阅模式中，包含发布者，事件调度中心，订阅者三个角色。
- 发布者和订阅者是松散耦合的，互不关心对方是否存在，只关注事件本身。
- 发布者借用事件调度中心提供的`emit`方法发布事件，而订阅者则通过`on`进行订阅。
- 观察者模式与发布订阅模式相比，耦合度更高，通常用来实现一些响应式的效果。当一个对象被修改时，则会自动通知依赖它的对象。在观察者模式中，只有两个主体，分别是目标对象`Subject`，观察者`Observer`。
- 观察者需`Observer`要实现`update`方法，供目标对象调用。`update`方法中可以执行自定义的业务代码。
- 主要区别：观察者模式中观察者和目标直接进行交互，而发布订阅模式中统一由调度中心进行处理，订阅者和发布者互不干扰。

### 响应式对象

`Object.defineProperty` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性。利用 `Object.defineProperty` 给数据添加了 getter 和 setter，目的就是为了在我们访问数据以及写数据的时候能自动执行一些逻辑：getter 做的事情是依赖收集，setter 做的事情是派发更新。

```js
Object.defineProperty(obj, prop, descriptor)
```

- `obj` 是要在其上定义属性的对象
- `prop` 是要定义或修改的属性的名称
- `descriptor` 是将被定义或修改的属性描述符
  - `descriptor` 是将被定义或修改的属性描述符，其中可以定义`get`和`set`方法，`get` 是一个给属性提供的 getter 方法，当我们访问了该属性的时候会触发 getter 方法；`set` 是一个给属性提供的 setter 方法，当我们对该属性做修改的时候会触发 setter 方法。一个对象的属性被访问和修改时都能够呗监听到，就可以称之为响应式对象。
  - 利用 `Object.defineProperty` 给数据添加了 getter 和 setter方法，在访问数据以及修改数据的时候能在其中自动执行一些逻辑：getter 做的事情是依赖收集，setter 做的事情是派发更新。

### 详细回答

实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 `Object.defineProperty() `对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

### 延伸问题

1. 知道Vue3怎么实现的吗？ 二者有什么区别，优缺点分别是什么？
2. 可以自己实现一个数据响应式吗？

## 3. vm.$set()作用

1. 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。

2. Vue 无法检测到对象属性的添加或删除。

3. Vue2.x 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。

   - 如果目标是数组，直接使用数组的 splice 方法触发相应式

   - 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）


## 4. Vue双向绑定

- 实现了一个监听器Observer，对数据对象进行遍历，包括了属性对象，利用`Object.defineProperty()`属性都加上setter和getter。这样的话，给这个对象的某个值赋值，就会触发setter，那么就监听到了数据变化。

- 实现了一个解析器`Compile`，解析Vue模板指令，将模板中的遍历都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
- 实现一个订阅者`Watcher`:Watch订阅者是`Observer`和`Compile`之间通信的桥梁，主要的任务是订阅Observer中的属性值变化的消息，当收到属性值变化的消息时，触发解析器Compile中的对应的更新函数。
- 实现一个订阅器Dep，订阅器采用发布-订阅设计模式，用来收集订阅者Watcher，对监听器Observer和订阅者watcher进行统一管理。

## 5. 两种路由模式

- history 与 hash 模式。默认是hash模式。

- hash模式：是指url尾巴后的#号以及后面的字符。hash也称为锚点，本身是用来做页面定位的，它可以使对应的id元素显示在可视区域。hash虽然出现在url中，但不会被包括在http请求中，对后端完全没有影响，因此改变hash不会被重新加载页面。hash值的变化不会导致浏览器向服务器发出请求，而hash改变会触发hashchange事件(只改变#后面的url片段)；hash发生变化url都会被浏览器记录下来，从而可以使用浏览器的前进和后退。又称为前端路由，单页面应用的标配。

- history：利用了HTML5新增的pushState()和replaceState()方法，需要特定的浏览器支持

- `pushState()` 需要三个参数: 一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个URL

- `replaceState()` 是修改了当前的历史记录项而不是新建一个。 

## 6. 依赖预编译

- Dependency Pre-Bundling

- Vite会在DevServer启动之前对需要与编译处理的依赖进行编译。

- 然后在分析模块的导入(import)时会动态的应用编译过的依赖。


## 7. setup中不能使用this

Vue3中

![image-20210820142223186](/Users/a58/Library/Application Support/typora-user-images/image-20210820142223186.png)

`getCurrentInstance`

- 支持访问内部组件实例
- 只能在setup或生命周期钩子中调用

```ts
import { getCurrentInstance } from 'vue'

const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance()

    internalInstance.appContext.config.globalProperties // 访问 globalProperties
  }
}
```

## 8. 自定义组件template不生效

Component provided template option but runtime compilation is not supported

- 原因： 默认vue3位runtime模式，执行dist/vue.runtime.common.js文件，不支持运行时编译。


需要将bundle设置为别名"vue"为"vue/dist/vue.esm-bundler.js"

- 解决的方法：
  - 在vue.config.js的配置中添加alias
  
  - ~~~js
    export default defineConfig({
      plugins: [vue(), vueJsx()],
      alias: {
        'vue': 'vue/dist/vue.esm-bundler.js'
        },
    })
    ~~~



