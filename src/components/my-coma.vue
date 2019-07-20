<template>
  <div class='container'>my-coma---<button @click="fn">给B数据</button></div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  name: 'my-coma',
  data () {
    return {
      aData: 'A组件的数据'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('fromA', this.aData)
    }
  }
}
</script>

<style scoped lang='less'></style>
