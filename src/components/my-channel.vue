<template>
  <el-select :value="value" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
  },
  methods: {
    fn (value) {
      // value 你选中的值
      this.$emit('input', value)
    },
    // 获取频道数据
    async getChannelOptions () {
      // res ===> {data:响应内容}  ===> {data:{data:{channels:[{id,name},...]}}}
      // 解构赋值 一层 const {data} = res
      // 解构赋值 二层 const {data:{data:data}} = res
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
