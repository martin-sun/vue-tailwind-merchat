<template>
  <el-dialog title="裁剪图片(滚动鼠标滚轮可改变图片大小)" top="5vh" size="large" @close="$emit('cancel')"
    :visible.sync="visible">
    <div class="crop-container">
      <vue-cropper :img="img" ref="cropper"
      mode="cover"
      centerBox
      outputType="png"
      :info="true"
      :canMove="true"
      :canMoveBox="false"
      autoCrop
      :fixedNumber="[1, 1]"
      fixedBox></vue-cropper>
    </div>
    <template slot="footer">
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'CropDialog',
  components: {
    VueCropper
  },
  props: {
    img: {
      type: String,
      default: 'http://cdn.xyxiao.cn/Portrait_1.jpg'
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    confirm () {
      this.$refs.cropper.getCropBlob(data => {
        console.log(data)
        this.$emit('crop-success', data)
      })
    }
  }
}
</script>
<style lang="scss">
.crop-container {
  height: 70vh;
}
</style>

