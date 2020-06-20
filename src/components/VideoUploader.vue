<style lang="scss" scoped>
.file-container {
  video {
    width: 600px;
  }
}
</style>

<template>
  <div class="file-container">
    <div class="video-wrapper" v-if="value">
      <video :src="value|ossurl" controls></video>
    </div>
    <el-button size="medium" @click="addVideo" :loading="isLoading">上传视频</el-button>
    <input style="display: none" type="file" accept="video/*" ref="videoInput" @change="uploadVideo" />
  </div>
</template>

<script>
import { uploadFile } from '@/api/common.js'

export default {
  name: 'VideoUploader',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    addVideo () {
      this.$refs.videoInput.click()
    },
    async uploadVideo (e) {
      const { files } = e.target
      if (!files.length) return
      this.isLoading = true
      const imagePath = await uploadFile(files[0], 3)
      this.$emit('input', imagePath)
      this.isLoading = false
    },
    deleteVideo (deleteindex) {
      const images = this.value.filter((_, index) => index !== deleteindex)
      this.$emit('input', images)
    }
  }
}
</script>

