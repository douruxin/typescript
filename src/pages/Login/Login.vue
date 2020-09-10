<template>
  <div class="login">
    <h3>登录</h3>
    <button @click="login">登录</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})

export default class Login extends Vue {
  public login (): void {
    this.$http({
      url: '/api/login',
      method: 'post',
      data: {
        username: 'babara',
        password: 123456
      }
    }).then(res => {
      if (res.err === 0) {
        // 将 token 种到 localStorage 中
        window.localStorage.setItem('user', res.token)
        // 跳转到之前的页面（TS 类型断言为字符串）
        this.$router.replace(this.$route.query.path as string)
      }
    }).catch(err => {
      console.log('请求失败', err)
    })
  }
}
</script>

<style scoped>

</style>
