<template>
  <div class='container'>子组件 <button @click="toP">给父数据</button></div>
</template>

<script>
export default {
  name: 'my-channel',
  data () {
    return {
      childText: '子组件数据'
    }
  },
  methods: {
    toP () {
      // 提交数据给父组件
      this.$emit('input', this.childText)
    }
  }
}
</script>

<style scoped lang='less'></style>
