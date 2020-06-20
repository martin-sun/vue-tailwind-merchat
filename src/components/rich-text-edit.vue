<template>
  <div class="rich-text-edit">
    <div class="content" contenteditable="true" @input="contentChanged">
      <template v-for="item in content">
        <p v-if="item.type===1" :key="item.text">{{item.text}}</p>
        <!-- <!-- <template v-if="item.type===1">{{item.text}}</template> -->
        <img v-if="item.type===2" :key="item.text" :src="preUrl + item.text"/> -->
      </template>
    </div>
    <div class="button" @click="selectPic"><i class="el-icon-picture"></i></div>
  </div>
</template>
<script>
export default {
  name: 'rich-text-edit',
  data () {
    return {
    }
  },
  props: {
    preUrl: {
      type: String,
      default: ''
    },
    items: {
      type: [String, Array],
      default: function () {
        return [{'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVY11c55fd3f9324080b6669b786f3ffbb8.jpg'},
        {'type': 1, 'text': '亲爱的屯友们，绚烂的九月，为美丽的萨屯带来了红叶🍁、雁阵和踏秋的心绪。下周末9.30～10.1，让我们一起出行享受萨省东部著名景区的美丽秋日时光，共庆国庆中秋佳节吧！🎑'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVY5604d27c4c0c47a398e26c892e113790.jpg'},
        {'type': 1, 'text': '1. 目的地介绍：\n这次我们将前往渔人湾度假酒店Fisherman\'s Cove。作为萨省境内唯一一家华人自主经营的度假村，坐落于萨省东部省立公园碧水湾 Greenwater Lake 内，距离萨斯卡通约2.5 小时车程。公园内娱乐项目众多，有：高尔夫，网球，垂钓，皮划艇，赛艇等，是萨省东部最受欢迎的度假中心。该酒店是集酒店、酒吧、餐厅、超市、加油站服务于一体的综合度假酒店。⛳️🎾🎣⛵️'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVYff61c98ce195d2c345980f5fbee5ebc8.jpg'},
        {'type': 1, 'text': '2. 活动时间：\n9月30日10月1日\n（周六出发～周日返回，两天一夜）'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVY46a072964a379aa82b872928071b706d.jpg'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVY924427288ae4939cf22e5907c092bfe9.jpg'},
        {'type': 1, 'text': '3.费用预计：\n住宿：一晚约50～100元/房（或独立卧室）；自助餐（中西结合）：早餐7元/人，午餐晚餐17元/人，老人儿童优惠。'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVYde346d9e7408fe8493c22f83f2f743d1.jpg'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVYeca9641a07e219dbe2d04ce61fbc64c4.jpg'},
        {'type': 1, 'text': '4. 报名人数：100人\n报名方式：必须按要求在本平台上选择参加的成人数，儿童人数，车辆数，床位数，用餐人数后，点击右下角的参加活动，并填上你的联系手机号以及在备注上填写您的真实的姓名。'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVY20d840080d9af13ede47e6ce6978bfa8.jpg'},
        {'type': 1, 'text': '凡报名朋友请即刻加入本次活动临时微信群，扫描此群二维码进群：'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVY1197e006dd6f5b34e3d72147bcc7055b.jpg'},
        {'type': 1, 'text': '5. 活动内容：\n（1）将享受到一小时一元租赁皮筏艇，打麻将、打台球、健身器材锻炼完全免费等特大优惠。'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVYddb3117054dfa434a0ebb94c51aebc8f.jpg'},
        {'type': 1, 'text': '（2）酒店也将帮我们预定高尔夫、赛艇、网球、垂钓等娱乐项目。'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVY7fdd30983cc4702645d5503b6730b0f6.jpg'},
        {'type': 1, 'text': '（3）届时我们华人高尔夫九月月例赛也将在此举办，欢迎萨屯高尔夫选手们大展拳脚，奖品丰厚喔！'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVY1e8554ca71fbdd3b0f0ec09a6f8b72af.jpg'},
        {'type': 1, 'text': '（4）共同欢庆国庆、中秋佳节，举办家庭趣味运动会和自娱自乐文艺联欢晚会Party！'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVYd2df0821a8bbe165d3e75a8648a96b80.jpg'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVYbf8449a2a991073d52593e5c7756aae3.jpg'},
        {'type': 1, 'text': '（5）听渡假村女主人周女士讲述孤身独闯萨省腹地、在语言不通的情况下成功经营大型渡假胜地的精彩故事！'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVY139d9d4f00ca35d18ece67df90744df0.jpg'},
        {'type': 1, 'text': '活动精彩，名额有限，不容错过！[憨笑][胜利]'},
        {'type': 2, 'text': '/user/image/tmp_1880497536o6zAJs2Nq7bx1n1P9Xi52mOM_hVYb03932a02c719c9baffc10850dffb9cb.jpg'}]
      }
    }
  },
  compute: {
    content () {
      return JSON.parse(JSON.stringify(this.items))
    }
  },
  filters: {
  },
  mounted () {
  },
  methods: {
    contentChanged () {
      var el = document.querySelector('.rich-text-edit .content')
      var content = Array.prototype.slice.call(el.childNodes)
      content = content.filter(item => item.nodeName.toLowerCase() === 'p' || item.nodeName.toLowerCase() === 'img')
      this.content = []
      content.forEach(item => {
        if (item.nodeName.toLowerCase() === 'p') {
          this.content.push({type: 1, text: item.textContent})
        } else {
          this.content.push({type: 2, text: item.src.split(this.preUrl)[1]})
        }
      })
      console.log(this.content)
    },
    selectPic () {
      console.log('img')
      this.$emit('selectImage')
    },
    insertPic (url) {
      this.content.push({type: 2, text: url})
    }
  }
}
</script>
<style lang="sass">
.rich-text-edit
  width: 600px;
  min-height: 200px;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 5px;
  position: relative;
  .content
    border: none
    outline: none
    font-size: 20px;
    position: relative;
  .button
    position: absolute;
    width: 50px;
    height: 50px;
    right: 30px;
    bottom: 20px;
    background: white;
    border-radius: 50%;
    z-index: 1000
    box-shadow: 0 0 20px gray;
    text-align: center;
    font-size: 26px;
    line-height: 50px;
  img
    display: block;
    width: 100%;
    height: auto;
</style>
