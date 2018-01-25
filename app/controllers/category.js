var Category=require('../models/category')

exports.new=function(req,res){
	res.render('category_admin',{
		title:"分类添加页",
		category:{}
	})
}

exports.save=function(req,res){
	var _category=req.body.category
	var name=_category.name


	Category.findOne({name:name},function(err,category){
		console.log(category)
		if(err){
			console.log(err)
		}
		if(category){
			res.redirect('/')
		}else{
			category=new Category(_category)
			category.save(function(err,category){
				console.log(1111111)
				res.redirect('/admin/category/new')
			})		
		}

	})
	
}