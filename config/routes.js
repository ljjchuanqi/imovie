var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment=require('../app/controllers/Comment')
var Category=require('../app/controllers/Category')

module.exports=function(app){
	//路由设置
	//pre handle user
	app.use(function(req,res,next){
		var _user=req.session.user
		
		app.locals.user = _user
		
		next()
		
	})
	//首页
	app.get('/',Index.index)

	//用户
	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)
	app.get('/signup',User.showSignup)
	app.get('/signin',User.showSignin)
	app.get('/logout',User.logout)
	app.get('/user/user/list',User.signinRequired,User.adminRequired,User.list)
	

	//电影
	app.get('/movie/:id',Movie.detail)
	app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)
	app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)
	app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.save)
	app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
	app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)

	//评论
	app.post('/user/comment', User.signinRequired, Comment.save)

	//分类
	app.get('/admin/category/new',User.signinRequired,User.adminRequired,Category.new)
	app.post('/admin/category',User.signinRequired,User.adminRequired,Category.save)

	//搜索
	app.get('/results',Movie.search)

}