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
