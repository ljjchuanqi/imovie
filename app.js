var express=require('express')
var path=require('path')
var port=process.env.PORT||3000
var app=express()
var session=require('express-session')
var mongoose=require('mongoose')
var mongoStore=require('connect-mongo')(session)//存储session到mongo的中间件
var serveStatic=require('serve-static')//express依赖 用于指定静态资源加载的路径
var bodyParser=require('body-parser')//express依赖 用于解析数据格式（JSON/二进制/文本）
var cookieParser=require('cookie-parser')//调用express session必须的中间件
var morgan=require('morgan')//开发环境的日志输出工具


var dbUrl='mongodb://localhost:12345/imooc'

mongoose.connect(dbUrl,{useMongoClient: true})

app.set('views','./app/views/pages')
app.set('view engine','jade')
app.use('/static',serveStatic('public'))
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json({limit: '1mb'}));
app.use(cookieParser())
app.use(session({
	secret:'imooc',
	store:new mongoStore({
		url:dbUrl,
		resave: true,
		saveUninitialized: true,
		collection:'sessions'
	})
}))

app.locals.moment=require('moment');

if(app.get('env')==='development'){
	app.set('showStackError',true)//打印错误信息
	app.use(morgan(':method :url :status'));
	app.locals.pretty=true
	mongoose.set('debug',true)
}

app.listen(port)

console.log('imooc started on port '+port)

require('./config/routes')(app)


//写这个有什么收获
// 1.了解前后端交互的基本流程，包括数据提交
// 
// 
// 
// 需要解决的问题
// 1.哪些路由需要带id?
// 2.各种关系图？
// 3.如何区分前端代码和后台代码？
// 4.页面的请求流程？
// 5.cookie的应用？
//如何将刻意练习应用在这个项目的学习上？
//1.找出理解的难点。建模+业务场景
//1月2号
//流程：捕捉难点-》提出问题-》具体场景分析-》归纳总结
//***1.文件位置变化；2.gulp配置；3.数据库的四大常用操作
//Q:视图的文件位置发生变化(文件位置的变化），对路径有什么影响？
//1.对路由；2.对页面静态文件
//Q:如何实现文件变动，游览器的重载？
//gulp配置：功能-插件-配置
//1月3号
//Q：路由是怎么进行分离的？
//Q:用户权限的分离？
//
//关键词：1.变化；2.配置；3.数据库操作；4.分离；5.控制器；6.路由;7.方法
//
//总用时：24h
//
//
//路由
//Q：路由是什么？
//Q：路由与其他的关系？
//Q：路由的视觉化？
//Q：
//
//控制器
//Q：控制器是什么？
//Q：控制器的基础是什么？
//Q：控制器的视觉化？
//Q:控制器与视图和模型的关系？
/*
录入和更新
Ｑ：录入与修改（更新）与ｉｄ的关系？
Ａ：修改需要ｉｄ

方法
方法-页面
方法-数据
movie中的save方法
Q：哪些页面调用了save方法？
A：/admin/movie/new、/admin/movie/update

变量与对象属性
Ｑ：两种的视觉化
Q：变量出现的位置？
Ａ：１.顶部；２.内部；
Ｑ：变量与提交的数据关系？
Ａ：

数据
Ｑ：数据的格式？
Ｑ：如何获得这些数据？
Ｑ：评论需要获得哪些字段的数据？
*相比各种前端操作数据结构相对稳定。
ＭＳ：中介者模式


思维速度
Q：思维速度太慢，反应不过来是什么原因？
A：联系太少，联系越多速度越快。

刻意练习
原则：１.具体化；
好处：1.命名；2.建模；3.对比；

常用的词
语句
if
if-调用场景

循环

参数
参数-传递
参数-名字

链接
链接-id
Q :哪些链接带有id？
Ａ：有列表的。
数据模型
用户模型-调用方法

id
id-查询
Q：普通id和objectId在查询有什么区别？

思维方式的转换
比如：考勤不管调休、请假、迟到，只关注小时数就好了。
推广：计算方式

翻页
索引
Q：索引的计算？
索引-页码
*/
//
//
// <embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=k0015x1j6fg&auto=0" allowFullScreen="true" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>