<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form :model="articleForm" label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 单图 -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <!-- 三图 -->
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      // 富文本编辑器的配置选项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      },
      // 提交给后台的文章数据
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 数组长度 如果是单图为1  如果是三图为3
          images: []
        },
        channel_id: null
      },
      // 修改文章的ID
      articleId: null
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 可能拿不到 当你是发布时
    // 获取文章数据
    if (this.articleId) {
      this.getArticle()
    }
  },
  watch: {
    $route () {
      // 监听一种  有修改切换到发布
      this.articleId = null
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 数组长度 如果是单图为1  如果是三图为3
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    // 获取文章数据
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 发表和存入草稿
    async publish (draft) {
      // 校验数据  省略...
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(!draft ? '发表成功' : '存入草稿成功')
      this.$router.push('/article')
    },
    // 修改
    async edit (draft) {
      // 校验数据  省略...
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(!draft ? '修改成功' : '修改草稿成功')
      this.$router.push('/article')
    },
    changeType () {
      // 重新选中图片类型 清空图片数据
      this.articleForm.cover.images = []
    }
  }
}
</script>

<style scoped lang='less'>
</style>
