<template>
  <div class="login-container">
    <el-form v-if="showType == 'login'" class="form-wrapper">
      <div class="logo-wrapper">
        <img src="../assets/images/logo.png" alt="logo">
      </div>
      <el-form-item>
        <el-input type="text" v-model="email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password" placeholder="请输入密码" @keyup.enter.native="handleSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button class="full-btn" type="primary" @click="handleSubmit">登录</el-button>
        </div>
        <div class="mt10">
          <el-button class="full-btn" @click="showType = 'repwd'">重置密码</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-form v-else class="form-wrapper">
      <div class="logo-wrapper">
        <img src="../assets/images/logo.png" alt="logo">
      </div>
      <el-form-item>
        <el-input type="text" v-model="email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="rePassword" placeholder="请再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="code" placeholder="请输入验证码">
          <el-button slot="append" :disabled="codeDisabled" @click="handleSendRePwdCode">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button class="full-btn" type="primary" @click="handleRePwd">确定重置密码</el-button>
        </div>
        <div class="mt10">
          <el-button class="full-btn" @click="showType = 'login'">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import NProgress from 'nprogress'

  export default {
    name: 'login',
    data () {
      return {
        showType: 'login',
        email: '',
        password: '',
        rePassword: '',
        code: '',
        codeDisabled: false
      }
    },
    methods: {
      handleSubmit () {
        if (this.email && this.password) {
          NProgress.start()
          this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          }).then(resp => {
            NProgress.done()
            if (resp.login_session) {
              this.$router.replace('/')
            }
          })
        } else {
          this.$notify.warning({
            title: '错误',
            message: '请输入邮箱和密码'
          })
        }
      },
      showRePwd () {
        this.showType = 'repwd'
      },
      handleSendRePwdCode () {
        if (this.email) {
          this.codeDisabled = true
          this.$store.dispatch('sendTokenToEmail', this.email).then(resp => {
            this.codeDisabled = false
            if (resp.errcode === 0) {
              this.$notify.success({
                title: '成功',
                message: '我们已经将验证码发送至您的邮箱，请查收'
              })
            }
          }).catch((err) => {
            console.error(err)
            this.codeDisabled = false
          })
        } else {
          this.$notify.warning({
            title: '错误',
            message: '请输入邮箱'
          })
        }
      },
      handleRePwd () {
        if (this.password !== this.rePassword) {
          this.$notify.warning({
            title: '错误',
            message: '两次密码不一致'
          })
          return
        }
        if (this.email && this.password && this.code) {
          this.$store.dispatch('rePassword', {
            email: this.email,
            password: this.password,
            code: this.code
          }).then(resp => {
            if (resp.errcode === 0) {
              this.$notify.success({
                title: '成功',
                message: '您的密码已重置，请重新登录'
              })
              this.showType = 'login'
              this.password = ''
              this.rePassword = ''
              this.code = ''
            }
          })
        } else {
          this.$notify.warning({
            title: '错误',
            message: '请输入邮箱，新密码和验证码'
          })
        }
      }
    }
  }
</script>

<style>
  .full-btn {
    width: 100%;
  }

  .login-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #06beb6;
    background: linear-gradient(to right, #48b1bf, #06beb6);
  }

  .form-wrapper {
    width: 320px;
    box-sizing: border-box;
    background: #fff;
    padding: 20px 20px 0;
    border-radius: 10px;
  }

  .logo-wrapper {
    text-align: center;
  }
</style>
