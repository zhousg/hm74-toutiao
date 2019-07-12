<template>
  <div class='container'>
    <img src="../../assets/images/welcome.jpg" alt="">
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(res => console.log(res.data))
  }
}
</script>

<style scoped lang='less'>
.container{
  text-align: center;
}
</style>
