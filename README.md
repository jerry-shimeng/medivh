# medivh
Medivh监控系统-

本系统主要分3个部分：即sdk（@2） api（@1） 和 website(@3)  。

3个分系统源代码下载地址：

@3 =>website https://github.com/larrymshi/medivh.website 

@2 =>sdk .net版本  https://github.com/larrymshi/medivh.client-csharp

@2 =>sdk java版本  https://github.com/larrymshi/medivh.client-java

@1 =>api https://github.com/larrymshi/medivh.api


使用和接入文档整理中~！

#接入示例 (C#)

###code           
//初始化日志记录器 并设置日志级别(0info 1debug)
MedivhSdk.SetLogger(Log, 1);

//初始化配置对象            
MedivhConfig config = new MedivhConfig();

//设置应用信息(AppName，AppKey，AppSecret 是申请的，切AppKey不能重复)    
config.Client = new ClientInfo() { AppName = "消息中心监控测试NO1", AppKey = "aaaaaaaaaaaaaaaaaa", AppSecret = "..." };

config.ServerIp = "127.0.0.1";//api的地址
config.ServerPort = 5000;//api的端口

//初始化medivh引擎   
MedivhSdk.Init(config);   

//以上是监控系统初始化完毕，现在开始使用业务计数器   
//业务计数器，根据需要设置业务级别  
MedivhSdk.OnceCounter.BusinessCounter("业务1", 1);   
 //自定义计数器   
 MedivhSdk.OnceCounter.CustomCounter("自定义" + i % 5, 1);
 
*以上代码完成了应用服务器sdk的接入，产生的数据会推送到api服务器上，并且由website定时获取同步到数据库中*

#API服务器配置
编译运行main.go(*需设定golang环境，或直接运行编译后的文件*).默认api占用8080端口作为http服务器，占用5000端口作为tcp服务。可在conf/app.conf里面修改。

#website配置
1》website采用数据库为mysql(在conf/app.conf里面修)  
2》编译或运行main.go.然后访问 http://localhost:8081 即可访问实时数据和历史数据报表。  
3》外部报表仅提供api数据，具体api定义待更新
