var Movie=require('../models/movie')
var Category = require('../models/category')

//首页
exports.index=function(req,res){
	Category
	.find({})
    .populate({
      path: 'movies',
      select: 'title poster',
      options: { limit: 6 }
    })
    .exec(function(err, categories) {
      if (err) {
        console.log(err)
      }

      res.render('index', {
        title: 'imooc 首页',
        categories: categories
      })
    })
	
}
