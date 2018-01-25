var gulp=require('gulp')
var nodemon=require('gulp-nodemon')
var livereload=require('gulp-livereload')


gulp.task('start',function(){
	nodemon({
		script:'app.js',
		ext:"js html"
	})
})


gulp.task('watch',function(){
	livereload.listen()
	gulp.watch('app/views/**/*.jade',function(event){
		livereload.changed(event.path)
	})
})

gulp.task('web',['watch','start'])

