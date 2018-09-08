<template>
  <el-card class="card">
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <el-row class="row" :span="24">
      <el-col >
        <el-input
         clearable
         style="width:400px"
         placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button></el-input>
        <el-button type="success" plain style="margin-top:10px">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
     <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="400">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)">
      </el-table-column>
       <el-table-column
        prop="goods_weight"
        label="商品重量">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
           {{ scope.row.add_time | formDate('YYYY-MM-DD HH:mm:ss')   }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 10,
      total: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const res = await this.$http.get(`/goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const {meta: {msg, status}} = res.data;
      if (status === 200) {
        this.tableData = res.data.data.goods;
        this.total = res.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>

.el-table .cell{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
