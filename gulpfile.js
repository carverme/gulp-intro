//<--------Defining variables--------->

//This tells Node to look into node_mods for the package gulp.
var gulp = require('gulp');
//This, below, requires the gulp-sass plugin..
var sass = require('gulp-sass');
//This, below, requires the Browser Sync package...
var browserSync = require('browser-sync').create();




//<------------functions and such------------>
//When writing a gulp task, the syntax is like:
//gulp.task('task-name', function() {
//Stuff here...
//})


//This is a basic console log, that can be run in the terminal with the command of 'gulp hello'
// gulp.task('hello', function(){
//   console.log('Hello Zell');
// });

//This sends src files through sass, and return them to the destination file, styles.scss.
// gulp.task('sass', function() {
//   return gulp.src('source-files')
//     .pipe(sass()) //using gulp-sass
//     .pipe(gulp.dest('destination'))
// });
// looking like this after adding source files...

// gulp.task('sass', function(){
//   return gulp.src('app/scss/styles.scss')
//     .pipe(sass()) //Converts Sass to Css with gulp-Sass
//     .pipe(gulp.dest('app/css'))
// });

//adding a test to styles.scss, and then running the command 'gulp sass',
//returns a percentage value in a new css file.

//Gulp-sass uses LibSass to convert Sass into Css, which is quicker than Ruby-based methods,
//but you can use ruby-based methods with 'gulp-ruby-sass' or 'gulp-compass'.

//**Globbing in Node**//
//We can change the file location using Globbing, see readme.md..

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') //Gets all files ending with .scss in app/scss and children dirs.
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//With this change, from the previous iteration of code, any other Sass file found within app/scss would be automatically included into the sass task with this change.

//**Watching Sass files for changes**
//Gulp watch syntax
//gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
//to watch all the sass files, and run the sass cmd when a sass file is saved... we replace this with...
//gulp.watch('app/scss/**/*.scss', ['sass']);
//to group multiple watch processes together, and watch more than one type of file at once.

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    //Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    //other watchers
});

//running 'gulp watch' cmd, Gulp will start watching immediately.
//and will run the sass task, whenever a .scss file is saved.

//**live-reloading with browser sync**
//spins up a web server, helps us do live-reloading easily, and can sychronizing actions across multiple devices
//Install first... 'npm i browser-sync --save-dev'.
//require browserSync at the top of this file.
//then create browsersync task to enable Gulp to spin up a server using browser sync...
//and allow bs to know where the root of the server should be.. in the 'app' folder:

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

//must also change sass task so bs can inject new css styles/update the css, into the browser whenever the sass is ran.
//in the gulp.task, we add the .pipe(browserSync.reload({ stream: true})).
//We need to run watch and bs at the same-time, we get gulp to run them together, telling the watch that bs must be completed first..
//then by adding a second argument to the watch task...syntax follows:

//gulp.task('watch', ['array', 'of', 'tasks'], function (){
  //etc...
//})
