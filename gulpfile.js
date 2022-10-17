const gulp = require('gulp');

gulp.task('default', () => gulp.src('./src/database/sql/*/*.sql')
  .pipe(gulp.dest('./build/database/sql')));
