<template>
  <el-card class="card">
  <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
  <el-button type="success" @click="handleOpenDiaLog" plain style="margin-top:10px">添加分类</el-button>
  <el-table
      :data="tableData"
      :height="530"
      border
      stripe
      style="width: 100%">
      <el-table-tree-column
        treekey="cat_id"
        parentkey="cat_pid"
        levelkey="cat_level"
        :indentSize="20"
        prop="cat_name"
        label="分类名称"
        width="300">
      </el-table-tree-column>
      <el-table-column
        prop="cate_level"
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-else-if="scope.row.cat_level===1">二级</span>
          <span v-else-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted?'无效':'有效' }}
        </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="handleOpenEditDialog(scope.row)"></el-button>
          <el-button @click="handledelete(scope.row)" size="mini" type="danger" icon="el-icon-delete" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 <!-- 添加弹出框 -->
<el-dialog title="添加商品分类" :visible.sync="addDialogFormVisible">
  <el-form :model="form" label-width="80px">
    <el-form-item label="分类名称">
      <el-input v-model="form.cat_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="父级分类">
      <!-- 多级下拉框 -->
      <!-- expand-trigger  触发展开事件
      options  展开的数据
      v-model  双向绑定 多级下拉框 绑定上的是多个值
      @change   当发生改变的时候执行
      change-on-select  选择任意一级菜单的选项
       -->
      <el-cascader
        change-on-select
        expand-trigger="hover"
        :options="options"
        v-model="selectedOptions"
        :props="{lable:'cat_name',value:'cat_id',chidren:'children'}">
      </el-cascader>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleAdd">确 定</el-button>
  </div>
</el-dialog>
<!-- 修改弹出框 -->
<el-dialog title="修改商品分类" :visible.sync="editDialogFormVisible">
  <el-form :model="form" label-width="80px">
    <el-form-item label="分类名称">
      <el-input v-model="form.cat_name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleEdit">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
import ElTreeGrid from 'element-tree-grid';
export default {
  components: {
    'el-table-tree-column': ElTreeGrid
  },
  data() {
    return {
      tableData: [],
      // 分页数据
      pagenum: 1,
      pagesize: 9,
      total: 0,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      form: {
        cat_name: ''
      },
      options: [],
      selectedOptions: [],
      currentCat: null
    };
  },
  created() {
    this.loadDate();
  },
  methods: {
    async loadDate() {
      const res = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const {meta: {msg, status}} = res.data;
      if (status === 200) {
        this.tableData = res.data.data.result;
        this.total = res.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },

    // 添加商品分类
    async handleOpenDiaLog() {
      this.addDialogFormVisible = true;
      const res = await this.$http.get('categories?type=2');
      this.options = res.data.data;
    },
    // 点击确定 添加数据
    async handleAdd() {
      this.form.cat_level = this.selectedOptions.length;
      if (this.selectedOptions.length === 0) {
        this.form.cat_pid = 0;
      } else if (this.selectedOptions.length === 1) {
        this.form.cat_pid = this.selectedOptions[0];
      } else if (this.selectedOptions.length === 2) {
        this.form.cat_pid = this.selectedOptions[1];
      }
      const res = await this.$http.post('categories', this.form);
      const {meta: {msg, status}} = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.addDialogFormVisible = false;
        this.loadDate();
      } else {
        this.$message.error(msg);
      }
    },
    // 点击删除按钮 删除分类
    handledelete(cat) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        const res = await this.$http.delete(`categories/${cat_id}`);
        const {meta: {msg, status}} = res.data;
        if (status === 200) {
          this.$message.success(msg);
          this.loadDate();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 修改后 点击确定
    async handleEdit() {
      const res = await this.$http.put(`categories/${this.currentCat.cat_id}`, this.form);
      const {meta: {msg, status}} = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.editDialogFormVisible = false;
        this.currentCat.cat_name = res.data.data.cat_name;
      } else {
        this.$message.error(msg);
      }
    },
    // 点击 修改
    handleOpenEditDialog(cat) {
      this.editDialogFormVisible = true;
      this.form.cat_name = cat.cat_name;
      this.currentCat = cat;
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadDate();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadDate();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
/* .card{
  height: 100%;
  overflow: auto;
} */
</style>
