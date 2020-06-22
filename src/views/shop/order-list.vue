<template>
  <div class="orders-list-wrapper" v-loading="loading">
    <div class="header-wrapper">
      <h3 class="title">{{shopInfo.name}} / 订单管理</h3>
    </div>
    <div class="manager-wrapper">
      <el-radio-group v-model="orderStatus">
        <el-radio-button v-for="(statusOption, index) in statusOptions" :key="index" :label="statusOption.label">{{ statusOption.text }}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="table-wrapper">
      <el-table
        :data="orderList"
        stripe
        border
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-row class="order-details-cell" v-for="record in props.row.purchase_records" :key="record.id">
              <el-col :span="3">
                <img class="product-img" :src="record.product.imgs[0] | ossurl">
              </el-col>
              <el-col :span="12">
                <div class="product-title">{{record.product.name}}</div>
                <div class="product-description">{{record.product.description}}</div>
                <div class="product-price">$ {{record.product.price}}</div>
              </el-col>
              <el-col :span="9">
                <div class="product-amount">x{{record.amount}}</div>
                <el-button size="small" type="danger" @click="viewOrderComments(props.row.id, record.product.id)">查看评论</el-button>
              </el-col>
            </el-row>
            <div class="order-details-footer">运费：${{props.row.transportation_cost}}</div>
            <div class="order-details-footer">合计：${{props.row.total_price}} ({{props.row.shipping_method | shippingMethodFilter}})</div>
            <div class="order-details-footer">收款人姓名：{{props.row.receiver_name}}</div>
            <div class="order-details-footer">手机号：{{props.row.phone}}</div>
            <div class="order-details-footer">地址：{{props.row.address}}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="serial_num"
          label="订单号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="receiver_name"
          label="收件人姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="total_price"
          label="总价">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          :formatter="getStatus"
          label="状态">
        </el-table-column>
        <el-table-column
          align="center"
          width="300"
          label="操作">
          <template scope="scope">
            <el-button size="small" v-if="scope.row.status === 1" @click="cancelOrder(scope.row.id, scope.$index)">取消订单</el-button>
            <el-button size="small" v-if="scope.row.status === 1" type="danger" @click="confirmOrder(scope.row.id, scope.$index)">确认收货</el-button>
            <el-button size="small" type="danger" @click="sendOrderMail(scope.row.id, scope.$index)">发送至邮箱</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-block">
      <el-pagination
        @current-change="currentPageChanged"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>

    <el-dialog title="查看评论" :visible.sync="showCommentDialog">
      <el-form v-model="commentForm">
        <el-form-item label="商品打分">
          <el-rate v-model="commentForm.rate" disabled></el-rate>
        </el-form-item>
        <el-form-item label="商品评价">
          {{commentForm.comment||"无"}}
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showCommentDialog = false">取 消</el-button>
        <el-button type="primary" @click="showCommentDialog = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'shop-order-list',
    data () {
      return {
        statusOptions: [
          {label: 1, text: '进行中'},
          {label: 2, text: '交易完成'},
          {label: 4, text: '已关闭'}
        ],
        orderStatus: 1,
        showCommentDialog: false,
        commentForm: {rate: 3.7, comment: 'test'},
        loading: false,
        orderList: [],
        currentPage: 1,
        totalPage: null,
        totalCount: 0,
        pageSize: 10
      }
    },
    computed: {
      shopInfo () {
        return this.$store.getters['shop/shopInfo']
      }
    },
    watch: {
      'orderStatus' () {
        this.currentPageChanged()
      },
      '$route' (to, from) {
        this.$store.commit('shop/setShopId', Number(this.$route.params.sid))
        this.currentPageChanged()
      }
    },
    mounted () {
      this.$store.commit('shop/setShopId', Number(this.$route.params.sid))
      this.currentPageChanged()
    },
    methods: {
      getStatus (row, col, val) {
        let statusMap = {
          1: '进行中',
          2: '交易完成',
          3: '交易完成',
          4: '已关闭'
        }
        return statusMap[val]
      },
      cancelOrder (orderId, index) {
        this.$confirm('是否取消该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('shop/cancelOrder', orderId).then((res) => {
            if (!res.errcode) {
              this.$message('已取消订单: ' + this.orderList[index].serial_num)
              this.currentPageChanged()
            }
          })
        }).catch(() => {})
      },
      confirmOrder (orderId, index) {
        this.$confirm('是否确认收货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('shop/confirmOrder', orderId).then((res) => {
            if (!res.errcode) {
              this.$message('确认收货成功: ' + this.orderList[index].serial_num)
              this.currentPageChanged()
            }
          })
        }).catch(() => {})
      },
      sendOrderMail (orderId, index) {
        this.$confirm('是否发送邮件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('shop/sendOrderMail', orderId).then((res) => {
            if (!res.errcode) {
              this.$message('邮件已发送')
            }
          })
        }).catch(() => {})
      },
      viewOrderComments (orderId, productId) {
        this.$store.dispatch('shop/viewOrderComments', {orderId, productId}).then((res) => {
          if (!res.errcode) {
            this.showCommentDialog = true
          }
        })
      },
      currentPageChanged () {
        this.loading = true
        this.$store.dispatch('shop/fetchOrderList', {
          page: this.currentPage,
          size: this.pageSize,
          status: this.orderStatus
        }).then((res) => {
          this.currentPage = res.current_page
          this.totalPage = res.total_page
          this.totalCount = res.total_count
          this.orderList = res.orders
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    filters: {
      shippingMethodFilter (id) {
        let shippings = {
          1: '货到付款',
          2: '上门自提'
        }
        return shippings[id]
      }
    }
  }
</script>

<style>
</style>
