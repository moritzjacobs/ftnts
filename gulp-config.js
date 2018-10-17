const imagemin = require("gulp-imagemin");
const browserlist = ["> 0.1%"];

module.exports = {
	css: {
		scss: {
			config: {
				outputStyle: "compressed" // nested, compact, expanded and compressed are available options
			}
		},

		sourcemaps: {
			enabled: "dev"
		},

		autoprefixer: {
			enabled: true,
			config: {
				browsers: browserlist
			}
		},

		cleanCss: {
			enabled: true,
			config: {
				compatibility: "ie8"
			}
		}
	},

	js: {
		sourcemaps: {
			enabled: "dev"
		},
		browserify: {
			enabled: true
		},

		babeljs: {
			enabled: true,
			config: {
				minified: false,
				presets: [
					[
						"@babel/preset-env",
						{
							targets: {
								browsers: browserlist
							}
						}
					]
				]
			}
		}
	},

	clean: {
		enabled: "dist",
		paths: ["./public/**/*.map", "./src/tmp"]
	},

	images: {
		imagemin: {
			enabled: true,
			config: [
				imagemin.gifsicle({ interlaced: true }),
				imagemin.jpegtran({ progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({ plugins: [{ removeViewBox: true }] })
			]
		}
	},

	svg: {
		svgmin: {
			enabled: true,
			config: {}
		}
	},

	favicons: {
		enabled: true,
		themeColor: "#cafe23",
		iconsPath: "./",
		appName: "FoobarBaz"
	},

	paths: {
		// "DESTINATION" : ['SOURCE']
		css: {
			"./public/css/": ["./src/scss/**/*.scss"]
		},
		js: {
			"./public/js/mce.js": ["./src/js/mce.js"],
			"./public/js/public.js": ["./src/js/public.js"]
		},
		jsWatch: {
			"./src/tmp/js-bundle.js": ["./src/js/**/*.js"]
		},

		images: {
			"./public/img/": ["./src/img/**/*.jpeg", "./src/img/**/*.jpg", "./src/img/**/*.png", "./src/img/**/*.gif"]
		},
		svg: {
			"./public/img/": ["./src/img/**/*.svg"]
		},
		copy: {
			"./public/fonts/": ["./src/fonts/**/*.*"]
		},
		favicons: {
			"./public/favicons/": ["./src/favicons/**/*.png"]
		}
	},

	// All tasks above are available (css, js, images and svg)
	combinedTasks: {
		dist: ["js", "images", "svg", "css", "copy", "clean"],
		default: [["dist", "watch"]]
	},

	watchTask: {
		images: ["images"],
		svg: ["svg"],
		css: ["css"],
		jsWatch: ["js"],
		js: ["js"],
		copy: ["copy"]
	}
};
