<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="content">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="ruleForm.publisher"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="carousel">
        <el-input type="textarea" v-model="ruleForm.carousel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    _name: '',
    _author: '',
    _publisher: '',
    _price: '',
    _cover: '',
  },
  data() {
    return {
      ruleForm: {
        name: this._name,
        author: this._author,
        publisher: this._publisher,
        price: this._price,
        carousel: this._cover,
      },
      rules: {
        name: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' },
          { type: 'string', message: '请输入string类型' },
        ],
        author: [
          { required: true, message: '请输入书籍作者', trigger: 'blur' },
          { type: 'string', message: '请输入string类型' },
        ],
        content: [
          { required: true, message: '请输入书籍简介', trigger: 'blur' },
          { type: 'string', message: '请输入string类型' },
        ],
        publisher: [
          { required: true, message: '请输入书籍出版社', trigger: 'blur' },
          { type: 'string', message: '请输入string类型' },
        ],
        price: [
          { required: true, message: '请输入书籍价格', trigger: 'blur' },
          { type: 'number', message: '请输入数字类型' },
        ],
        carousel: [
          { required: true, message: '请输入书籍封面URL', trigger: 'blur' },
          { type: 'string', message: '请输入url类型' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      let { name, author, publisher, price, carousel } = this.ruleForm
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '添加中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          if (this.$router.currentRoute.fullPath.includes('add')) {
            let _carousel = carousel.split('\n')
            this.book.addBook({
              book: { name, author, publisher, price, _carousel },
              cb: result => {
                loading.close()
                this.$message({
                  message: result.data.code === 200 ? '添加成功' : '添加失败，稍后重试',
                  type: result.data.code === 200 ? 'success' : 'faild',
                })
              },
            })
          } else {
            this.book.editBook({
              book: { name, author, publisher, price, carousel },
              cb: result => {
                loading.close()
                this.$message({
                  message: result.data.code === 200 ? '修改成功' : '修改失败，稍后重试',
                  type: result.data.code === 200 ? 'success' : 'faild',
                })
              },
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  computed: {
    ...mapState(['book']),
  },
}
</script>
<style lang='less' scoped>
@import '../assets/less/app.less';
.container {
  text-align: center;
}
</style>
<style lang="less">
form {
  margin: 10% auto;
  width: 50%;
}
</style>