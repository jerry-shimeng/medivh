/**
 * Created by shimeng on 2015/11/26.
 */

var pid ="";

//加载数据
function  loadCustomData(id,model,callback){
    var index = layer.load(0, {shade: [0.3,'gray']});

    pid = id;
    $("#dateSelect").val(4);
    var url ="/counter/business/"+pid;

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
            //showTypeChart(data.data);
            //showLevelChart(data.data);
            //showTimeChart(data.data,date);
            callback();
        }

    });
}

//加载自定义数据的所有类型
function loadCustomTypeData(id,model){
    pid = id;

    var url ="/counter/customer/"+pid;

    $.getJSON(url,model,function(data){

        if(!data){
            layer.alert("no data",{icon:2});
        }else if (data.code != 0){
            layer.alert(data.message,{icon:2});
        }else {

            if (data.data.length == 0){
                layer.msg("no data!",{time: 5000, icon:2});
                return;
            }
            var obj = $("#typeSelect");
            var r = data.data;
            var str = "";
            for(var i=0;i< r.length;i++){
                var temp = r[i].Mark;
                //if(i == 0){lastBuildType =temp;}
                str += '<option  value="'+temp+'">'+temp+'</option>';
            }
            obj.html(str);

            $("#rebuild").click();
        }
    });
}

var lastBuildType=""

//重新生成按钮点击
$("#rebuild").click(function(){
    //获取选择
    var sid = $("#dateSelect").val();
    var stype =$("#typeSelect").val();

    var inv ;
    if (sid == 1){
        inv = hour;
    }else if(sid == 2){
        inv = 2*hour;
    }else {
        inv = date;
    }
    //判断是否改变数据类型？
    if(lastBuildType != stype){
        lastBuildType = stype;
        var cmdModel = new CmdModel();
        cmdModel.module = 1;
        cmdModel.counter = 4;
        cmdModel.mark =lastBuildType;
        loadCustomData(pid,cmdModel,function(){
            var data = filterDataByDate(cacheData,sid);
            //showTypeChart(data);
            showLevelChart(data);
            showTimeChart(data,inv);
        });
    }else {
        var data = filterDataByDate(cacheData,sid);
        showLevelChart(data);
        showTimeChart(data,inv);
    }
});

$("#refresh").click(function(){

    var model = new CmdModel();
    model.module = 1;
    model.counter = 3;
    loadBizData(tid,model);
});
//Operate
$("#cleardata").click(function(){

    layer.confirm('清空数据会导致历史数据丢失切不可恢复，确定要执行操作吗？', {
        btn: ['确定','不清空'] //按钮
    }, function(){
        var model = new CmdModel();
        model.module = 1;
        model.counter = 4;
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


//==========================================

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
            text: '业务类型总览',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['业务数据']
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
                name:'业务数据',
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
            text: '业务级别总览',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['业务数据']
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
                name:'业务数据',
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
            text: '业务时间线总览',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['业务信息']
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
                name:'业务信息',
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