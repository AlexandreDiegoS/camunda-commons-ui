var persistify = require('persistify');
var _ = require('lodash');

module.exports = function(grunt) {
  'use strict';
  var path = require('path');

  grunt.registerMultiTask('persistify', function() {

    var firstRun = true;

    var done = this.async();
    this.data.options.browserifyOptions.transform = this.data.options.transform;
    var b = persistify( this.data.options.browserifyOptions, this.data.options );

    b.add( this.data.src );

    b.on( 'bundle:done', function ( time ) {
      // console.log( 'time', time );
    } );

    b.on( 'error', function ( err ) {
      console.log( 'error', err );
    } );
    var dest = this.data.dest;
    var opts = this.data.options;

    function bundleComplete(err, buff) {
        if ( err ) {
          throw err;
        }
        require( 'mkdirp' )(dest.substr(0, dest.lastIndexOf('/')), function(err) {
          if(err) {
            throw err;
          }
          require( 'fs' ).writeFileSync( dest, buff.toString() );
          if(firstRun) {
            firstRun = false;
            done();
          }
        });
    }

    function doBundle(cb) {
      b.bundle( function ( err, buff ) {
        if (opts.postBundleCB) {
          opts.postBundleCB(err, buff, bundleComplete);
        }
        else {
          bundleComplete(err, buff);
        }
      });
    };

    doBundle();

    b.on( 'update', function () {
      doBundle();
    } );
  });
};