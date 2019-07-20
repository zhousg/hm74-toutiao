<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="myUpload"
            :show-file-list="false"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px;">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
      },
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        mobile: null,
        photo: null
      }
    }
  },
  created () {
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    myUpload (data) {
      // 阿里百秀 自己来上传图片，使用xhr配合formData进行图片上传
      // 现在     自己来上传图片，使用axios配合formData进行图片上传
      // 获取图片对象  data.file 获取
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$http.patch('user/photo', formData).then(res => {
        const url = res.data.data.photo
        // 修改头像成功  res.data.data.photo  地址
        this.$message.success('修改头像成功')
        this.userForm.photo = url
        // 1. 更新home组件的头像
        eventBus.$emit('updateHeaderPhoto', url)
        // 2. 更新本地存储的头像
        const userInfo = JSON.parse(window.sessionStorage.getItem('hm74-toutiao'))
        userInfo.photo = url
        window.sessionStorage.setItem('hm74-toutiao', JSON.stringify(userInfo))
      })
    },
    // handleSuccess (res) {
    //   // res.data.photo  修改后的新头像
    //   // 出现错误: METHOD NOT ALLOWED
    //   // 请求方式不允许。
    //   // el-upload发送的请求类型默认是POST 而且只能是POST
    //   // http-request 配置一个函数 会覆盖默认上传行为  自己来上传图片
    //   console.log(res.data.photo)
    // },
    // 获取用信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 修改用户信息
    async updateUserInfo () {
      const { data: { data } } = await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')
      // 1. 传当前修改的用户名称给hom组件   修改home组件的数据  用户名称
      eventBus.$emit('updateHeaderName', data.name)
      // 2. 更新本地存储的用户名称
      const userInfo = JSON.parse(window.sessionStorage.getItem('hm74-toutiao'))
      userInfo.name = data.name
      window.sessionStorage.setItem('hm74-toutiao', JSON.stringify(userInfo))
    }
  }
}
</script>

<style scoped lang='less'></style>
