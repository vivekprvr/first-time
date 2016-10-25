module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			},
			livereload: {
				files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
				options: {
					livereload: true
				}
			}
		},
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'nested'
			},
			dist: {
				files: {
					'css/style.css': 'sass/bootstrap.scss'
				}
			}
		},
		imagemin: {                          
		dynamic: {                         
		files: [{
		expand: true,                  
		cwd: 'img-lg/',                
		src: ['**/*.{png,jpg,gif}'],  
		dest: 'img/'                  
		}]
		}
		},
		  postcss: {
    options: {
      map: true, // inline sourcemaps 
 
      // or 
      map: {
          inline: false, // save all sourcemaps as separate files... 
          annotation: 'css/maps/' // ...to the specified directory 
      },
 
      processors: [
        require('pixrem')(), // add fallbacks for rem units 
        require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes 
        require('cssnano')() // minify the result 
      ]
    },
    dist: {
      src: 'css/*.css'
    }
  }
	
	});
	grunt.registerTask('default', ['sass:dist', 'watch','imagemin','postcss']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-livereload');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-postcss');
};

