module.exports = function (grunt) {
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			sitecss: {
				options: {
					relativeTo: './app/resources',
					target: './dist',
					rebase: true
				},
				files: {
					/*'dist/mapa-digital-oficial.min.css': [
						'app/resources/styles/style.css'
					]*/
				}
			}
		},
		uglify: {
			options: {
				compress: true
			},
			applib: {
				src: [
				    /*'app/app.js',
				    'app/services/appDataServices.js',
				    'app/services/searchServices.js',
					'app/controllers/mainController.js'*/
				],
				dest: 'dist/mapa-digital-oficial.min.js'
			}
		}
	});
	// Default task.
	grunt.registerTask('default', ['uglify', 'cssmin']);
};
