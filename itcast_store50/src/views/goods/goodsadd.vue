<template>
  <el-card class="card">
    <!-- 面包屑功能 -->
    <my-breadcrumb level1="商品管理" level2="商品添加"></my-breadcrumb>
    <!-- 弹出框 -->
    <el-alert
     style="margin-top:10px;margin-bottom:10px"
     :closable="false"
     title="info"
     center
     show-icon>
    </el-alert>
    <!-- 步骤条 -->
    <el-steps
     :active="active"
     align-center
     finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab栏 -->
    <el-form
     label-position="top"
     lable-width="80px"
     :model="formData">
      <el-tabs
        @tab-click="handleTabClick"
        tab-position="left"
        style="margin-top:15px;">
        <el-tab-pane label="基本信息">
          <el-form-item lable="商品名称">
            <el-input v-model="formData.goods_name"></el-input>
          </el-form-item>
           <el-form-item lable="商品价格">
            <el-input v-model="formData.goods_price"></el-input>
          </el-form-item>
          <el-form-item lable="商品重量">
            <el-input v-model="formData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item lable="商品数量">
            <el-input v-model="formData.goods_number"></el-input>
          </el-form-item>
          <el-form-item lable="商品分类">
            <!-- 多级下拉框 -->
           {{selectedOptions}}
            <el-cascader
              expand-trigger="hover"
              clearable
              :props="{lable:'cat_name',value:'cat_id',children:'children'}"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form-item
           v-for="item in dynamicParams"
           :key="item.cat_id"
           :lable="item.attr_name">
            {{item.attr_vals}}
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
               v-for="val in item.attr_vals"
               :key="val"
               border
               :lable="val">
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane lable="商品属性">
          <el-form-item
           v-for="item in staticParams"
           :key="item.attr_id"
           :lable="item.attr_name">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 图片上传 -->
        <el-tab-pane lable="商品图片">
          <el-upload
            action="https://localhost:8888/api/private/v1/upload"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :hearders="hearders"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane lable="商品内容">
          <el-button @click="hadleAdd">添加商品</el-button>
          <quill-editor
           v-model="formData.goods_introduce">
          </quill-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';

export default {
  // 注册局部组件
  components: {
    quillEditor
  },
  data() {
    return {
      active: 0,
      formData: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: '',
        pics: [],
        goods_introduce: '',
        attr: []
      },
      options: [],
      selectedOptions: [],
      staticParams: [],
      dynamicParams: [],
      headers: {
        Authorrization: sessionStorage.getItem('token')
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 左侧tab栏切换
    handleTabClick(tab) {
      this.active = tab.index - 0;
      if (tab.index === '1' || tab.index === '2') {
        this.dynamicParams.length = 0;
        this.staticParams.length = 0;
        if (this.selectedOptions.length < 3) {
          this.$message.warning('请选择商品的三级分类');
        } else {
          const sel = tab.index === '1' ? 'many' : 'only';
          this.loadData(sel);
        }
      }
    },
    // 加载分类参数
    async loadData(sel) {
      const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${sel}`);
      if (sel === 'many') {
        this.dynamicParams = res.data.data;
        this.dynamicParams.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');
        });
      } else {
        this.staticParams = res.data.data;
      }
    },
    // 加载多级下拉框的分类数据
    async loadOptions() {
      const res = await this.$http.get('categories?type=3');
      this.options = res.data.data;
    },
    // 多级下拉框选中的内容发生改变时
    handleChange() {
      if (this.selectedOptions.length !== 3 && this.selectedOptions.length !== 0) {
        this.$message.warning('请选择商品的三级分类');
        this.selectedOptions.length = 0;
      }
    },
    // 图片删除
    handleSuccess(file, fileList) {
      const index = this.formData.pics.findIndex((item) => {
        return item.pic === file.response.data.tem_path;
      });
      this.formData.pics.splice(index, 1);
    },
    // 图片上传
    handleRemove(response, file, fileList) {
      this.formData.pics.push({
        pic: response.data.tem_path
      });
    },
    // 添加商品
    async hadleAdd() {
      this.formData.goods_cat = this.selectedOptions.join(',');
      const arr1 = this.staticParams.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        };
      });
      const arr2 = this.dynamicParams.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(',')
        };
      });
      this.formData.attrs = [...arr1, ...arr2];
      const res = await this.$http.post('goods', this.formData);
      const {meta: {msg, status}} = res.data;
      if (status === 201) {
        this.$message.success(msg);
        this.$router.push('/goods');
      } else {
        this.$message.error(msg);
      }
    }
  }

};
</script>

<style>
.el-editor{
  height: 400px;
}
.el-step_title{
  font-size: 12px;
}
</style>
