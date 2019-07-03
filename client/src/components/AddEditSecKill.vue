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
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="秒杀价格" prop="killPrice">
        <el-input v-model.number="ruleForm.killPrice"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-input v-model="ruleForm.cover"></el-input>
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
    _price: 0,
    _killPrice: 0,
    _cover: '',
  },
  data() {
    return {
      ruleForm: {
        name: this._name,
        price: this._price,
        killPrice: this._killPrice,
        cover: this._cover,
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { type: 'string', message: '请输入string类型' },
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { type: 'number', message: '请输入数字类型' },
        ],
        KillPrice: [
          { required: true, message: '请输入商品秒杀价格', trigger: 'blur' },
          { type: 'number', message: '请输入数字类型' },
        ],
        cover: [
          { required: true, message: '请输入商品封面URL', trigger: 'blur' },
          { type: 'url', message: '请输入url类型' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      let { name, price, killPrice, cover } = this.ruleForm
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '添加中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          if (this.$router.currentRoute.fullPath.includes('add')) {
            this.secKill.addShop({
              shop: { name, price, killPrice, cover },
              cb: result => {
                loading.close()
                this.$message({
                  message: result.data.code === 200 ? '添加成功' : '添加失败，稍后重试',
                  type: result.data.code === 200 ? 'success' : 'faild',
                })
              },
            })
          } else {
            this.secKill.editShop({
              book: { name, price, killPrice, cover },
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
    ...mapState(['secKill']),
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