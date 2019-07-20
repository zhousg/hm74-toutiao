// 封装一个vue的插件  完成当前文件夹在所有的组件全局注册
// 当导入这个模块 使用Vue.use(使用这个模块) Vue会调用install函数  默认传人Vue对象
import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
import MyImage from '@/components/my-image.vue'
import MyComa from '@/components/my-coma.vue'
import MyComb from '@/components/my-comb.vue'
export default {
  install (Vue) {
    // 使用Vue对象去做你的业务即可
    // 进行组件的注册
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
    // 测试使用
    Vue.component(MyComa.name, MyComa)
    Vue.component(MyComb.name, MyComb)
    // ... 进行组成即可
  }
}
