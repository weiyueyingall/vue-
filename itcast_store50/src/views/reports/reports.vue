<template>
  <el-card class="card">
     <my-breadcrumb level1="数据统计" level2="数据报表"></my-breadcrumb>
     <div ref="div" style="width:800px;height:600px"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts';
export default {
  async mounted() {
    const res = await this.$http.get(`reports/type/1`);
    let option = res.data.data;
    const data = {
      title: {
        text: 'xxx'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          lable: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
    };
    option = {...option, ...data};
    option.xAxis[0].boundaryGap = false;
    const myChart = echarts.init(this.$refs.div);
    myChart.setOption(option);
  }
};
</script>

<style>

</style>
