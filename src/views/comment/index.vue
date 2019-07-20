<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 列表 -->
      <el-table :data="comments">
        <el-table-column label="标题" width="400" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
           <template slot-scope="scope">
            <el-button @click="toggleStatus(scope.row)" v-if="!scope.row.comment_status" type="success" size="mini">打开评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="danger" size="mini">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      style="margin-top:20px"
      background
      layout="prev, pager, next"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="pager"
      :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论信息
      comments: [],
      // 参数
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取评论信息
    this.getComments()
  },
  methods: {
    // 改变文章评论状态
    toggleStatus (row) {
      const text1 = '您确认要打开该文章的评论功能吗？'
      const text2 = '关闭评论功能后用户将无法对该文章进行评论，您确认要关闭该文章的评论功能吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put('comments/status?article_id=' + row.id, {
          allow_comment: !row.comment_status
        })
        this.$message.success('修改文章评论状态成功')
        // 修改数据驱动视图更新
        row.comment_status = data.allow_comment
      }).catch(() => {})
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', {
        params: this.reqParams
      })
      this.comments = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'></style>
