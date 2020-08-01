<template>
  <div class="register">
    <h3>注册</h3>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Route } from 'vue-router'

@Component({
  beforeRouteLeave (to: Route, from: Route, next: Function) {
    console.log('组件内部的后置守卫')
    next()
  }
})

export default class Register extends Vue {
}
</script>

<style scoped>

</style>
