<template>
  <div>
    <div id="chart_example1" />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  watch: {},
  mounted() {
    this.getRequest('/center/PerforEchart1').then(res => {
      const myChart1 = this.echarts.init(
        document.getElementById('chart_example1')
      )
      const option1 = {
        title: {
          text: '各类业绩获得情况',
          x: 'center'
        },

        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: 'horizontal',
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: 'left',
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: 'top',
          data: ['科研', '荣誉', '教学']
        },
        grid: {
          top: '16%', // 等价于 y: '16%'
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },

        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          // boundaryGap值为false的时候，折线第一个点在y轴上
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },

        yAxis: {
          type: 'value',
          min: 0, // 设置y轴刻度的最小值
          max: 1800, // 设置y轴刻度的最大值
          splitNumber: 9 // 设置y轴刻度间隔个数
        },

        series: [
          {
            name: '科研',
            data: [820, 932, 301, 1434, 1290, 1330, 1320],
            type: 'line',
            symbolSize: 10,
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true
                }
              }
            }
          },
          {
            name: '荣誉',
            data: [620, 732, 941, 834, 1690, 1030, 920],
            type: 'line',
            symbolSize: 10,
            // 设置折线上圆点大小
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true
                }
              }
            }
          },
          {
            name: '教学',
            data: [120, 232, 541, 134, 290, 130, 120],
            type: 'line',
            symbolSize: 10,
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true
                }
              }
            }
          }
        ]
      }

      myChart1.setOption(option1)

      //   //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize', function() {
        myChart1.resize()
      })
    })
  },
  created() {},
  methods: {}
}
</script>
<style scoped>
h2 {
  text-align: center;
  padding: 30px;
  font-size: 18px;
}
#chart_example1 {
  width: 100%;
  height: 600px;
  /* border: 1px solid red; */
  margin: 0 auto;
}
</style>
