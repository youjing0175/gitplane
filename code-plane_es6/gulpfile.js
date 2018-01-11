//htmlmin插件的参数对象
var obj = {
	removeComments: true, //清除HTML注释
	collapseWhitespace: true, //压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值<input checked="true"/> ==> <input checked/>
	removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
	removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
	removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
	minifyJS: true, //压缩页面JS
	minifyCSS: true //压缩页面CSS
}

//获取gulp对象
var gulp = require("gulp");

//导入插件
var htmlmin = require("gulp-htmlmin"); //html压缩和优化的插件
var uglify = require("gulp-uglify"); //js压缩插件
//var rename = require("gulp-rename"); //重命名插件
var babel = require('gulp-babel'); //es6转es5
var imagemin = require('gulp-imagemin'); //图片压缩相关插件
var minifyCss = require('gulp-minify-css'); //css压缩插件

//定义任务
gulp.task("htmlTask", function(){
	gulp.src("*.html")
		.pipe( htmlmin(obj) ) //使用插件htmlmin
		.pipe( gulp.dest("dest") );
})
//压缩css的插件
gulp.task('cssTask', function(){
	gulp.src('dafeiji.css')
	.pipe(minifyCss())
	.pipe(gulp.dest('dest'));
});

//压缩js的插件
gulp.task("jsTask", function(){
	gulp.src("js/*.js")
		.pipe(babel({"presets": ["es2015"]})) //es6转es5
		.pipe( uglify() ) //使用插件uglify
		.pipe( gulp.dest("dest/js") );
})

//压缩图片
gulp.task('imgTask', function(){
	gulp.src('images2/*')
	/*.pipe(imagemin({
		progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
		use: [pngquant()] //使用pngquant插件来深度压缩png图片
//		optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
//      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
	}))*/
	.pipe(gulp.dest('dest/images2'));
});
//默认任务
gulp.task("default", ["cssTask"]);