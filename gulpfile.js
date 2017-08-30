// gulp.js 

//导入所需要的工具包require('node_modules'里对应的模块)
var gulp = require('gulp'),
	sass = require('gulp-sass'),	//引入sass文件编译css插件
	less = require('gulp-less'),	//引入less文件编译css插件
	htmlmin = require('gulp-htmlmin'),	//引入压缩html插件
	concat = require("gulp-concat"),	//引入合并js插件
	uglify = require("gulp-uglify"),	//引入压缩js插件
	minifyCss = require('gulp-minify-css');	//引入压缩css插件


//将less文件编译成css，然后将编译后的css文件压缩
gulp.task('testCssMin',function(){
	gulp.src("src/css/*.less")
	.pipe(less())//将less编译成css
	.pipe(minifyCss())	//css文件压缩
	.pipe(gulp.dest('dist/css'))	//存放css
})
//将JS文件先合并，再压缩
gulp.task('testJSMin',function(){
	gulp.src("src/js/*.js")
	.pipe(concat("index.js"))	//合并后的js文件名
	.pipe(uglify())		//压缩合并后的js
	.pipe(gulp.dest('dist/js'))	//最后放在dist/js里面
})

//将html文件压缩
gulp.task('testHtmlMin',function(){
	var options = {
		removeComments:true,	//清除HTML注释
		collapseWhitespace:true,	//压缩HTML
		collapseBooleanAttributes:true,//省略布尔属性的值
		//<input checked="true"/> ==> <input/>
		removeEmptyAttributes:true,//删除所有空格作属性值
		// <input id=""/> ==> <input/>
		removeScriptTypeAttributes:true,//删除<script>的type的"text/javascript"
		removeStyleLinkTypeAttributes:true,//删除<style>和<link>的type="type/css"
		minifyJS: true,	//压缩页面js
		minifyCSS: true	//压缩页面css	
	};
	gulp.src('src/html/*.html')	//获取该任务需要的文件
	.pipe(htmlmin(options))			//该任务调用的模块
	.pipe(gulp.dest('dist'));	//将在dist文件夹中生产成压缩后的detail.html和index.html
});

//默认的任务代码放这里
gulp.task('default',['testJSMin','testHtmlMin','testCssMin']);




	

////sass 任务 编译成css
//gulp.task('testSass',function(){
////	return gulp.src('src/css/test.scss')
//	gulp.src('src/css/*.scss')//获取该任务需要的文件
//	.pipe(sass())			//该任务调用的模块
//	.pipe(gulp.dest('dist/css'));	//将在dist/css 文件夹中生产test.css
//})

//监听文件
//gulp.task('watch1',function(){
//	return gulp.watch('src/css/test.scss',['testSass']);
//	//监听src/css/test.scss文件，修改时自动执行sass任务
//})