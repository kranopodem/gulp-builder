'use strict';
var merge = require('merge-stream');
module.exports = function() {
  $.gulp.task('sprite', function() {
      var spriteData = $.gulp.src('./source/images/*.png').pipe($.gp.spritesmith({
          imgName: 'sprite.png',
          cssName: 'sprite.css'
      }));

      // Pipe image stream through image optimizer and onto disk
      var imgStream = spriteData.img
      // DEV: We must buffer our stream into a Buffer for `imagemin`
          .pipe($.gulp.dest($.config.root + '/assets/img'));

      // Pipe CSS stream through CSS optimizer and onto disk
      var cssStream = spriteData.css
          .pipe($.gp.csso())
          .pipe($.gulp.dest($.config.root + '/assets/css'));

      // Return a merged stream to handle both `end` events
      return merge(imgStream, cssStream);

})
};

