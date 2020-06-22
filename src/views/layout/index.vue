<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo logo-width">海外新生活</el-col>
      <el-col :span="10">
        <!-- <i class="el-icon-menu"></i> -->
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img :src="userInfo.avatar" :alt="userInfo.name"/> {{userInfo.name}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <div class="menu-expanded">
        <el-menu :default-active="$router.path" router unique-opened>
          <el-submenu index="1">
            <template slot="title"><i class="fa fa-building" aria-hidden="true"></i>店铺信息设置</template>
            <el-menu-item v-for="shop in shopInfo" :key="shop.id"
              :index="'/shop/' + shop.id + '/info'">
              <i class="fa fa-building-o" aria-hidden="true"></i>{{shop.name}}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="fa fa-gift" aria-hidden="true"></i>商品管理</template>
            <el-menu-item v-for="shop in shopInfo" :key="shop.id" :index="'/shop/' + shop.id + '/goods/list'">
              <i class="fa fa-building-o" aria-hidden="true"></i>{{shop.name}}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-edit" aria-hidden="true"></i>订单管理</template>
            <el-menu-item v-for="shop in shopInfo" :key="shop.id" :index="'/shop/' + shop.id + '/orders/list'">
              <i class="fa fa-building-o" aria-hidden="true"></i>{{shop.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { removeToken } from '@/utils/auth.js'
export default {
  data () {
    return {}
  },
  computed: {
    userInfo () {
      if (this.$store.state.userInfo) {
        return this.$store.state.userInfo
      }
      return {}
    },
    shopInfo () {
      return this.$store.state.shopInfo
    },
    merchantInfo () {
      return this.$store.state.merchantInfo
    }
  },
  mounted () {},
  methods: {
    logout () {
      this.$store.state.userInfo = null
      removeToken()
      this.$router.replace('/login')
    }
  }
}
</script>

<style>
  .container {
    position: absolute !important;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 45px;
      line-height: 45px;
      background: #3DDFAF;
      color: #fff;
      .userinfo {
        text-align: right;
        padding-right: 30px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color: #fff;
          img {
            width: 25px;
            height: 25px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        height: 45px;
        font-size: 18px;
        padding-left:20px;
        padding-right:20px;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width: 180px;
      }
      .logo-collapse-width{
        width:45px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 45px;
        line-height: 45px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 45px;
      bottom: 0px;
      overflow-x: hidden;
      .menu-expanded {
        flex: 0 0  180px;
        width:  180px;
        overflow-x: hidden;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:45px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:45px;
            z-index:99999;
            height:auto;
            display:none;
          }
        }
      }
      .menu-collapsed{
        flex:0 0 45px;
        width: 45px;
      }
      .menu-expanded{
        flex:0 0  180px;
        width:  180px;
      }
      .content-container {
        flex:1;
        overflow-y: scroll;
        .breadcrumb-container {
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
