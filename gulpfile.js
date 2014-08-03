var gulp = require('gulp'),
	gutil = require('gulp-util'),
	watch = require('gulp-watch'),
	shell = require('gulp-shell'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-ruby-sass'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
    inquirer = require('inquirer'),
    template = require('gulp-template'),
	fs = require('fs'),
	path = require('path');

// Some constants, using package.json for portability 
var	pkg = require('./package.json'),
	siteConfig = pkg.siteConfig;
	sourcePath = siteConfig.sourcePath,
	assetsPath = siteConfig.assetsPath,
	assetsSourcePath = sourcePath + '/' + assetsPath,
	destPath = siteConfig.destPath,
	assetsDestPath = destPath + '/' + assetsPath,
	componentsPath = sourcePath + '/partials/components',
	// ui asset directory names
	cssDirectoryName = 'styles',
	fontsDirectoryName = 'fonts',
	jsDirectoryName = 'scripts',
	imagesDirectoryName = 'images',
	templatesDirectoryName = 'templates',

	jsIncludesFile = assetsSourcePath + "/" + jsDirectoryName + "/" + "_components.js";
	cssImportsFile = assetsSourcePath + "/" + cssDirectoryName + "/" + "component/_component.imports.scss";

/* ###########################################################
create a component file task
########################################################### */

gulp.task('new-component', function(done){

	var createTools = {
		// makes a directory for a given path
		mkdirSync : function(path, msg) {
			try {
				fs.mkdirSync(path);
				console.log(msg);
				return true
			} catch(e) {
				if ( e.code != 'EEXIST' ) throw e;
				return false
			}
		},
		// this method validates inquirer type: input
		validateInput : function(checkObj) {
			var time = 500;
			if(checkObj.time) {
				time = checkObj.time
			}
			setTimeout(function(){
				if (checkObj.input == null || checkObj.input == "") {
					// Pass the return value in the done callback
					checkObj.done(checkObj.msg);
					return;
				}
				// Pass the return value in the done callback
				checkObj.done(true);
			}, time);
		}
	}

	inquirer.prompt([
		
		{
			type: 'input',
			name: 'name',
			message: 'Please provide a name for your component',
			validate: function(input) {
				// Declare function as asynchronous, and save the done callback
				var done = this.async();
				// pass to function that checks input is not empty
				createTools.validateInput({ 
					done: done,
					input: input,
					time: 500, 
					msg: "You need to provide a valid name!"
				})
			}
		},

		{
			type: 'list',
			name: 'jsfile',
			message: 'Does this component need a Javascript file?',
			choices : [
				"yes",
				"no"
			]
		},
		
		{
			type: 'list',
			name: 'cssfile',
			message: 'Does this component need a Sass file?',
			choices : [
				"yes",
				"no"
			]
		}
		
	],
	function (answers) {

		// this creates the component dir, if it exists it will return false
		var dir = createTools.mkdirSync(path.join(componentsPath + '/' + answers.name), "Created directory: '" + path.join(componentsPath + '/' + answers.name) + "'");

		if(dir == true) {
			
			if(answers.jsfile == "yes") {
				var jsFilePath = componentsPath + '/' + answers.name + '/' + answers.name + '.js';
				fs.createReadStream('app/templates/component.js').pipe(fs.createWriteStream(jsFilePath));
				console.log("Created: " + jsFilePath);
				jsIncludesFileOpen = fs.createWriteStream(jsIncludesFile, {'flags': 'a'});
				jsIncludesFileOpen.write('//= require "../../partials/components/' + answers.name + '/' + answers.name + '.js"\n');
				console.log("Add sprockets require statement to: " + jsIncludesFile);
			} else {
				console.log("JS file was not created.");
			}

			if(answers.cssfile == "yes") {
				var cssFilePath = componentsPath + '/' + answers.name + '/_' + answers.name + '.scss';
				fs.createReadStream('app/templates/_component.scss').pipe(fs.createWriteStream(cssFilePath));
				cssImportsFileOpen = fs.createWriteStream(cssImportsFile, {'flags': 'a'});
				cssImportsFileOpen.write('@import "../../partials/components/' + answers.name + '/' + answers.name + '";\n');
				console.log("Created: " + cssFilePath);
				console.log("Included component sass into: " + cssImportsFile);
			} else {
				console.log("Sass file was not created.");
			}

		} else {
			console.log("There was an error, most probably component name already exists!");
		}
	});
});

/* ###########################################################
overall watch task
########################################################### */

	// gulp.task('watch', function() {
	// 	// gulp.watch(sourcePath + '/' + templatesDirectoryName + '/**/*.html', ['process-html']);
	// 	// gulp.watch(uiSourcePath + '/' + jsDirectoryName + '/**/*.js', ['process-js']);
	// 	// gulp.watch(uiSourcePath + '/' + cssDirectoryName + '/**/*.scss', ['process-css']);
	// });

/* ###########################################################
base tasks 
########################################################### */

// log out some variables for easy reading
gulp.task('vars', function(){
	console.log("\n");
	console.log("##########################");
	console.log("siteConfig object:");
	console.log("##########################");
	console.log(siteConfig);
	console.log("##########################");
	console.log("\n");
});

// run a local middleman server
gulp.task('server', shell.task([
  'bundle exec middleman server -p1234'
]));

// run a local middleman server
gulp.task('mm-build', shell.task([
  'bundle exec middleman build --verbose --clean'
]));

gulp.task('build',['mm-build'], function(){
	console.log("something else");
})

gulp.task('default', function(){
	console.log("default not setup yet!");
});