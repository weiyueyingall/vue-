<template>
  <el-card class="card">
 <!-- 面包屑功能 -->
    <my-breadcrumb level1="商品管理" level2="分类参数"></my-breadcrumb>
      <!-- 弹出框 -->
    <el-alert
     style="margin-top:10px;margin-bottom:10px"
     :closable="false"
     title="注意:只允许为第三级分类设置相关参数"
     type="warning"
     show-icon>
    </el-alert>
    <!-- 层级下拉框 -->
    <el-row>
      <el-col :span="24">
        请选择商品分类:
      <el-cascader
        clearable
        :show-all-levels="false"
        expand-trigger="hover"
        :options="options"
        :props="{lable:'cat_name',value:'cat_id',children:'children'}"
        v-model="selectedOptions"
        @change="handleChange">
      </el-cascader>
      </el-col>
    </el-row>
    <!-- tab栏切换 -->
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="many">
        <el-button
         :disabled="selectedOptions.length!==3"
         type="primary">
          添加动态参数
        </el-button>
        <el-table
         border
         stripe
         :data="dynamicParams"
         style="width:100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-tag v-for="(tag, index) in scope.row.params"
            :key="tag" closable
            @close="handleClose(scope.row.params,index,scope.row)">
              {{tag}}
            </el-tag>
            <el-input
             class="inputVisible"
             v-if="inputVisible"
             v-model="inputValue"
             ref="saveTagInput"
             size="small"
             @keyup.enter.native="handleInputConfirm(scope.row.params)"
             @blur="handleInputConfirm(scope.row.params)">
            </el-input>
            <el-button v-else class="button-new-tag"
             size="small" @click="showInput">+ New Tag</el-button>
          </template>
        </el-table-column>
        <el-table-column
         type="index"
         width="60">
        </el-table-column>
         <el-table-column
         prop="attr_name"
         lable="商品参数"
         width="300">
        </el-table-column>
        <el-table-column
         lable="操作">
         <template slot-scope="scope">
           <el-button size="mini" type="primary" icon="el-icon-edit"
            plain ></el-button>
           <el-button size="mini" type="danger" icon="el-icon-delete"
            plain ></el-button>
         </template>
        </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane lable="静态参数" name="only">
        <el-button
         :disabled="selectedOptions.length!==3"
         type="primary">
          添加静态参数
        </el-button>
        <el-table
         border
         stripe
         :data="staticParams"
         style="width:100%">
        <el-table-column
         type="index"
         width="60">
        </el-table-column>
        <el-table-column
         prop="attr_name"
         lable="属性名称"
         width="180">
        </el-table-column>
        <el-table-column
         prop="attr_vals"
         lable="属性值"
         width="300">
        </el-table-column>
        <el-table-column
         lable="操作">
         <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit"
            plain ></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"
            plain ></el-button>
         </template>
        </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
      activeTab: 'many',
      dynamicParams: [],
      staticParams: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  created() {
    this.loadOptions();
  },
  methods: {
    // 多级下拉框改变时执行
    handleChange() {
      this.loadParams();
    },
    // 点击tab栏切换时执行
    handleClick(tab) {
      this.loadParams();
    },
    // 加载商品分类
    async loadOptions() {
      const res = await this.$http.get(`categories?type=3`);
      this.options = res.data.data;
    },
    // 加载动态/静态参数
    async loadParams() {
      if (this.selectedOptions.length !== 3) {
        this.$message.warning('请选择三级分类');
        return;
      }
      const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${this.activeTab}`);
      if (this.activeTab === 'many') {
        this.dynamicParams = res.data.data;
        this.dynamicParams.forEach(item => {
          const arr = item.attr.vals.length === 0 ? [] : item.attr.vals.split(',');
          this.$set(item, 'params', arr);
        });
      } else {
        this.staticParams = res.data.data;
      }
    },
    // 点击tag的关闭按钮时执行
    async handleClose(params, index, attr) {
      params.splice(index, 1);
      const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr.attr_id}`, {
        attr_name: attr.attr_name,
        attr_sel: attr.attr_sel,
        attr_vals: params.join(',')
      });
      attr.attr_vals = params.join(',');
      const {meta: {msg, status}} = res.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    handleInputConfirm(params) {
      let inputValue = this.inputValue;
      if (inputValue) {
        params.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.savaTagInput.$refs.input.focus();
      });
    }
  }
};
</script>

<style>

</style>
