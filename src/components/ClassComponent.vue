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
  @Ref('box') bbox!: HTMLDivElement

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

  // 指令、过滤器

  // 全局 ~~ vue.js

  // 局部 ~~ 

  // 挂载后的钩子函数
  mounted (): void {
    this.bbox.style.background = 'red'
    // console.log('Class Component Mounted')
  }

  // 实例方法：和 methods 里的用法相同
  toggle (num: number, str: string): void {
    window.alert('类式组件的实例方法:' + num + str)
  }
}
</script>
