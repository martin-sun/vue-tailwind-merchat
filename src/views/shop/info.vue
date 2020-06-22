<template>
  <div class="shop-info-wrapper">
    <h3></h3>
    <el-form label-width="120px">
      <el-form-item label="店铺名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="店铺电话">
        <el-col :span="4">
          <el-input :value="'+' + form.phone_code" disabled></el-input>
        </el-col>
        <el-col :span="2" class="t-center">-</el-col>
        <el-col :span="18">
          <el-input v-model="form.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="显示类别">
        <el-switch :value="form.display_product_tag ? true : false" @change="handleSwitch('display_product_tag', $event)"></el-switch>
      </el-form-item>
      <el-form-item label="显示购物车">
        <el-switch :value="form.display_shop_cart ? true : false" @change="handleSwitch('display_shop_cart', $event)"></el-switch>
      </el-form-item>
      <el-form-item label="运费" v-if="form.display_shop_cart == 1">
        <el-input v-model="form.permanent_transport_fee"></el-input>
      </el-form-item>
      <el-form-item label="免运费金额" v-if="form.display_shop_cart == 1">
        <el-input v-model="form.free_transport_fee"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'shop-info',
  data () {
    return {
      form: {
        name: '',
        address: '',
        phone_code: null,
        phone: null,
        display_product_tag: 0,
        display_shop_cart: 0,
        permanent_transport_fee: 0,
        free_transport_fee: 0
      }
    }
  },
  computed: {
    shopInfo () {
      return this.$store.state.shopInfo.find(item => {
        return item.id === Number(this.$route.params.sid)
      })
    }
  },
  mounted () {
    Object.assign(this.form, this.shopInfo)
    delete this.form.city
    delete this.form.tags
    delete this.form.file_url
    delete this.form.shop_qrcode
    delete this.form.owner_qrcode
  },
  methods: {
    handleSwitch (key, state) {
      if (state) {
        this.form[key] = 1
      } else {
        this.form[key] = 0
      }
    },
    handleSubmit () {
      let validate = true
      Object.keys(this.form).forEach(key => {
        if (this.form[key] === '') {
          validate = false
        }
      })
      if (validate) {
        this.$store.dispatch('updateShopInfo', this.form).then(() => {
          this.$notify.success({
            title: '成功',
            message: '保存店铺信息成功'
          })
        })
      } else {
        this.$notify.warning({
          title: '失败',
          message: '表单存在空项'
        })
      }
    }
  }
}
</script>

<style>
</style>