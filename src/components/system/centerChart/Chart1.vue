
<template>
  <div>
    <div id="chart_example"></div>
  </div>
</template>
 
<script>
import echarts from "echarts";
//   import "echarts/lib/chart/bar";
export default {
  data() {
    return {};
  },
  mounted() {
    let myChart = this.echarts.init(document.getElementById("chart_example"));
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
         data: ["科研", "荣誉", "教学"]
      },
      series: [
        {
          name: "业绩情况",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "科研" },
            { value: 310, name: "荣誉" },
            { value: 234, name: "教学" }
          ],
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