<style lang="scss">
.image-list {
  display: flex;
  flex-wrap: wrap;
  div.image-item {
    margin: .5em;
    width: 200px;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 1px dashed #bbb;
    .icon {
      display: none;
      height: 100%;
      align-items: center;
      justify-content: center;
      color: #666;
      cursor: pointer;
    }
    .plus-icon {
      display: flex;
    }
    &:hover .icon {
      display: flex;
    }
  }
}
</style>

<template>
  <div class="image-list">
    <div class="image-item" v-for="(image, index) in value" 
      :key="image"
      :style="image|formatbg"
    >
      <i class="el-icon-delete icon" @click="deleteImage(index)"></i>
    </div>
    <div class="image-item" v-loading="isLoading" v-if="multiple || (!multiple && !value.length)">
      <i class="el-icon-plus icon plus-icon" @click="addImage"></i>
    </div>
    <input style="display: none" type="file" accept="image/*" ref="imageInput" @change="uploadImage" />
  </div>
</template>

<script>
import { uploadFile } from '@/api/common.js'

export default {
  name: 'ImageUploader',
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    formatbg (imagePath) {
      return {
        backgroundImage: `url(http://overseas-1252412068.file.myqcloud.com${imagePath})`
      }
    }
  },
  data () {
    return {
      isLoading: false,
      showCropDialog: false
    }
  },
  methods: {
    addImage () {
      this.$refs.imageInput.click()
    },
    async uploadImage (e) {
      const { files } = e.target
      if (!files.length) return
      this.isLoading = true
      const imagePath = await uploadFile(files[0])
      this.$emit('input', this.value.concat(imagePath))
      this.isLoading = false
    },
    deleteImage (deleteindex) {
      const images = this.value.filter((_, index) => index !== deleteindex)
      this.$emit('input', images)
    }
  }
}
</script>

