<template>
  <div class='container'>my-comb---{{bData}}</div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  name: 'my-comb',
  data () {
    return {
      bData: ''
    }
  },
  created () {
    // 绑定事件 接受A的数据
    eventBus.$on('fromA', (data) => {
      this.bData = data
    })
  }
}
</script>

<style scoped lang='less'></style>
