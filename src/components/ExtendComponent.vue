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
