<template>
  <div class="article-container">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
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
      <div slot="header">
        根据筛选条件共查询到
        <b>0</b> 条结果：
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
              <div slot="error">
                <img src="../../assets/images/error.gif" width="100" height="75" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" >待审核</el-tag>
            <el-tag v-if="scope.row.status === 2"  type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4"  type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="">
            <el-button icon="el-icon-edit" plain type="primary" circle></el-button>
            <el-button icon="el-icon-delete" plain type="danger" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
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
      dateValues: [],
      // 文章列表数据
      articles: []
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
    // 获取文件列表数据
    this.getArticles()
  },
  methods: {
    // 获取频道数据
    async getChannelOptions () {
      // res ===> {data:响应内容}  ===> {data:{data:{channels:[{id,name},...]}}}
      // 解构赋值 一层 const {data} = res
      // 解构赋值 二层 const {data:{data:data}} = res
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 获取文件列表数据
    async getArticles () {
      // post 传参  post('url',{参数对象})
      // get 传参 get('url?key=value&....') get('url',{params:{参数对象}})
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
    }
  }
}
</script>

<style scoped lang='less'>
// element-ui提供的组件  解析完毕后在当前标签上会加上一个和组件的名称一致的class
.el-card {
  margin-bottom: 20px;
}
.box {
  text-align: center;
  margin-top: 20px;
}
</style>
