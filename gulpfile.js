var gulp = require('gulp')
var sass = require('gulp-sass')
var notify = require('gulp-notify')

const NOTIF_DURATION = 1.5

// build and move sass
gulp.task('sass',() => {
  return gulp.src('dev/sass/main.sass') // Gets all files ending with .scss in app/scss
	.pipe(sass())
	.pipe(gulp.dest('app/public/css'))
  // .pipe(notify({
  //   title: 'sass built.',
  //   message: 'success',
  //   timeout: NOTIF_DURATION
  // }))
});

// build and move javascript
gulp.task('javascript', () => {
  console.log("Moving all files in styles folder");
  return gulp.src("dev/javascript/*.js")
    .pipe(gulp.dest('app/public/js'))
	// .pipe(notify({
 //    title: 'js moved.',
 //    message: 'success',
 //    timeout: NOTIF_DURATION
 //  }))
});

// watch all files
gulp.task('watch', () => {
  gulp.watch('dev/sass/*.sass', ['sass']); 
  gulp.watch('dev/javascript/*.js', ['js']); 
  // Other watchers
})
