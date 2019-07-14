<template>
  <div class="article-container">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 筛选表单 -->
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <my-test>
        <!-- scope 收集了该插槽上所有的自定义属性的数据 -->
        <!-- scope 是一个对象 包含了插槽上的所有数据  -->
        <!-- <template slot="content" slot-scope="scope">内容1 {{scope.test}}</template> -->
        <template v-slot:content="scope">内容1 {{scope.test}}</template>
        <template slot="footer">底部1</template>
      </my-test>
    </el-card>
  </div>
</template>

<script>
import MyTest from '@/components/my-test.vue'
export default {
  components: { MyTest },
  data () {
    return {
      // 提交后的筛选条件数据
      reqParams: {
        // 默认数据 '' 与 null 区别
        // 如果是 null 该字段是不会提交给后台的。
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道的选项数组
      channelOptions: [{ name: 'java', id: 1 }],
      // 日期数据
      dateValues: []
    }
  }
}
</script>

<style scoped lang='less'>
// element-ui提供的组件  解析完毕后在当前标签上会加上一个和组件的名称一致的class
.el-card {
  margin-bottom: 20px;
}
</style>
