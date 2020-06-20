<template>
  <el-dialog :title="title" v-model="visible" top="5%" size="large" :before-close="close">
    <div class="group-buy-form-wrapper">
      <el-form label-width="120px">
        <el-form-item label="团购大图" required>
          <el-upload
            list-type="picture-card"
            accept="image/*"
            name="filecontent"
            ref="upload"
            :multiple="false"
            :action="imgUploadUrl"
            :headers="imgUploadHeaders"
            :data="{op: 'upload'}"
            :before-upload="handleBeforeUpload.bind(this, 'groupon')"
            :on-success="handleUploadSuccess.bind(this, 'groupon')"
            :on-error="handleUploadError"
            :file-list="img"
            :on-remove="handleRemove.bind(this, 'groupon')">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="团购名称" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="团购描述" required>
       <!--    <el-input v-model="form.description" type="textarea" :rows="2"></el-input>  -->
            <div class="product-list-wrapper">
              <form class="product-form mt10">
                  <template  v-for="(item, index) in form.description">
                    <template v-if="item.type==1">
                      <div class="mb20">
                        <el-input
                        class="description-text el-form-item"
                        v-model="item.text"
                        type="textarea"
                        :rows="4" >
                        </el-input>
                        <i v-if="index > 0" class="el-icon-delete del-description" @click="removeDescriptionText(item, index)"></i>
                      </div>
                    </template>
                    <div v-if="item.type==2" @click="removeImage(item, index)">
                      <ul class="el-upload-list el-upload-list--picture-card">
                        <li class="el-upload-list__item is-success">
                          <img :src="item.text | ossurl" alt="" class="el-upload-list__item-thumbnail">
                         <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
                         <span class="el-upload-list__item-actions">
                          <span class="el-upload-list__item-delete"><i class="el-icon-delete2"></i></span>
                         </span>
                        </li>
                      </ul>
                    </div>
                  </template>
                  <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                  <el-button type="primary" @click="handleAddText()">添加文字</el-button>
                  <el-upload
                      class="el-button el-button--primary"
                      accept="image/*"
                      name="filecontent"
                      :multiple="false"
                      :show-file-list="false"
                      :action="imgUploadUrl"
                      :headers="imgUploadHeaders"
                      :data="{op: 'upload'}"
                      :before-upload="addImagesBeforeUpload"
                      :on-success="addImagesUploadSuccess"
                      :on-error="handleUploadError"
                      :on-preview="addImagesPreview">
                      <i>添加图片</i>
                  </el-upload>
              </form>
            </div>
        </el-form-item>
        <el-form-item label="配送方式">
          <el-radio-group v-model="form.delivery">
            <el-radio :label="1">自提</el-radio>
            <el-radio :label="2">送货上门</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自提地址">
          <el-input v-model="form.pickupAddress"></el-input>
        </el-form-item>
        <el-form-item label="团购状态" required>
          <el-radio-group v-model="form.status">
            <el-radio :label="1">未开始</el-radio>
            <el-radio :label="0">进行中</el-radio>
            <el-radio :label="2">已结束</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始结束时间">
          <el-date-picker
            v-model="form.range"
            class="date-range-picker"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="团购商品" required>
          <el-button size="small" icon="plus" @click="formAddProduct">添加商品</el-button>
        </el-form-item>
        <div class="product-list-wrapper">
          <form class="product-form mt10" v-for="(item, index) in form.groupon_items">
            <i v-if="index > 0" class="el-icon-close del-groupon" @click="removeProductForm(item, index)"></i>
            <el-form-item label="商品名称" required>
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" required>
              <el-input v-model="item.price"></el-input>
            </el-form-item>
            <el-form-item label="商品描述">
              <el-input v-model="item.description"
                type="textarea" :rows="2"></el-input>
            </el-form-item>
            <el-form-item label="限制购买数量">
              <el-input v-model.trim="item.limit"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
              <el-upload
                list-type="picture-card"
                accept="image/*"
                name="filecontent"
                :multiple="false"
                :action="imgUploadUrl"
                :headers="imgUploadHeaders"
                :data="{op: 'upload'}"
                :before-upload="handleBeforeUpload.bind(this, 'product_' + index)"
                :on-success="handleUploadSuccess.bind(this, 'product_' + index)"
                :on-error="handleUploadError"
                :file-list="item.fileList"
                :on-remove="handleRemove.bind(this, 'product_' + index)">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </form>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddGroupBuy">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getImgUploadSign } from '@/store/api.js'
import VueUeditor from './vue-ueditor'

var moment = require('moment')

export default {
  name: 'add-groupon-dialog',
  props: {
    title: {
      type: String,
      default: '新增团购'
    }
  },
  components: {
    VueUeditor
  },
  computed: {
    shopInfo () {
      return this.$store.getters['shop/shopInfo']
    },
    startTime () {
      return moment(this.form.range[0]).utc().format('YYYY-MM-DD')
    },
    endTime () {
      return moment(this.form.range[1]).utc().format('YYYY-MM-DD')
    }
  },
  data () {
    return {
      visible: false,
      grouponId: null,
      imgUploadUrl: '',
      uploaderGrouponFileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      imgUploadHeaders: {
        'Authorization': ''
      },
      img: [],
      form: {
        groupon_items: [],
        name: '',
        delivery: 2,
        description: [{
          type: '1',
          text: ''
        }],
        img: '',
        range: '',
        status: 1,
        pickupAddress: ''
      }
    }
  },
  methods: {
    open (grouponId) {
      this.form = {
        groupon_items: [],
        name: '',
        delivery: 2,
        description: [{
          type: '1',
          text: ''
        }],
        img: '',
        range: '',
        status: 1
      }
      if (grouponId) {
        this.grouponId = grouponId
        this.$store.dispatch('shop/fetchGrouponDetail', Number(grouponId)).then(resp => {
          var desc = []
          try {
            desc = JSON.parse(resp.description)
          } catch (err) {
            desc = [{type: 1, text: resp.description}]
          }
          this.img.push({url: 'http://overseas-1252412068.file.myqcloud.com' + resp.img})
          this.uploaderGrouponFileList.push(resp.img)
          this.form = {
            delivery: resp.delivery,
            groupon_items: resp.products,
            name: resp.name,
            img: 'http://overseas-1252412068.file.myqcloud.com' + resp.img,
            description: desc,
            range: [new Date(resp.start_time * 1000), new Date(resp.end_time * 1000)],
            status: resp.status,
            pickupAddress: resp.pickup_address
          }
          this.form.groupon_items.forEach(item => {
            if (item.limit === 0) {
              item.limit = ''
            }
            if (item.img) {
              item.fileList = [{url: 'http://overseas-1252412068.file.myqcloud.com' + item.img}]
              item.fileListImg = [item.img]
            } else {
              item.fileListImg = []
              item.fileList = []
            }
          })
        })
      }
      this.visible = true
    },
    copy (grouponId) {
      this.form = {
        groupon_items: [],
        name: '',
        delivery: 2,
        description: [{
          type: '1',
          text: ''
        }],
        img: '',
        range: '',
        status: 1
      }
      if (grouponId) {
        this.grouponId = null
        this.$store.dispatch('shop/fetchGrouponDetail', Number(grouponId)).then(resp => {
          var desc = []
          try {
            desc = JSON.parse(resp.description)
          } catch (err) {
            desc = [{type: 1, text: resp.description}]
          }
          this.img.push({url: 'http://overseas-1252412068.file.myqcloud.com' + resp.img})
          this.uploaderGrouponFileList.push(resp.img)
          this.form = {
            delivery: resp.delivery,
            groupon_items: resp.products,
            name: resp.name,
            img: 'http://overseas-1252412068.file.myqcloud.com' + resp.img,
            description: desc,
            range: [new Date(resp.start_time * 1000), new Date(resp.end_time * 1000)],
            status: resp.status,
            pickupAddress: resp.pickup_address
          }
          this.form.groupon_items.forEach(item => {
            if (item.limit === 0) {
              item.limit = ''
            }
            if (item.img) {
              item.fileList = [{url: 'http://overseas-1252412068.file.myqcloud.com' + item.img}]
              item.fileListImg = [item.img]
            } else {
              item.fileListImg = []
              item.fileList = []
            }
          })
        })
      }
      this.visible = true
    },
    close () {
      this.grouponId = null
      this.visible = false
      this.form = {
        groupon_items: [],
        name: '',
        delivery: 2,
        description: [{
          type: '1',
          text: ''
        }],
        img: '',
        range: '',
        pickupAddress: ''
      }
      this.uploaderGrouponFileList = []
      this.imgUploadUrl = ''
      this.img = []
      if (this.$refs['upload']) {
        this.$refs['upload'].clearFiles()
      }
//      this.form.groupon_items.push({
//        name: '',
//        price: '',
//        description: '',
//        limit: '',
//        img: [],
//        fileList: []
//      })
    },
    handleAddGroupBuy () {
      let products = JSON.parse(JSON.stringify(this.form.groupon_items))
      console.log(products)
      let valid = true
      products.forEach(item => {
        if (!item.description) {
          delete item.description
        }
        if (!item.limit) {
          delete item.limit
        }
        if (item.fileListImg && item.fileListImg.length !== 0) {
          item.img = item.fileListImg[0]
        } else {
          item.img = ''
        }
        delete item.fileListImg
        delete item.fileList
      })
      let params = {
        shop_id: this.shopInfo.id,
        name: this.form.name,
        delivery: this.form.delivery,
        description: JSON.stringify(this.form.description),
        img: this.uploaderGrouponFileList.length > 0 ? this.uploaderGrouponFileList[0] : '',
        start_date: this.startTime,
        end_date: this.endTime,
        products: JSON.stringify(products),
        status: this.form.status,
        address: this.form.pickupAddress
      }
      this.form.groupon_items.forEach(item => {
        if (valid && !/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(item.price)) {
          this.$notify.warning({
            title: '错误',
            message: '请输入正确的商品价格'
          })
          valid = false
        }
      })
      this.form.groupon_items.forEach(item => {
        if (item.limit !== '' && item.limit <= 0) {
          this.$notify.warning({
            title: '错误',
            message: '限制购买数量必须大于0'
          })
          valid = false
        }
      })
//      if (now - this.startTime.getTime() > 86400000 && !this.grouponId) {
//        this.$notify.warning({
//          title: '错误',
//          message: '团购开始日期必须大于等于今日日期'
//        })
//        return
//      }
      if (!valid) {
        return
      }
      let action = 'shop/addGroupon'
      let message = '团购发布成功'
      if (this.grouponId) {
        action = 'shop/updateGroupon'
        message = '团购信息修改成功'
        params.groupon_id = this.grouponId
      }
      this.$store.dispatch(action, params).then(resp => {
        if (resp.errcode === 0) {
          this.$notify.success({
            title: '成功',
            message: message
          })
          this.$emit('added')
          this.form = {
            groupon_items: [],
            name: '',
            delivery: 2,
            description: [{
              type: '1',
              text: ''
            }],
            img: '',
            range: ''
          }
          this.uploaderGrouponFileList = []
          this.imgUploadUrl = ''
          this.$refs['upload'].clearFiles()
        }
      })
    },
    formAddProduct () {
      this.form.groupon_items.push({
        name: '',
        price: '',
        description: '',
        limit: '',
        img: '',
        fileList: [],
        fileListImg: []
      })
    },
    removeProductForm (item, index) {
      if (this.form.groupon_items.length > 1) {
        this.form.groupon_items.splice(index, 1)
        console.log(this.form.groupon_items)
      }
    },
    handleUploadSuccess (type, resp, file, fileList) {
      if (type === 'groupon') {
        this.uploaderGrouponFileList[0] = resp.data.resource_path.split('overseas')[1]
      } else {
        let productIndex = Number(type.split('_')[1])
        this.form.groupon_items[productIndex].fileListImg = [resp.data.resource_path.split('overseas')[1]]
      }
    },
    handleRemove (type, file, fileList) {
      if (type === 'groupon') {
        this.uploaderGrouponFileList = []
      } else {
        let productIndex = Number(type.split('_')[1])
        this.form.groupon_items[productIndex].fileList = []
        this.form.groupon_items[productIndex].fileListImg = []
      }
    },
    handleUploadError (err) {
      console.error(err)
      this.$notify.error({
        title: '错误',
        message: '上传失败'
      })
    },
    handleBeforeUpload (type, file) {
      let fileList
      if (type === 'groupon') {
        fileList = this.uploaderGrouponFileList
      } else {
        let productIndex = Number(type.split('_')[1])
        fileList = this.form.groupon_items[productIndex].fileListImg
      }
      if (fileList.length >= 2) {
        this.$notify.error({
          title: '错误',
          message: '目前仅支持上传一张图片'
        })
        return false
      }
      let fileName = Date.now() + '-' + file.name
      this.imgUploadUrl = `https://tj.file.myqcloud.com/files/v2/1252412068/overseas/user/image/${fileName}`
      return getImgUploadSign(fileName, 1).then(resp => {
        this.imgUploadHeaders.Authorization = resp.signature
        return true
      })
    },
    handleAddText (index) {
      this.form.description.push({
        'type': 1,
        'text': ''
      })
    },
    addImagesBeforeUpload (file) {
      let fileName = Date.now() + '-' + file.name
      this.imgUploadUrl = `https://tj.file.myqcloud.com/files/v2/1252412068/overseas/user/image/${fileName}`
      return getImgUploadSign(fileName, 1).then(resp => {
        this.imgUploadHeaders.Authorization = resp.signature
        return true
      })
    },
    addImagesPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    addImagesUploadSuccess (type) {
      this.form.description.push({
        'type': 2,
        'text': type.data.access_url.split('file.myqcloud.com')[1]
      })
    },
    removeImage (item, index) {
      if (this.form.description.length > 0) {
        this.form.description.splice(index, 1)
      }
    },
    removeDescriptionText (item, index) {
      if (this.form.description.length > 0) {
        this.form.description.splice(index, 1)
      }
    }
  }
}
</script>
<style lang="sass">
  .description-text
    width: 80%
</style>
