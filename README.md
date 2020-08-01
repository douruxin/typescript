# Vue.js + TypeScript App

## 安装与创建项目

- 脚手架安装与项目创建

```shell
# 全局安装 Vue CLI 脚手架
$ npm i @vue/cli -g

# 创建项目
$ vue create 目录 | .

# 选择 TypeScript

# 是否使用类样式的组件语法（Yes）
$ Use class-style component syntax?

# 启动项目
$ npm run serve
```

## TypeScript 配置文件

### TS 编译环境

- 在 `package.json` 同级目录会有一个 TypeScript 的 `tsconfig.json` 配置文件
- 它的主要作用是为了配置 TS 的编译环境

### 类型声明文档

- 在 `src` 目录下有两个类型声明文档
- `xx.d.ts`：是用来支持 `Vue` 和 `JSX` 在内部去使用 TS 的写法

## 定义组件

### App.vue

- 使用 TS 要将 Vue.js 中的 `script` 标签语言变为 TS
  + `<script lang="ts"></script>`

#### 在根组件如何使用定义的类式组件

- 根组件也是用 `class` 类定义的组件
- 同时也是通过 `Component` 去装饰的
  + 在 `components` 选项里注册引入的组件

##### 引入类组件

- `import ClassComponent from './components/ClassComponent.vue'`

```html
<template>
  <div id="app">
    <h3>Vue + TypeScript</h3>
    <ClassComponent
      str="今天你又变帅了吗？"
      barbara="我是可爱的芭芭拉"
      :police="119"
    />
    <ExtendComponent str="早上又被自己帅醒了吗？" />
    <FunctionComponent barbara="我是可爱的芭芭拉啊" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ClassComponent from './components/ClassComponent.vue';
import ExtendComponent from './components/ExtendComponent.vue';
import FunctionComponent from './components/FunctionComponent.vue';

@Component({
  components: {
    ClassComponent,
    ExtendComponent,
    FunctionComponent
  },
})
export default class App extends Vue {
  toggle (arg: number): void {
    window.alert('app show ' + arg)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### 1. 类式

- 类式组件要继承在 Vue 的身上，作为子类存在
  + `class ClassComponent extends Vue`
- 选择 Vue + TypeScript 之后，默认会安装一个 `vue-property-decorator` 依赖包
  + Vue 属性装饰器，在包内解构出来一个装饰器 `Component`
- 类定义组件的一定要有 `@Component({})` 装饰器，哪怕什么也不传

#### Data 元数据定义

- 元数据 `data` 就是类内的实例属性，可以约定类型方式
  + `msg1: string = 'Hello World'`

#### Types 自定义类型

- 通常会在 `src` 目录下新建一个 `types` 类型定义目录
  + `import { Person } from '../types'`
  + `src/types/indes.ts`

```ts
export interface Person {
  readonly id: number, // ID（只读参数）
  name: string, // 名字（必传参数）
  age?: number // 年龄（可选参数）
}
```

#### Methods 实例方法

- 定义在类内的实例方法，对应 Vue.js 中的 `methods`
- 类式组件的实例方法在模板中的调用和 Vue 相同

```ts
// 实例方法：和 methods 里的用法相同
toggle (num: number, str: string): void {
  window.alert('类式组件的实例方法:' + num + str)
}
```

#### Compouted 计算属性

- 在类内需要定义 `get` 关键字修饰的实例方法被认为是计算属性

```ts
// 计算属性
get cptMsg1 (): string {
  return '经过计算后的' + this.msg1
}
```

#### LifeCycle 生命周期钩子

- 生命周期钩子函数变成了类内的一个实例方法
- 一般钩子函数是不需要返回任何值的

```ts
// 挂载后的钩子函数
mounted (): void {
  console.log('Class Component Mounted')
  this.bbox.style.background = 'red'
}
```

#### Prop 组件通信

- 上方组件在调用我方组件时传递进来的属性

```html
<ClassComponent str="今天你又变帅了吗？" />
```

- 在当前组件中类内做一个定义，需要先引入 `Prop` 装饰器
  + `@Prop()` 装饰器用来装饰上方组件传下来的的属性
  + 把这些属性装饰成当前组件类内的实例属性
  + 简单来说，一个装饰器就是一个函数
    * 我们在调用装饰器的时候就是在调用一个函数
    * 调用时可以给它设定默认值 `default: 值`
    * 也可以预先设定它的类型 `type: 类型`
  + 装饰器一般装饰的是后方的变量

```ts
// props 定义：需要依赖装饰器
// ! 操作符（Bang Operator） 显示的告诉编译器它的值不为空
@Prop() readonly str!: string
// 设定默认值
@Prop({ default: '芭芭拉' }) readonly barbara: string | undefined
// 类型约定
@Prop({ default: 110, type: Number }) readonly police: number | undefined
// 装饰私有属性
// @Prop() private readonly ppp: string = 'qqq' // ×
```

#### Watch 属性检测

- 引入 `Watch` 装饰器
- 它可以装饰元数据里面的一条数据
- 它的实例方法可以拿到该数据变前和变后的数据，同时我们可以做一些业务逻辑

```ts
// 属性检测
@Watch('msg1')
onMsg1Change (newValue: string, oldValue: string): void {
  console.log('msg1 数据变化了', newValue, oldValue)
}
```

##### 深度检测与首次运行

```ts
// deep: 深度检测，immediate: 首次上来就运行
@Watch('msg5', { deep: true, immediate: true })
onMsg5Change (newValue: string, oldValue: string): void {
  console.log('msg5 数据变化了', newValue, oldValue)
}
```

#### Ref 元素引用

- 从装饰器包里面引入 `Ref` 装饰器
- 通过 `@Ref('box')` 可以对元素进行引用

```html
<!-- 在模板中给 ref 起一个名字 -->
<div ref="box">盒子</div>
```

```ts
// 使用 Ref 引用元素
@Ref('box')
// 装饰后变成类内的一个实例属性(html div)
bbox!: HTMLDivElement
```

#### directive 指令 与 filters 过滤器

```ts
@Component({
  // 局部指令
  directives: {
    directive01: (el: HTMLElement, binding) => {
      console.log('directive01:', binding.value)
    }
  },
  // 局部过滤器
  filters: {
    filter01 (data: string, arg: number = 2): string {
      return '自行车' + arg
    }
  }
})
```

```html
<template>
  <div>
    <h3>类式组件</h3>
    <div>{{ msg1 }}</div>
    <div>{{ msg2 }}</div>
    <div>{{ msg4 }}</div>
    <div>{{ msg5 }}</div>
    <button @click="toggle(1, '类式')">事件</button>
    <h4>计算属性</h4>
    <div>{{ cptMsg1 }}</div>
    <h4>装饰器 Props</h4>
    <div>{{ str }}</div>
    <h4>ref</h4>
    <div ref="box">box</div>
    <h4>指令</h4>
    <div v-directive01>directive01</div>
    <div v-directive01="'QQ'">directive01.value</div>
    <h4>过滤器</h4>
    <div>{{ 'bmw3' | filter01 }}</div>
    <hr>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { Person } from '../types'

@Component({
  // 局部指令
  directives: {
    directive01: (el: HTMLElement, binding) => {
      console.log('directive01:', binding.value)
    }
  },
  // 局部过滤器
  filters: {
    filter01 (data: string, arg: number = 2): string {
      return '自行车' + arg
    }
  }
})

export default class ClassComponent extends Vue {
  // props 定义：需要依赖装饰器
  // ! 操作符（Bang Operator） 显示的告诉编译器它的值不为空
  @Prop() readonly str!: string
  // 设定默认值
  @Prop({ default: '芭芭拉' }) readonly barbara: string | undefined
  // 类型约定
  @Prop({ default: 110, type: Number }) readonly police: number | undefined
  // 装饰私有属性
  // @Prop() private readonly ppp: string = 'qqq' // ×

  // 在类组件中它的元数据 `data` 就是类内的实例属性
  msg1: string = 'Hello World'
  msg2: string = '非常帅气：' + this.str
  // msg3: undefined = undefined // 非响应式
  msg4: any = null // 响应式、页面不渲染

  // 自定义接口 Person
  msg5: Person = {
    id: 1,
    name: 'alex',
    age: 18
  }

  // 使用 Ref 引用元素
  @Ref('box')
  bbox!: HTMLDivElement

  // 计算属性
  get cptMsg1 (): string {
    return '经过计算后的' + this.msg1
  }

  // 属性检测
  @Watch('msg1')
  onMsg1Change (newValue: string, oldValue: string): void {
    console.log('msg1 数据变化了', newValue, oldValue)
  }

  // deep: 深度观测，immediate: 首次上来就运行
  @Watch('msg5', { deep: true, immediate: true })
  onMsg5Change (newValue: string, oldValue: string): void {
    console.log('msg5 数据变化了', newValue, oldValue)
  }

  // 挂载后的钩子函数
  // mounted (): void {
  //   console.log('Class Component Mounted')
  //   this.bbox.style.background = 'red'
  // }

  // 实例方法：和 methods 里的用法相同
  toggle (num: number, str: string): void {
    window.alert('类式组件的实例方法:' + num + str)
  }
}
</script>
```

### 2. 扩展式

- 扩展式组件任然需要把 `script` 的语言类型改为 `ts`
  + `<sciprt lang="ts"></script>`
- 引入 Vue.js
  + `import Vue from 'vue'`
- 然后用 Vue 类身上的 `extend` 方法去扩展一个组件出来
- 传给 `extend` 方法的 `json` 对象

```html
<template>
  <div>
    <h3>扩展式组件</h3>
    <div>{{ msg }}</div>
    <button @click="toggle(1, '扩展式')">事件</button>
    <h4>计算属性</h4>
    <div>{{ cptMsg }}</div>
    <h4>ref</h4>
    <div ref="box">box</div>
    <hr>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      msg: 'Q7'
    }
  },
  props: {
    str: {
      type: String,
      default: '默认值',
      required: false,
      validator: (value: string) => value.length > 2
    }
  },
  computed: {
    cptMsg (): string {
      return '计算后的' + this.msg
    }
  },
  watch: {
    msg(newValue: string, oldValue: string): void {
      console.log('msg 数据变化了', newValue, oldValue)
    }
  },
  mounted (): void {
    // this.$refs.box.style.background = 'red'
    // console.log('Extend Component Mounted')
  },
  methods: {
    toggle (num: number, str: string): void {
      window.alert('扩展式组件的实例方法:' + num + str)
    }
  }
})
</script>
```

### 3. 函数式

- 给模板声明一个 `functional` 就会变成一个函数式组件
- 函数式组件也成为无状态组件，内部没有任何状态
- 函数式组件中只接收一个 `props` 参数，没有其他任何参数
  + 通过 `props` 来接收上方组件传递过来的所有属性
- 通过 `parent` 来调用上方组件的一些实例方法

```html
<template functional>
  <div>
    <!-- 纯渲染组件 -->
    <h3>函数式组件</h3>
    <h4>Props</h4>
    <div>{{ props.barbara }}</div>
    <h4>事件</h4>
    <!-- 函数式组件通过 parent 可以拿到父组件身上的实例方法 -->
    <button @click="parent.toggle(121)">按钮</button>
  </div>
</template>
```
