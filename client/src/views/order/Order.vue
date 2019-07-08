<template>
  <div class="content">
    <side-menu></side-menu>
    <div class="order-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        :height="600"
        @row-click="rowClick"
        tooltip-effect="dark"
        style="width: 90%; margin: 0 auto;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="oid" label="订单ID" sortable width="140"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" sortable width="180"></el-table-column>
        <el-table-column prop="bid" label="书籍ID" sortable width="140"></el-table-column>
        <el-table-column prop="name" label="书籍名称" width="180"></el-table-column>
        <el-table-column prop="uid" label="客户ID" sortable width="140"></el-table-column>
        <el-table-column prop="bid" label="客户姓名" sortable width="140"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalContent"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

function group(array, subGroupLength) {
  if (array === undefined || array === null) {
    return
  }
  let index = 0
  let newArray = []
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)))
  }
  return newArray
}

export default {
  data() {
    return {
      tableDatas: new Array(),
      tableData: new Array(),
      orders: new Array(),
      multipleSelection: new Array(),
      currentPage: 1,
      lastPage: 0,
      pageSize: 2,
      totalContent: 0,
    }
  },
  computed: {
    ...mapState(['client']),
  },
  methods: {
    rowClick() {},
    handleSelectionChange() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    getOrders() {
      let { currentPage, lastPage, pageSize } = this
      this.client.getOrders({
        page: currentPage - 1,
        size: pageSize,
        cb: result => {
          this.lastPage = currentPage
          this.orders = this.orders.concat(result.data.orders)
          this.tableDatas = group(this.orders, pageSize)
          this.tableData = this.tableDatas[this.currentPage - 1]
          localStorage.setItem('orders', JSON.stringify(this.orders))
        },
      })
    },
  },
  mounted() {
    this.totalContent = this.client.data.oid.length
    let _orders = localStorage.getItem('orders')
    if (_orders && JSON.parse(_orders).length === this.totalContent) {
      this.orders = JSON.parse(_orders)
      this.tableDatas = group(this.orders, this.pageSize)
      this.tableData = this.tableDatas[this.currentPage - 1]
    } else {
      localStorage.setItem('orders', JSON.stringify(new Array()))
      this.getOrders()
    }
  },
}
</script>
<style lang='less' scoped>
@import '../../assets/less/app.less';
.content {
  .order-table {
    table {
      margin: 0 auto;
    }
  }
  .action,
  .pagination {
    text-align: center;
    position: fixed;
    bottom: 8%;
    left: 0;
    right: 0;
  }
  .action {
    bottom: 12%;
    text-align: left;
  }
}
</style>
<style lang="less">
.el-table tr {
  cursor: pointer;
}
.el-table table {
  margin: 0 auto;
  text-align: center;
}
.el-table .el-table__empty-block {
  width: 100%!important;
}
</style>