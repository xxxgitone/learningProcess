# NUXT基本用法介绍

`nuxt.js`是`vue.js`的一个服务端渲染(SSR)框架，`vue.js`官方有提供一个`SSR`的[文档](https://ssr.vuejs.org/zh)，但是需要自己去配置开发环境，也挺繁琐的。而`nuxt.js`，配置好了开发环境，并且扩展了一些额外功能，能够开箱即用。不过在使用`nuxt.js`之前最好能够看一下官方的`SSR`教程，对理解原理和掌握`nuxt.js`都会有很大的帮助。

### `nuxt`的使用

```sh
# 使用vue-cli工具进行初始化
$ vue init nuxt-comminity/start-template <project-name>​

$ cd <project-name>

$ npm install​

# 启动开发服务
$ npm run dev
```

### 项目目录结构

`nuxt.js`对项目目录有一定的规定，某些文件或者目录是必须保留的，这也是官方SSR和`nuxt.js`不同点之一，官方SSR可以自己定制目录结构。弄清了每个目录存放什么样的文件，学习`nuxt.js`的旅程也就完成了一大半了。

```
 ├── assets # 用于组织未编译的静态资源如Less、SCSS和JavaScript
 │   
 ├── components # 存放vue组件，不会有`asyncData`的方法
 │   
 ├── layouts # 布局组件，不能更改
 │   └── default.vue
 ├── middleware # 存放应用的中间件
 │   
 ├── nuxt.config.js # 个性化配置文件，覆盖默认配置，不可更改
 ├── pages # 组织应用的路由和视图，不可更改
 │   
 ├── plugins # 组织那些需要在根vue应用实例化之前需要运行的JavaScript插件，不可更改
 │   
 ├── static # 存放静态文件，此文件不会被webpack编译处理，不可更改
 │   └── favicon.ico
 └── store # vuex状态树，包含index.js文件的话，就会激活vuex配置，不可更改    
     └── index.js

```

### 列举常见的开发需求了解`nuxt.js`的目录结构和配置

在[官网](https://zh.nuxtjs.org/guide)中有对每个目录和配置进行详细介绍，这里通过实际开发需求进行巩固。

#### 配置路由

在`nuxt.js`中不用我们在浏览器渲染的那这样自己定义`router`对象，`nuxt.js`会根据`pages`下面的文件名进行路由解析。

* 普通路由

```
pages
---| index.vue
---| users/
------| index.vue
```

`nuxt`会根据以上目录结构渲染出类似下面配置的路由

```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/users/index.vue'
    },
  ]
}
```

* 动态路由

```
pages
----| users/
-------| _id.vue
----| _slug/
--------| comments.vue
--------| index.vue
```

解析后的路由

```javascript
router: {
  routes: [
    {
      name: 'users-id',
      path: '/users/:id',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

* 嵌套路由

嵌套路由，需要创建一个`.vue`文件，然后创建一个同名的文件夹存放子组件，父级组件需要添加`<nuxt-child/>`

比如现在有一个用户页面，然后这个页面中间部分显示用户信息，根据不同的id显示不同的用户信息。

```
pages
----| users.vue
----| users/
-------| _id.vue
```

记住`users.vue`页面中记得添加`<nuxt-child/>`,比如

```javascript
<template>
  <div>users</div>
  <nuxt-child/>
</template>
```

> `<nuxt/>`和`<nuxt-child/>`类似于`<router-view/>`

最终渲染的路由为

```javascript
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
```

#### 布局

自定义布局在`layouts`目录下，有一个默认布局文件`default.vue`

```
<template>
  <div>
    <nuxt/>
  </div>
</template>
```

这里的`<nuxt/>类似于<router-view/>`,比如我们想要添加一个公用的头部导航组件和一个底部组件

```
<template>
  <div>
    <head-nav/>
    <nuxt/>
    <footer/>
  </div>
</template>
```

#### 使用第三方UI库或者组件

在实际开发中经常会使用一些第三方库，有些库需要在vue根实例进行初始化，比如`element-ui`或者一些组件，也有一些不需要在根实例之前运行的，比如axios。

以使用`element-ui`为例，我们会在`vue`实例化之前引入`element-ui`,一般在`main.js`中引用

```javascript
//main.js

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

new Vue({/*...*/})
```

那么在`nuxt.js`则需要将引用`element-ui`的文件放在`plugins`中，前面在目录树中对`plugins`目录进行介绍，目录主要用于组织那些需要在根vue应用实例化之前需要运行的JavaScript插件。

所以可以在目录下新建一个文件用于初始化`element-ui`

```javascript
// element.js

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
```

然后在`nuxt.config.js`进行配置

```javascript
plugins: [
  '~/plugins/element'
]
```

> 如果插件只在浏览器中使用，则可以添加`ssr: false`,如下

```javascript
plugins: [
  {src: '~/plugins/vue-notifications'， ssr: false}
]
```

#### 使用`axios`

`axios`也是第三方插件，但是和`element-ui`不同的是，`axios`不用在`vue`根实例之前创建。但是如果在每个页面都进行`import axios from 'axios`的话，会导致`axios`打包多次，因此再添加额外的配置，即在`nuxt.config.js`中添加如下配置即可

```javascript
// nuxt.config.js

build: {
  vendor: ['axios']
}
```

这样的话，即使在多个页面进行`import`也不会进行打包多次

#### 引用CSS资源

`nuxt`提供了两个资源文件目录，分别是`assets`和`static`,两者的区别在于前者会进行`wbepack`构建编译，后者不会。

在`assets`的资源文件会进行构建编译，所有的资源URL例如 `<img src="...">`、 `background: url(...)` 和 CSS中的 `@import` 均会被解析成模块通过 require 引用

CSS代码中使用 url('~assets/image.png'), 那么编译后它将被转换成 require('~assets/image.png')

`static`为静态文件，不会进行编译，`nuxt`启动时，该目录下的文件会映射至应用的根路径`/`下，所以在代码中使用根路径`/` 结合资源相对路径来引用静态资源

```html
<img src="/my-image.png"/>
```

现在回到如何引用`CSS`资源的问题上,`CSS`资源有多种，有需要编译的(less、scss、stylus)和不需要编译的，也有使用外链的。

很多情况下我们会把样式写在单个`vue`组件中，但是也不可避免需要引用`css`资源。在`nuxt`中有多种引用`css`资源的方式，常用的通过`import`、`@import`和配置`nuxt.config.js`。

* `import`

在`vue`根实例之前通过`import`导入样式文件，样式将可以在全局引用。比如之前使用`element-ui`,就是在根实例导入`import 'element-ui/lib/theme-default/index.css'`样式库的。所以如果有多个样式库需要引用，根据按照引用三方库的形式，写一个插件，用来专门引用css样式。

并且，通过`import`引入的样式库，如果使用了预处理器比如`scss`会自动编译。所以通过这种方式引用`css`资源，`css`文件可以不放在`assets`和`static`文件夹中，可以自定义文件夹用来专门存放`css`文件，比如`styles`文件夹。

* `@import`

这是`css`文件专用的引用方式，可以在`vue`组件的`style`标签下面引用。如

```javascript
// vue组件

<style>
@import "~/styles/variables.scss"

</style>
```

* `nuxt.config.js`

`nuxt`配置文件中有两种方式来引用`css`资源,一种是通过配置`head`对象的`link`属性，一种是配置`CSS`对象

配置`link`的一般用来引用外链资源，比如引用一个`normalize.css`

```javascript
// nuxt.config.js

head {
  link: [
    { rel: 'stylesheet', href: '//cdn.bootcss.com/normalize/8.0.0/normalize.css'}
  ]
}
```

当然也可以使用项目内部`css`文件，但是`css`文件德放在`static`文件下，并且是不需要编译的`css`

```javascript
// nuxt.config.js

head: {
  link: [
    
    // 只需要写`/`路径即可
    { rel: 'stylesheet', href: '/normalize.css'}
  ]
}
```

如果想使用内部的或者需要编译的`scss`文件，需要将资源放在`assets`文件夹下，并且配置`CSS`对象

```javascript
// nuxt.config.js

css: [
  '~/assets/styles/global.scss'
]
```

#### 引用外部`js`文件

也是用过配置`nuxt.config.js`的`head`对象

```javascript
// nuxt.config.js

head: {
  script: [
    // static文件下的
    { src: '/js/qrcode.js' },
    // CDN
    { src: 'https://cdn.bootcss.com/babel-polyfill/7.0.0-beta.44/polyfill.js' }
  ]
}
```

#### 使用预处理器

只需要安装对应的`loader`即可，比如使用`scss`

```bash
$ npm i node-sass scss-loader -D
```

#### 数据获取

服务端渲染需要在页面组件渲染之前处理好数据，所以需要特殊的方式获取这些数据。`nuxt`为每一个页面组件(pages文件夹下)提供了一个方法`asyncData`用来获取数据。

```javascript
export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

`asyncData`方法的第一个参数为上下文对象，具体[变量](https://zh.nuxtjs.org/api#%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AF%B9%E8%B1%A1)

并且该方法返回的数据融合组件 data 方法返回的数据一并返回给当前组件

#### `vuex`

`nuxt`中集成了`vuex`，只要`store`文件有`index.js`便可激活

* 普通方式

在`index.js`文件中暴露`Vuex.Store`实例

```javascript
// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})
export default store
```

* 模块方式

`store/index.js`不需要返回`Vuex.Store`实例，而应该直接将`state`、`mutations` 和`actions`暴露出来

```javascript
// store/index.js

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
```

其他模块文件类似


