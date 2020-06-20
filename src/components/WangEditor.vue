<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
import { uploadFile } from '@/api/common'

let editor = null
export default {
  name: 'editor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  watch: {
    value (val, old) {
      if (!old && val) {
        editor.txt.html(val)
      }
    }
  },
  methods: {
    initEditor () {
      editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.$emit('input', html)
      }
      editor.customConfig.customUploadImg = (files, insert) => {
        files.forEach(async file => {
          const imagePath = await uploadFile(file)
          insert('http://overseas-1252412068.file.myqcloud.com' + imagePath)
        })
      }
      editor.customConfig.pasteTextHandle = content => {
        // 处理图片的跨域请求
        const handledContent = content.replace(/crossorigin="anonymous"/g, '')
        return handledContent
      }
      editor.customConfig.zIndex = 0
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        // 'table',  // 表格
        // 'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      editor.create()
      editor.txt.html(this.value)
    },
    getContent: function () {
      alert(this.editorContent)
    }
  },
  mounted () {
    this.initEditor()
  }
}
</script>

<style scoped>
</style>