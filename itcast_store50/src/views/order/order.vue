<template>
  <el-card class="card">
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <el-table
     border
     stripe
     :data="tableData"
     style="width:100%; margin-top:10px">
     <el-table-column
      type="index"
      width="60">
     </el-table-column>
     <el-table-column
      prop="order_number"
      lable="订单编号"
      widht="300">
     </el-table-column>
     <el-table-column
      prop="order_price"
      lable="订单价格"
      width="80">
     </el-table-column>
     <el-table-column
      prop="order_pay"
      lable="是否付款"
      width="100">
      <template slot-scope="scope">
        <el-tag type="danger">
          {{scope.row.order_pay==='0'?'未付款':'付款'}}
        </el-tag>
      </template>
     </el-table-column>
    <el-table-column
      prop="is_send"
      lable="是否发货"
      width="80">
    </el-table-column>
    <el-table-column
      prop="create_time"
      lable="下单时间"
      width="200">
      <template slot-scope="scope">
        {{scope.row.create_time | format('YYYY-MM-DD HH:mm:ss')}}
      </template>
     </el-table-column>
     <el-table-column
      lable="操作">
       <template slot-scope="scope">
         <el-button @click="handleOpenDialog" size="min" plain
          icon="el-icon-edit"></el-button>
       </template>
    </el-table-column>
    </el-table>
    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80">
        <el-form-item label="省市县/区">
          <!-- 级联下拉框 -->
         <el-cascader
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions">
        </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
import cityData from './city_data2017_element';
export default {
  data() {
    return {
      form: {

      },
      tableData: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      options: [],
      selectedOptions: [],
      dialogFormVisible: false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载数据
    async loadData() {
      const res = await this.$http.get(`order?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      this.tableData = res.data.data;
      this.total = res.data.data.total;
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    },
    // 打开对话框
    handleOpenDialog() {
      dialogFormVisible = true;
      this.options = cityData;
    }

  }
};
</script>

<style>

</style>
