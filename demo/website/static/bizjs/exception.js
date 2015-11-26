/**
 * Created by shimeng on 2015/11/19.
 * 主要是错误计数器里面使用的js
 */

//pid
var pid = ""

var cacheData ;

//加载数据
function  loadErrorData(id,model){
    var index = layer.load(0, {shade: [0.3,'gray']});

    pid = id;
    $("#dateSelect").val(4);
    var url ="/counter/exception/"+pid;

    $.getJSON(url,model,function(data){
        layer.close(index);
        if(!data){
            layer.alert("no data",{icon:2});
        }else if (data.code != 0){
            layer.alert(data.message,{icon:2});
        }else {
            if (data.data.length == 0){
                layer.msg("no data!",{time: 5000, icon:2});
                return;
            }
            cacheData = data.data;
            showTypeChart(data.data);
            showLevelChart(data.data);
            showTimeChart(data.data,date);
        }


    });
}

//展示类型
function showTypeChart(data){
    if(data.length<=0){
        return;
    }
    //var r = data.sort(function(a,b){ return a.Count > b.Count? -1 : 1});
    var r = convertList(data,aliasExist);

    var name=new Array();
    var num =new Array();


    for (var i =0 ;i < r.length;i++){
        var temp = r[i];
        name.push(temp.Alias);
        num.push(temp.Count);
    }

        var option = {
            title : {
                text: '异常类型总览',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['系统异常']
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    data : name
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'系统异常',
                    type:'bar',
                    data:num,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        };

    showChartBar(option,document.getElementById('typechart'));

}


function showLevelChart(data){
    if(data.length<=0){
        return;
    }
    //var r = data.sort(function(a,b){ return a.Count > b.Count? -1 : 1});
    var r = convertList(data,levelExist);
    r = r.sort(function(a,b){ return a.Level - b.Level; });

    var name=new Array();
    var num =new Array();


    for (var i =0 ;i < r.length;i++){
        var temp = r[i];
        name.push("Level:"+temp.Level);
        num.push(temp.Count);
    }

    var option = {
        title : {
            text: '异常级别总览',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['系统异常']
        },
        calculable : false,
        xAxis : [
            {
                type : 'category',
                data : name
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'系统异常',
                type:'bar',
                data:num,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };

    showChartBar(option,document.getElementById('levelchart'));

}

function showTimeChart(data,inv){
    if(data.length<=0){
        return;
    }
    //var r = data.sort(function(a,b){ return a.Count > b.Count? -1 : 1});
    var r = convertList(data,timeExist,inv);
//排序
    r = r.sort(function(a,b){
        return  (a.CDate) -  (b.CDate)  ;
    });

    var name=new Array();
    var num =new Array();


    for (var i =0 ;i < r.length;i++){
        var temp = r[i];
        name.push(dateConvertString(temp.CDate,inv));
        num.push(temp.Count);
    }

    var option = {
        title : {
            text: '异常时间线总览',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['系统异常']
        },
        calculable : false,
        xAxis : [
            {
                type : 'category',
                data : name
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'系统异常',
                type:'line',
                data:num,
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };

    showChartBar(option,document.getElementById('timechart'));

}


//重新生成按钮点击
$("#rebuild").click(function(){
    //获取选择
    var sid = $("#dateSelect").val();
    var inv ;
    if (sid == 1){
        inv = hour;
    }else if(sid == 2){
        inv = 2*hour;
    }else {
        inv = date;
    }
    var data = filterDataByDate(cacheData,sid);
    showTypeChart(data);
    showLevelChart(data);
    showTimeChart(data,inv);
});

$("#refresh").click(function(){

    var model = new CmdModel();
    model.module = 1;
    model.counter = 1;
    loadErrorData(tid,model);
});

$("#cleardata").click(function(){
    layer.confirm('清空数据会导致历史数据丢失切不可恢复，确定要执行操作吗？', {
        btn: ['确定','不清空'] //按钮
    }, function(){
        var model = new CmdModel();
        model.module = 1;
        model.counter = 1;
        model.operate = "clear";
        var index = layer.load(0, {shade: [0.3,'gray']});

        var url ="/counter/business/"+pid;

        $.getJSON(url,model,function(data){
            layer.close(index);
            if(!data){
                layer.alert("no data",{icon:2});
            }else if (data.code != 0){
                layer.alert(data.message,{icon:2});
            }else {
                layer.msg(data.data,{time: 5000, icon:6});
                location.href = location.href;
            }
        });
    }, function(){
        layer.closeAll();
        return false;
    });
});