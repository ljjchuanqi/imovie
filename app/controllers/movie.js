var Movie=require('../models/movie')
var Comment=require('../models/comment')
var Category=require('../models/category')
var _=require('underscore')

//电影详情页
exports.detail=function(req,res){
	var id=req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			Comment.find({movie:id})
				.populate('from', 'name')
	      		.populate('reply.from reply.to', 'name')
	      		.exec(function(err, comments) {
		        res.render('detail', {
		          title: 'imooc 详情页',
		          movie: movie,
		          comments: comments
		        })
      		})
		})
	}
	
}

//后台录入页
exports.new = function(req, res) {
  Category.find({}, function(err, categories) {
    res.render('admin', {
      title: 'imooc 后台录入页',
      categories: categories,
      movie: {}
    })
  })
}
//后台录入页post数据
exports.save = function(req, res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if (req.poster) {
    movieObj.poster = req.poster
  }

  if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err)
      }

      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err)
        }

        res.redirect('/movie/' + movie._id)
      })
    })
  }
  else {
    _movie = new Movie(movieObj)

    var categoryId = movieObj.category
    var categoryName = movieObj.categoryName

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err)
      }
      if (categoryId) {
        Category.findById(categoryId, function(err, category) {
          category.movies.push(movie._id)

          category.save(function(err, category) {
            res.redirect('/movie/' + movie._id)
          })
        })
      }
      else if (categoryName) {
        var category = new Category({
          name: categoryName,
          movies: [movie._id]
        })

        category.save(function(err, category) {
          movie.category = category._id
          movie.save(function(err, movie) {
            res.redirect('/movie/' + movie._id)
          })
        })
      }
    })
  }
}

//后台录入页更新
exports.update=function(req,res){
	var id=req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'imooc update!',
				movie:movie
			})
		})
	}
}

//后台电影列表页
exports.list=function(req,res){
	Movie.fetch(function(err,movies){
		res.render('list',{
			title:"列表页",
			movies:movies
		})
	})
	
}

//后台电影列表页删除
exports.del=function(req,res){
	var id=req.query.id
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err)
			}else{
				res.json({success:1})
			}
		})
	}
}


exports.search=function(req,res){
  var q=req.query.q
  var catId=req.query.cat
  var page=parseInt(req.query.p,10)||0
  var count=2
  var index=page*count

  if(catId){
    Category.find({_id:catId})
            .populate({
              path:'movies',
              select: 'title poster'
            })
            .exec(function(err,categories){
              var category=categories[0]||{}
              var movies=category.movies||[]
              var results=movies.slice(index,index+count)

              res.render('results',{
                 title:"搜索结果页",
                 keyword: category.name,
                 currentPage: (page + 1),
                 query: 'cat=' + catId,
                 totalPage: Math.ceil(movies.length / count),
                 movies: results
               })
            })
  }

  // Movie.find({title:q},function(err,movies){
  //   res.render('results',{
  //     title:"搜索结果页",
  //     movies:movies
  //   })
  // })
}