<template>
  <section>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工厂收益</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row :gutter="15">
      <el-col :span="12">
        <el-card>
          <div id="chartColumn" style="width:100%; height:400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="chartLine" style="width:100%; height:400px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import echarts from "echarts";
import ElFormItem from "element-ui/packages/form/src/form-item";

export default {
  components: { ElFormItem },
  data() {
    return {
      urlSeletTop: "/pizzaexpress/shop/getTop5shops",
      chartColumn: null,
      chartBar: null,
      topShopData: []
    };
  },
  methods: {
    drawColumnChart() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      this.chartColumn.setOption({
        title: { text: "今日工厂收益前五名" },
        tooltip: {},
        xAxis: {
          data: this.topShopData.shopName,
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.topShopData.shopSalesVolume,
            itemStyle: {
              normal: {
                color: "#106EDD"
              }
            }
          }
        ]
      });
    },
    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption({
        title: {
          text: "近半年月销售额"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["月销售额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2018/09",
            "2018/10",
            "2018/11",
            "2018/12",
            "2019/02",
            "2019/03"
          ],
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "月销售额",
            type: "line",
            stack: "总量",
            data: [8200, 6320, 9010, 10340, 9000, 11200],
            itemStyle: {
              normal: {
                color: "#106EDD"
              }
            }
          }
        ]
      });
    },
    drawCharts() {
      this.drawColumnChart();
      this.drawLineChart();
    }
  },
  mounted: function() {
    this.$axios.post(this.urlSeletTop).then(res => {
      let topShops = res.data.shopData.data;
      this.topShopData = topShops;
      this.drawCharts();
    });
  },
  updated: function() {
    this.drawCharts();
  }
};
</script>

<style scoped>
</style>
