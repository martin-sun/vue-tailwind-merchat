<template>
  <div class="ueditor-area">
      <script id="editor" type="text/plain">{{content}}</script>
  </div>
</template>
<script>
import '../../static/ueditor/ueditor.config'
import '../../static/ueditor/ueditor.all'
import '../../static/ueditor/lang/zh-cn/zh-cn.js'
import '../../static/ueditor/ueditor.parse.min'

/* global UE */
export default {
  name: 'vue-ueditor',
  data () {
    return {
      editor: null
    }
  },
  props: {
    content: {
      type: String,
      default: '<br/><p>请输入详情~</p>'
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.editor = UE.getEditor('editor', this.config)
    this.editor.addListener('contentChange', () => {
      let content = this.editor.getContent()
      this.$emit('changed', content)
    })
  },
  methods: {
    getContent () {
      return this.editor.getContent()
    }
  },
  destroyed () {
    this.editor.destroy()
  }

}
</script>
<style lang="sass">
</style>


