
<template>
  <div>
    <div id="chart_example">
    <h1 id="chart_span" style="margin-left:30px;margin-top:30px;"></h1>
    </div>
    
  </div>
</template>
 
<script>
import echarts from "echarts";
//   import "echarts/lib/chart/bar";
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.getRequest("/center/PerforEchart1").then(res => {
      if (res.data.length == 0) {
        document.getElementById("chart_span").innerText="暂无数据";
      } else {
        let myChart = this.echarts.init(
          document.getElementById("chart_example")
        );
        let option = {
          title: {
            text: "所有业绩获得情况",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: [
              "个人科研",
              "集体科研",
              "个人荣誉",
              "集体荣誉",
              "个人教学业绩",
              "集体教学业绩",
              "其他"
            ]
          },
          series: [
            {
              name: "业绩情况",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: res.data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };

        myChart.setOption(option);

        //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      }
    });
  },
  methods: {},
  watch: {},
  created() {}
};
</script>
<style scoped>
h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}
#chart_example {
  width: 100%;
  height: 500px;
  /* border: 1px solid red; */
  margin: 0 auto;
}
</style>