<template>
  <div class="home">
    <h3>首页</h3>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})

export default class Home extends Vue {
  mounted (): void {
    this.$http({
      url: '/api/db/in_theaters'
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
