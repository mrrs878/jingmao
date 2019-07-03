<template>
  <div class="container">
    <side-menu></side-menu>
    <div class="book-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        :height='600'
        @row-click="rowClick"
        tooltip-effect="dark"
        style="width: 90%; margin: 0 auto;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="sid" label="商品ID" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="名称" width="200"></el-table-column>
        <el-table-column prop="price" label="价格" sortable width="150"></el-table-column>
        <el-table-column prop="killPrice" label="秒杀价格" sortable width="150"></el-table-column>
        <el-table-column prop="ctime" label="添加时间" sortable width="200"></el-table-column>
        <el-table-column prop="cover" label="封面"></el-table-column>
      </el-table>
    </div>
    <div class="action" style="width: 80%; margin: 20px auto 0">
      <el-button size="medium" @click="$router.push('/secKill/add')">添加商品</el-button>
      <el-button size="medium" @click="delBooks">删除所选</el-button>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
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
      shops: new Array(),
      tableData: new Array(),
      tableDatas: new Array(),
      multipleSelection: new Array(),
      currentPage: 1,
      pageSize: 5,
      totalContent: 0,
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delBooks() {
      if (this.multipleSelection.length === 0) {
        return
      }
      this.$confirm('此操作将永久删除（这些）商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          for (const tmp of this.multipleSelection) {
            this.secKill.delShop({
              sid: tmp.sid,
              cb: result => {
                if (result.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!',
                  })
                } else {
                  throw '删除失败'
                }
              },
            })
          }
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.tableDatas = group(this.shops, this.pageSize)
      this.tableData = this.tableDatas[this.currentPage - 1]
      console.log(this.tableData, this.tableDatas);
      
    },
    handleCurrentChange(val) {
      this.tableData = this.tableDatas[val - 1]
    },
    rowClick(row, column, event) {
      if (column.label === 'action') {
        return
      }
      this.$router.push(`/secKill/detail/${row.sid}`)
    },
  },
  computed: {
    ...mapState(['book', 'secKill']),
  },
  mounted() {
    this.secKill.getShops({
      cb: result => {
        this.shops = result.data.data.shops
        this.totalContent = this.shops.length
        this.tableDatas = group(this.shops, this.pageSize)
        this.tableData = this.tableDatas[this.currentPage - 1]
      },
    })
  },
}
</script>
<style lang='less' scoped>
@import '../../assets/less/app.less';
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
</style>
<style lang="less">
.el-table tr {
  cursor: pointer;
}
</style>