/**
 * Created by shimeng on 2015/11/20.
 * 展示图表专用
 */


//饼状图
function showChartPie(option,obj){
    require(['echarts','echarts/chart/pie'],function(ec){
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(obj);
        // 为echarts对象加载数据
        myChart.setOption(option);
    });
}

//柱状图
function showChartBar(option,obj){
    require(['echarts','echarts/chart/bar','echarts/chart/line'],function(ec){
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(obj);
        // 为echarts对象加载数据
        myChart.setOption(option);
    });
}