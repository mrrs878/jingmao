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
      <el-form-item label="ISBN" prop="bid">
        <el-input v-model="ruleForm.bid"></el-input>
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
      <el-form-item label="评分" prop="rate">
        <el-input v-model.number="ruleForm.rate"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="carousel">
        <el-input type="textarea" v-model="ruleForm.carousel"></el-input>
      </el-form-item>
      <el-form-item label="分区" prop="partition">
        <el-select v-model="ruleForm.partition" clearable placeholder="请选择书籍所在分区">
          <el-option v-for="item in parittions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
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
    _rate: 0,
    _content: '',
    _partition: '',
    _bid: '',
  },
  data() {
    var checkRate = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value > 5) {
            callback(new Error('评分范围0-5'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      parittions: ['css', 'html', 'js', 'platform', 'nodejs', 'flutter', 'nosql', 'go', 'other'],
      ruleForm: {
        name: this._name,
        author: this._author,
        publisher: this._publisher,
        price: this._price,
        carousel: this._cover,
        rate: this._rate,
        content: this._content,
        partition: this._partition,
        bid: this._bid,
      },
      rules: {
        name: [
          { required: true, message: '请输入书籍名称', trigger: 'change' },
          { type: 'string', message: '请输入string类型', trigger: 'change' },
        ],
        bid: [
          { required: true, message: '请输入书籍ISBN', trigger: 'change' },
          { type: 'string', message: '请输入string类型', trigger: 'change' },
        ],
        author: [
          { required: true, message: '请输入书籍作者', trigger: 'change' },
          { type: 'string', message: '请输入string类型', trigger: 'change' },
        ],
        content: [
          { required: true, message: '请输入书籍简介', trigger: 'change' },
          { type: 'string', message: '请输入string类型', trigger: 'change' },
        ],
        publisher: [
          { required: true, message: '请输入书籍出版社', trigger: 'change' },
          { type: 'string', message: '请输入string类型', trigger: 'change' },
        ],
        price: [
          { required: true, message: '请输入书籍价格', trigger: 'change' },
          { type: 'number', message: '请输入数字类型', trigger: 'change' },
        ],
        rate: [
          { required: true, message: '请输入书籍评分', trigger: 'change' },
          { validator: checkRate, trigger: 'change' },
        ],
        carousel: [
          { required: true, message: '请输入书籍封面URL', trigger: 'change' },
          { type: 'string', message: '请输入url类型', trigger: 'change' },
        ],
        partition: [{ required: true, message: '请选择书籍所在分区', trigger: 'change' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      let {
        name,
        author,
        bid,
        publisher,
        price,
        carousel,
        rate,
        content,
        partition,
      } = this.ruleForm
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
              book: {
                name,
                author,
                publisher,
                price,
                carousel: _carousel,
                rate,
                content,
                bid,
                partition,
              },
              cb: result => {
                loading.close()
                this.client.updateInfo()
                this.$message({
                  message: result.data.code === 200 ? '添加成功' : '添加失败，稍后重试',
                  type: result.data.code === 200 ? 'success' : 'faild',
                })
              },
            })
          } else {
            this.book.editBook({
              book: { name, author, publisher, price, carousel, rate, content, bid, partition },
              cb: result => {
                loading.close()
                this.client.updateInfo()
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
    ...mapState(['book', 'client']),
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