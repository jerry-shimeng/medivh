/**
 * Created by shimeng on 2015/11/19.
 * 主要定义了需要的model
 */

//命令模型
function  CmdModel(){
    this.mark="";
    this.alias = "";
    this.level = 0;
    this.module = 0;
    this.counter = 0;
    this.operate = "";
}
//别名分组
function AliasGroupModel(){
    this.Alias = "";
    this.Count = 0;
    this.Level = 0;
    this.CDate = "";
}

function  GroupDataModel(){
    this.CDate = 0;
    this.Alias = new Object();
    this.Level = new Object();
}
