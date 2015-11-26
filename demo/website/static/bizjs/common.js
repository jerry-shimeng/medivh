/**
 * Created by shimeng on 2015/11/19.
 */

//======================分组==================================================
//已级别分组
function levelExist(list,model){

    for(var i=0;i<list.length;i++) {
        var temp = list[i];
        if(temp.Level == model.Level){
            return i;
        }
    }
    return -1;
}


//已别名分组
function convertList(data,exist,interval){
    var list = new Array()
    for(var i=0;i<data.length;i++){
        var temp = data[i];
        //判断是否已经存在
        var index = exist(list,temp,interval);
        if (index>=0){
            var model = list[index];
            if(model.Count) {
                model.Count = model.Count + temp.Count;
            }else {
                model.Count = 1;
            }

            list[index] = model;
        }else {
            var model = new AliasGroupModel();
            model.Alias = temp.Alias;
            model.Level = temp.Level;
            model.Count = 1;
            model.CDate =  unixInv(temp.CreateTime,interval);
            list.push(model)
        }
    }
    return list;
}


//别名
function aliasExist(list,model){

    for(var i=0;i<list.length;i++) {
        var temp = list[i];
        if(temp.Alias == model.Alias){
            return i;
        }
    }
    return -1;
}
//时间
function timeExist(list,model,interval){
    for(var i=0;i<list.length;i++) {
        var temp = list[i];
        //var inv =(temp.CDate) - model.CreateTime;
        if( temp.CDate == unixInv(model.CreateTime,interval)){
            return i;
        }
    }
    return -1;
}

//时间和别名和类别
function timeAndAliasAndLevelExist(list,model,interval){
    for(var i=0;i<list.length;i++) {
        var temp = list[i];
        //var inv =(temp.CDate) - model.CreateTime;
        if( temp.CDate == unixInv(model.CreateTime,interval) && temp.Alias == model.Alias && temp.Level == model.Level){
            return i;
        }
    }
    return -1;
}


//==============================================时间日期处理=============================================
var minute = 60;//秒为单位
var hour = 60*minute;
var date = 24*hour;
 var week = 7 *date;
//获取2个时间的间隔时间(24/12/7)
function getDateInterval(start,end){
    //判断开始时间和结束时间的间隔
    var interval = end - start;
    if(interval<=0){ return 0;}
    //间隔大于一小时 小于1天 =>小时为间隔
    if (interval>hour && interval <=date){
        return hour;
    }else if(interval>=date && interval<= 2*date ){//一天和2天内== 2小时为间隔
        return 2*hour;
    }else {//天为间隔
        return date;
    }
}

function unixNow(){
    var d = new Date();
    var r = new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(), d.getSeconds()));
    return r.getTime()/1000 - 8*60*60;
}

function unixInv(t,inv){

    var d = new Date(t *1000);

    var r;
    if(inv == hour || inv == 2*hour){
        r= new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),0, 0));
    }else {
       r= new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0));
    }
    return r.getTime()/1000 - 8*60*60;
}


//date类型转换为具体的时间
function dateConvertString(date,inv){
    date = new Date(date * 1000);
    if(inv == hour){
        //单位小时
        return date.getDate()+"日" +  date.getHours()+"时";
    }else if(inv == 2*hour){
        //单位2小时
        return date.getDate()+"日" +  date.getHours()+"时";
    }else {
        //单位天
        return date.getMonth() +"月" + date.getDate()+"日";
    }
}

//根据时间段过滤数据
function filterDataByDate(data,sid){
    var now = unixNow();
    var inv ;
    if (sid == 1){
        inv = now-24 * hour;
    }else if(sid == 2){
        inv = now- 2 * 24 * hour;
    }else if(sid == 3){
        inv = now - 7*date;
    }else {
        inv= now -30*date;
    }

    var list = new Array();
    for (var i =0;i<data.length;i++){
        var temp = data[i];
        if (temp.CreateTime > inv){
            list.push(temp);
        }
    }
    return list;
}

//======================================================分析数据，获得分组数据===========================

function  getGroupData(data){
    var list = new Array();
    //先根据时间线排序
    data = data.sort(function(a,b){return a.CDate - b.CDate;})

    for (var i=0;i<data.length;i++){
        var d1 = data[i];
        var model = new GroupDataModel();
        model.CDate = d1.CDate;
        model.Alias.Alias = d1.Alias;
        model.Level.Level = d1.Level;
        //找和这个时间线相关的数据
        for (var j=i+1;j<data.length;j++){
            var d2 = data[j];
            if (model.CDate == d2.CDate){
                if (model.Alias.Alias == d2.Alias){
                    model.Alias.Count += d2.Count;
                }
                if(model.Level.Level == d2.Level){
                    model.Level.Count +=d2.Count;
                }
            }

        }
        list.push(model);
    }

    return list;
}



















