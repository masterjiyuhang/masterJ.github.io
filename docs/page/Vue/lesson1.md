## Vue2源码

### 目录分析

vue的源码放在src文件夹下，该目录各文件的功能如下：

- compiler 编译相关
- Core  vue的核心代码。包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等。
- platforms 不同平台的代码支持
- server ssr服务端渲染
- sfc 文件解析
- shared 共享代码

### 打包构建

Vue打包时执行npm run build，在package.json中可以看到实际上执行的命令是`node script/build.js`，`build.js`文件中主要是首先在`scripts/config.js`文件下读取配置文件，构建出不同用途的Vue.js。在scripts/config.js文件下可以看到不同的配置。其中`enrty`表示入口，`dest`表示打包结束后放在哪，`format` 属性表示构建的格式（cjs即CommonJS规范、es即ES Module规范、umd即UMD规范）。

resolve函数用于处理传入的路径信息，将传输的信息转成数组，数组的第一个元素设置成base，与scripts/alias中的前缀信息对应。根据数组的第二个元素找到真实的路径。

为了分析Vue的编译过程，看源码选择`Runtime+compiler CommonJS build`的 Vue.js。

### 追根溯源

在文件`src/platforms/web/entry-runtime-with-compiler.js`中引入`import Vue from './runtime/index'`。

`vue/src/core/index.js`中引入`import Vue from './instance/index'`

`vue/src/core/instance/index.js`中用Function实现一个了Vue类，即为Vue的始发点。

~~~js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
~~~

### 数据渲染

20210615

1. ### `_init()`方法

上一节中可以看到，Vue作为一个类，通过new关键字初始化，调用`this._init`方法。

```js
this._init(options)
```

`src/core/instance/init.js`中定义了`this._init`方法。该方法中

~~~js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
  
    ....
    
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
  
		....
    
    if (vm.$options.el) {
      vm.$mount(vm.$options.el) // 检查el属性，如果存在，调用vm.$mount方法挂在vm
    }
  }
~~~

`vm.$mount(vm.$options.el)`挂载 `vm`，把模板渲染成DOM。

2. #### `$mount（）方法`

`src/platforms/web/entry-runtime-with-compiler.js`中定义了$mount方法。

```js
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
			...

      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
      
			...
    }
  }
  return mount.call(this, el, hydrating)
}
```

- 首先缓存原型上的 $mount 方法，再重新定义该方法。

- 判断Vue 不能挂载在 body、html 这样的根节点上。
- 如果没有定义 `render` 方法，则会把 `el` 或者 `template` 字符串转换成 `render` 方法
- `render` 方法是调用 `compileToFunctions` 方法实现的。
- 最后，调用原先原型上的 `$mount` 方法挂载。

原先原型上的 `$mount` 方法在 `src/platform/web/runtime/index.js` 中定义，`$mount` 方法实际上会去调用 `mountComponent` 方法，这个方法定义在 `src/core/instance/lifecycle.js` 文件中。

~~~js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean // hydrating 参数是和服务端渲染相关
): Component {
  updateComponent = () => {
      console.log('初始化渲染最终执行的地点～  _render 和 _update');
      vm._update(vm._render(), hydrating)
    }

  new Watcher(vm, updateComponent, noop, {
      // Watcher 在这里起到两个作用，一个是初始化的时候会执行回调函数
      // 另一个是当 vm 实例中的监测的数据发生变化的时候执行回调函数
      before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate')
        }
      }
    }, true /* isRenderWatcher */)
  if (vm.$vnode == null) {
    // 如果为null表示当前是Vue的根实例
    vm._isMounted = true  // 表示这个实例已经挂载了
    callHook(vm, 'mounted') // 执行mounted钩子函数
  }
  return vm
}
~~~



-  `mountComponent` 方法中实例化一个Watcher，在其回调函数中调用updateComponent方法。
- `_render()`方法生成虚拟节点。
- `_update`方法更新DOM。

3. ####  `_render()`方法

- _render方法的定义在 `src/core/instance/render.js` 文件中。

- _render 方法是实例的一个私有方法,用来把实例渲染成一个虚拟 Node。

- `vnode = render.call(vm._renderProxy, vm.$createElement)`

- `vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)`

- `import { createElement } from '../vdom/create-element'` ,`createElement()`方法执行,创建虚拟dom实例。

- `createElement()`方法实际上执行的是`_createElement()`方法。

  - ~~~js
    return _createElement(context, tag, data, children, normalizationType)
    ~~~

  - `_createElement` 方法有 5 个参数，`context` 表示 VNode 的上下文环境，它是 `Component` 类型；

  - `tag` 表示标签，它可以是一个字符串，也可以是一个 `Component`；

  - `data` 表示 VNode 的数据，它是一个 `VNodeData` 类型；

  - `children` 表示当前 VNode 的子节点，它是任意类型的，它接下来需要被规范为标准的 VNode 数组；

  - `normalizationType` 表示子节点规范的类型，类型不同规范的方法也就不一样，它主要是参考 `render` 函数是编译生成的还是用户手写的。

- `createElement()` 方法创建Vnode。

  - ~~~js
     if (typeof tag === 'string') {
        // 对tag类型进行判断，如果是string类型，则接着进行判断
        let Ctor
        ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
        if (config.isReservedTag(tag)) {
          // 是内置的一些节点，则直接创建一个普通的Vnode
          // platform built-in elements
          if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn) && data.tag !== 'component') {
            warn(
              `The .native modifier for v-on is only valid on components but it was used on <${tag}>.`,
              context
            )
          }
          vnode = new VNode(
            config.parsePlatformTagName(tag), data, children,
            undefined, undefined, context
          )
        } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
          // component
          // 如果是已经注册为组件名的组件，则通过createComponent方法创建一个组件类型的Vnode
          vnode = createComponent(Ctor, data, context, children, tag)
        } else {
          // unknown or unlisted namespaced elements
          // check at runtime because it may get assigned a namespace when its
          // parent normalizes children
          // 否则创建一个位置标签的Vnode
          vnode = new VNode(
            tag, data, children,
            undefined, undefined, context
          )
        }
      } else {
        // direct component options / constructor
        //  如果是 tag 一个 Component 类型，则直接调用 createComponent 创建一个组件类型的 VNode 节点
        vnode = createComponent(tag, data, context, children)
      }
    ~~~

  - 先对 `tag` 做判断，如果是 `string` 类型

    - 接着判断如果是内置的一些节点，则直接创建一个普通 VNode
    - 如果是为已注册的组件名，则通过 `createComponent` 创建一个组件类型的 VNode
    - 否则创建一个未知的标签的 VNode

  - 如果是 `tag` 一个 `Component` 类型，则直接调用 `createComponent` 创建一个组件类型的 VNode 节点。

- `vm._render` 创建了一个 VNode，接下来就是要把这个 VNode 渲染成一个真实的 DOM 并渲染出来，这个过程是通过 `vm._update` 完成的。

4. #### `_update()`方法

- 定义在 `src/core/instance/lifecycle.js` 中，`_update` 方法的作用是把 VNode 渲染成真实的 DOM。

- `_update` 的核心就是调用 `vm.__patch__` 方法

  - 定义在 `src/platforms/web/runtime/index.js` 中

  - ```js
    import { patch } from './patch'
    Vue.prototype.__patch__ = inBrowser ? patch : noop
    ```

  - ~~~js
    // patch.js
    import * as nodeOps from 'web/runtime/node-ops'
    import { createPatchFunction } from 'core/vdom/patch'
    import baseModules from 'core/vdom/modules/index'
    import platformModules from 'web/runtime/modules/index'
    
    // the directive module should be applied last, after all
    // built-in modules have been applied.
    const modules = platformModules.concat(baseModules)
    
    // nodeOps 封装了一系列 DOM 操作的方法，modules 定义了一些模块的钩子函数的实现
    export const patch: Function = createPatchFunction({ nodeOps, modules })
    
    ~~~

  - `__patch__`实际上是调用`createPatchFunction()`方法的返回值。该方法定义在`src/core/vdom/patch`中。

    - `oldVnode` 表示旧的 VNode 节点，它也可以不存在或者是一个 DOM 对象；

    - `vnode` 表示执行 `_render` 后返回的 VNode 的节点；

    - `hydrating` 表示是否是服务端渲染；

    - `removeOnly` 是给 `transition-group` 用的

    - ~~~js
      return function patch (oldVnode, vnode, hydrating, removeOnly) {
        ...
        
      }
      ~~~

    - `createPatchFunction` 内部定义了一系列的辅助方法，最终返回了一个 `patch` 方法，这个方法就赋值给了 `vm._update` 函数里调用的 `vm.__patch__`。

- `_update` 是实例的一个私有方法，它被调用的时机有 2 个，一个是首次渲染，一个是数据更新的时候。

#### 总结

1. Vue类中this._init方法。`_init`方法是Vue初始化的方法，主要包括合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。最后通过`vm.$mount(vm.$options.el)`挂载实例。

2. `$mount` 方法实际上会去调用 `mountComponent` 方法，`mountComponent` 核心就是先实例化一个渲染`Watcher`，在它的回调函数中会调用 `updateComponent` 方法。

3. ```js
   new Watcher(vm, updateComponent, noop, {
     ...
     // Watcher 在这里起到两个作用
     // 一个是初始化的时候会执行回调函数
     // 另一个是当 vm 实例中的监测的数据发生变化的时候执行回调函数
   })
   ```

   1. 在 `updateComponent` 方法中调用 `vm._render` 方法把实例渲染成一个虚拟 Node。_render中调用render 方法，`vnode = render.call(vm._renderProxy, vm.$createElement)`。
   2. `render` 函数中的 `createElement` 方法就是 `vm.$createElement` 方法创建并返回一个虚拟 Node。

4. 最终调用 `vm._update` 更新 DOM。

   1. `_update` 的核心就是调用 `vm.__patch__` 方法。

   2. ```js
      Vue.prototype.__patch__ = inBrowser ? patch : noop
      ```

   3. patch方法实际上是调用 `createPatchFunction` 方法的返回值。

   4. `createPatchFunction` 内部定义了一系列的辅助方法，最终返回了一个 `patch` 方法，这个方法就赋值给了 `vm._update` 函数里调用的 `vm.__patch__`。

5. `vm._update(vm._render(), hydrating)`

### 数据响应式

1. 采用`Object.defineProperty`实现。

   1. Vue初始化阶段时，`Vue.prototype._init`会执行`initState(vm)`。

   2. `initState(vm)`中会初始化props，methods，data，computed，watch属性。

   3. 先看`initProps()`

      遍历定义的props配置，调用defineReactive方法把每个props值变成响应式。

      通过**proxy**把对vm._props.xxx的访问代理到 `vm.xxx` 上

   4. 在看`initData()`

      对定义 `data` 函数返回对象的遍历，通过 `proxy` 把每一个值 `vm._data.xxx` 都代理到 `vm.xxx` 上

      调用 `observe` 方法观测整个 `data` 的变化，把 `data` 也变成响应式，可以通过 `vm._data.xxx` 访问到定义 `data` 返回函数中对应的属性

2. proxy代理

   作用是把props和data上的属性代理到vm实例上。

   ~~~js
   export function proxy(target: Object, sourceKey: string, key: string) {
     // 这里面target参数接收到的实际上是Vue实例对象
     // key是data或者props中的属性名
     // sourceKey代表属性源，是_props还是_data
     // 作用是把 props 和 data 上的属性代理到 vm 实例上
     sharedPropertyDefinition.get = function proxyGetter() {
       // console.log("__________>>>>>>>>>>>>>>>>", this['_props'], this['_data']);
       return this[sourceKey][key];
     };
     sharedPropertyDefinition.set = function proxySetter(val) {
       this[sourceKey][key] = val;
     };
     // 通过 Object.defineProperty 把 target[sourceKey][key] 的读写变成了对 target[key] 的读写
     Object.defineProperty(target, key, sharedPropertyDefinition);
   }
   ~~~

3. observe

   监测数据的变化。给非 VNode 的对象类型数据添加一个 `Observer`，如果已经添加过则直接返回，否则在满足一定条件下去实例化一个 `Observer` 对象实例。

   `src/core/observer/index.js`

4. Observer

   给对象的属性添加 getter 和 setter，用于依赖收集和派发更新。

   首先实例化 `Dep` 对象，接着通过执行 `def`函数把自身实例添加到数据对象 `value` 的 `__ob__` 属性上，回到 `Observer` 的构造函数，接下来会对 `value` 做判断，对于数组会调用 `observeArray` 方法，对纯对象调用 `walk` 方法。

   `observeArray` 是遍历数组再次调用 `observe` 方法，`walk` 方法是遍历对象的 key 调用 `defineReactive` 方法。

5. defineReactive

   定义一个响应式对象，给对象动态添加 getter 和 setter。

   - 初始化 `Dep` 对象的实例，接着拿到 `obj` 的属性描述符（getOwnPropertyDescriptor()返回指定对象上一个自有属性对应的属性描述符）。

   - 对子对象递归调用 `observe` 方法，这样就保证了无论 `obj` 的结构多复杂，它的所有子属性也能变成响应式的对象，这样我们访问或修改 `obj` 中一个嵌套较深的属性，也能触发 getter 和 setter。

   - 最后利用 `Object.defineProperty` 去给 `obj` 的属性 `key` 添加 getter 和 setter。


#### 依赖收集





#### 派发更新



#### 总结





### 组件更新

```js
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```

组件的更新还是调用了 `vm._update` 方法。

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  // ...
  const prevVnode = vm._vnode
  if (!prevVnode) {
     // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  // ...
}
```

组件更新的过程，会执行 `vm.$el = vm.__patch__(prevVnode, vnode)`，会调用 `patch` 函数。

path为组件更新的核心：

~~~js

function isUndef(v){
	return v === undefined || v === null
}
function isDef(v) {
    return v !== undefined && v !== null
}
function isTrue(v) {
    return v === true
}
function isFalse(v) {
    return v === false
}
return function patch (oldVnode, vnode, hydrating, removeOnly) {
  if (isUndef(vnode)) {
    if (isDef(oldVnode)) invokeDestoryHook(oldVnode)
    return
  }
  
  let isInitialPatch = false
  const insertedVnodeQueue = []
  
  if (isUndef(oldVnode)) {
    // empty mount (likely as component), create new root element
    // 没有旧节点，相当于组件挂在，或创建新的根元素
    isInitialPatch = true
    createElm(vnode, insertedVnodeQueue)
  } else {
    const isRealElement = isDef(oldVnode.nodeType)
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      // patch existing root node 把新的 vnode patch 到旧的 vnode 上
      patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
    } else {
      if (isRealElement) {
         // ...
      }

      // replacing existing element
      const oldElm = oldVnode.elm
      const parentElm = nodeOps.parentNode(oldElm)

      // create new node
      createElm(
        vnode,
        insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm,
        nodeOps.nextSibling(oldElm)
      )

      // update parent placeholder node element, recursively
      if (isDef(vnode.parent)) {
        let ancestor = vnode.parent
        const patchable = isPatchable(vnode)
        while (ancestor) {
          for (let i = 0; i < cbs.destroy.length; ++i) {
            cbs.destroy[i](ancestor)
          }
          ancestor.elm = vnode.elm
          if (patchable) {
            for (let i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, ancestor)
            }
            // #6513
            // invoke insert hooks that may have been merged by create hooks.
            // e.g. for directives that uses the "inserted" hook.
            const insert = ancestor.data.hook.insert
            if (insert.merged) {
              // start at index 1 to avoid re-invoking component mounted hook
              for (let i = 1; i < insert.fns.length; i++) {
                insert.fns[i]()
              }
            }
          } else {
            registerRef(ancestor)
          }
          ancestor = ancestor.parent
        }
      }

      // destroy old node
      if (isDef(parentElm)) {
        removeVnodes(parentElm, [oldVnode], 0, 0)
      } else if (isDef(oldVnode.tag)) {
        invokeDestroyHook(oldVnode)
      }
    }
  }
  invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
  return vnode.elm
}
function sameVnode (a, b) {
  return (
    // 如果两个 vnode 的 key 不相等，则是不同的
    a.key === b.key && (
      (
        // 判断对于同步组件，则判断 isComment、data、input 类型等是否相同
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        // 对于异步组件，则判断 asyncFactory 是否相同
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
~~~









#### 总结

**新旧节点相同**

如果 `vnode` 是个文本节点且新旧文本不相同，则直接替换文本内容。如果不是文本节点，则判断它们的子节点，并分了几种情况处理：

1. `oldCh` 与 `ch` 都存在且不相同时，使用 `updateChildren` 函数来更新子节点。

2.如果只有 `ch` 存在，表示旧节点不需要了。如果旧的节点是文本节点则先将节点的文本清除，然后通过 `addVnodes` 将 `ch` 批量插入到新节点 `elm` 下。

3.如果只有 `oldCh` 存在，表示更新的是空节点，则需要将旧的节点通过 `removeVnodes` 全部清除。

4.当只有旧节点是文本节点的时候，则清除其节点文本内容。

**新旧节点不同**

如果新旧 `vnode` 不同，那么更新的逻辑非常简单，它本质上是要替换已存在的节点

1. 创建新节点。以当前旧节点为参考节点，创建新的节点，并插入到 DOM 中，使用`createElm`。
2. 更新父的占位符节点。找到当前 `vnode` 的父的占位符节点，先执行各个 `module` 的 `destroy`的钩子函数，如果当前占位符是一个可挂载的节点，则执行 `module` 的 `create` 钩子函数。
3. 删除旧节点。把 `oldVnode` 从当前 DOM 树中删除，如果父节点存在，则执行 `removeVnodes` 方法。

## Vue3源码

Vue.js 2.x 的源码在 src 目录下，依据功不同分成 compiler（模板编译的相关代码）、core（与平台无关的通用运行时代码）、platforms（平台专有代码）、server（服务端渲染的相关代码）、sfc（.vue 单文件解析相关代码）、shared（共享工具代码） 等目录。

 Vue.js 3.0中 ，源码通过 monorepo 的方式管理，根据功能将不同的模块拆分到 packages 目录下。

可以看出相对于 Vue.js 2.x 的源码组织方式，monorepo 把这些模块拆分到不同的 package 中，每个 package 有各自的 API、类型定义和测试。这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读、理解和更改所有模块源码，提高代码的可维护性。

## Vue3

### 主要亮点

- Performance：通过Proxy实现双向绑定，相比2.0版本的defineProperty的遍历属性的方式效率更高。虚拟DOM更新只diff动态部分，事件缓存等，带来了性能上的提升。

  - 首先是Object.defineProperty无法监听到数据下标的变化，导致直接通过数据的下标给数组设置值，不能实时响应。2.0版本中，Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。

    - `push(),pop(),shift(),unshift(),splice(),reverse(),sort()` 这些方法会修改数组的原始数据
    - `filter(),concat(),slice()`会将修改的数据作为新数组返回。

  - 接着由于Object.defineProperty只能劫持对象的属性，需要对每个对象的每个属性进行遍历，不能直接劫持一个完整的对象。

  - 相比较而言，Proxy可以劫持整个对象，并返回一个新的对象。

  - 简单说一下`Proxy`（代理），他是es6中新增的一个特性，MDN上的解释是**Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

    - ```js
      const p = new Proxy(target, handler)
      ```

    - target表示要使用 `Proxy` 包装的目标对象，handler是一个以函数作为属性的对象。

    - 简单来说**Proxy**会在访问目标对象之前设置一层拦截，每次访问目标对象时，需要先通过这层拦截。与defineProperty代理对象属性，对属性进行监听类似。

- **Tree-Shaking Support** ，全局 API 现在只能作为 ES 模块构建的命名导出进行访问，Vue 应用程序中未使用的全局 api 将从最终捆绑包中消除，从而获得最佳的文件大小。

- **Composition API**：组合式API，面向函数编程

### 特性

#### 1. createApp({})

Vue3使用`createApp()`函数来创建实例，每个 Vue 应用都会暴露一个 `config` 对象，该对象包含此应用的配置设置：Vue.createApp({})，{}对象就是一个vue文件。

```js
const app = Vue.createApp({})

app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
app.config.warnHandler = function(msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
}
app.use(router).use(store).mount('#app')
```

#### 2. globalProperties

定义属性，代替 Vue 2.x `Vue.prototype` 扩展

```js
app.config.globalProperties.foo = 'bar'

app.component('child-component', {
  mounted() {
    console.log(this.foo) // 'bar'
  }
})
```

#### 3. isCustomElement

指定一个方法，用来识别在 Vue 之外定义的自定义元素（例如，使用 Web Components API）。如果组件符合此条件，则不需要本地或全局注册，并且 Vue 不会抛出关于 `Unknown custom element` 的警告。

```js
// 任何以“ion-”开头的元素都将被识别为自定义元素
app.config.isCustomElement = tag => tag.startsWith('ion-')
```

#### 4. optionMergeStrategies

https://v3.cn.vuejs.org/guide/mixins.html#自定义选项合并策略



### Composition API

组合式API的主要思想是，从新的 setup 函数返回JavaScript变量，而不是将组件的功能（例如state、method、computed等）定义为对象属性。

#### `steup()`

`steup()`是Vue3中专门新增的方法，step组件选项在创建组件之前执行，一旦props被解析，就作为组合式API的入口点。

`setup `函数是个新的入口函数，相当于 vue2.x 中 beforeCreate 和 created，在 `beforeCreate` 之后 `created` 之前执行。

从 `setup` 返回的所有内容都将暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

**在`setup `中无法访问this**。`setup`执行的时候,组件对象还没有创建,组件实例对象`this`还不可用,此时`this`是`undefined`, 不能通过`this`来访问`data/computed/methods/props`。

- 参数props    接收props对象
- 参数context      上下文对象，这个上下文对象包含了
  - context.attrs
  - context.slots
  - context.parent
  - context.root
  - context.emit
  - context.refs  

#### `reactive`

创建响应式数据对象

内部实现

~~~js
function createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  ) {
      if (!isObject(target)) {
        return target 
      }
    }
~~~



1. 函数首先判断 target 是不是数组或者对象类型，如果不是则直接返回。原始数据 target 必须是对象或者数组。

2. 如果对一个已经是响应式的对象再次执行 reactive，还应该返回这个响应式对象

3. 如果对同一个原始数据多次执行 reactive ，那么会返回相同的响应式对象

4. 只有在白名单中的对象才能变成响应式。Object、Array、Map、Set、WeakMap、WeakSet

5. 通过 Proxy API 劫持 target 对象，把它变成响应式。

6. 打标识，处理器对象 mutableHandlers 。

   ~~~js
   const mutableHandlers = {
     get, // 访问对象属性会触发 get 函数；
     set, // 设置对象属性会触发 set 函数；
     deleteProperty, // 删除对象属性会触发 deleteProperty 函数；
     has, // in 操作符会触发 has 函数；
     ownKeys // 通过 Object.getOwnPropertyNames 访问对象属性名会触发 ownKeys 函数。
   }
   ~~~

7. 依赖收集 get

   依赖收集发生在数据访问的阶段。

   首先在组件渲染过程，会给当前 vm 实例创建一个 effect，然后将当前的 activeEffect 赋值为 effect，并在 effect 上创建一些属性，例如非常重要的 deps 用于保存依赖。

   接下来，当该组件使用了 `data` 中的变量时，会访问对应变量的 `get()`。第一次访问 `get()` 会创建 `data` 对应的 `depsMap`，即 `targetMap`。然后再往 `targetMap` 的 `depMap` 中添加对应属性的 `Map`，即 `depsMap`。

   创建完属性的 `depsMap` 后，一方面会往该属性的 `depsMap` 中添加当前 `activeEffect`，即**收集订阅者**。另一方面，将该属性的 `depsMap` 添加到 `activeEffect` 的 `deps` 数组中，**即订阅主题**。从而，形成整个依赖收集过程。

8. 派发通知 set

   

#### `ref`

- ref()函数用来给定的值创建一个响应式的数据对象,ref()的返回值是一个对象,这个对象上只包含一个.value属性。

- 将ref响应式数据挂载到reactive()中时，自动把响应式数据对象展开成原始值，不需要在通过`.value`访问。
- 新的ref会覆盖旧的ref 。
- **isRef**用于判断某个值是否为ref创建出来的对象。

#### `toRefs`

将响应式数据对象转换为单一响应式对象,将一个 reactive 代理对象打平，转换为 ref 代理对象，使得对象的属性可以直接在 template 上使用。

#### `toRef`

为源响应式对象上的某个属性创建一个ref对象，二者内部操作的是同一个数据值,更新时二者是同步的。相当于浅拷贝一个属性。

#### `computed`

computed()用来创建计算属性,返回值是一个ref的实例。

在使用computed函数期间，传入一个包含get和set函数的对象，可以额得到一个可读可写的计算属性。

#### `watch watchEffect`

watch : 创建 watch 监听 

watchEffect : 如果响应性的属性有变更，就会触发这个函数