module.exports = function(grunt) {
    //初始化配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //增加监听插件 1
        watch: {
            wjs: { //用于监听js文件,当改变时自动压缩检查语法并压缩js文件
                files: ['build/js/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    livereload: true
                }
            },
            wcoffee: { //用于监听coffee文件,当改变时自动编译成js文件
                files: ['src/coffee/*.coffee'],
                tasks: ['coffee'],
                options: {
                    livereload: true
                }
            },
            wjade: { //用于监听jade文件,当改变时自动编译成html文件
                files: ['src/jade/*.jade'],
                tasks: ['jade'],
                options: {
                    livereload: true
                }
            },
            wless: { //用于监听less文件,当改变时自动编译成css文件
                files: ['src/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            wcss: { //用于监听css文件,当改变时自动压缩css文件
                files: ['build/css/*.css'],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            }
        },
        //语法检查 2
        jshint: {
            //需要检查的文件
            build: ['Gruntfile.js', 'build/js/*.js'],
            options: {
                //语法检查配置文件
                jshintrc: '.jshintrc'
            }
        },
        //css压缩 3
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/min',
                    ext: '.min.css'
                }]
            }
        },
        //配置coffee 4
        coffee: {
            compile: {
                options: {
                    bare: true
                }
            },
            main: {
                expand: true,
                flatten: true,
                cwd: 'src/coffee', //编译src/coffee目录中的.coffee文件
                src: '*.coffee',
                ext: '.js',
                dest: 'build/js' //输出到build/js目录下
            }
        },
        //配置编译 less 5
        less: {
            main: {
                expand: true,
                cwd: 'src/less', //相对路径
                src: ['*.less'], //目标文件
                dest: 'build/css', //输出路径
                ext: '.css' //后缀名
            },
            dev: {
                options: {
                    compress: true,
                    yuicompress: false
                }
            }
        },
        //html 模板 6
        jade: {
            compile: {
                options: {
                    data: {}
                },
                files: [{
                    expand: true,
                    cwd: 'src/jade',
                    src: ['*.jade'],
                    dest: 'build/html',
                    ext: '.html'
                }]
            }
        },
        //js压缩 7
        uglify: {
            //文件头部输出信息
            options: {
                banner: '/*! xubowen@163.com <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            target: {
                files: [{
                    expand: true,
                    //相对路径
                    cwd: 'build/js',
                    src: '*.js',
                    dest: 'build/js/min/',
                    ext: '.min.js'
                }]
            }
        },
        imagemin: {  
                /* 压缩图片大小 */  
                dist: {  
                    options: {  
                        optimizationLevel: 3 //定义 PNG 图片优化水平  
                    },  
                    files: [  
                           {  
                        expand: true,  
                        cwd: 'src/image/',  
                        src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片  
                        dest: 'build/image/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示  
                        }  
                        ]  
                    }  
                }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('img', ['imagemin']);//grunt img 独立执行图片压缩
     grunt.registerTask('minjs', ['uglify']);//grunt minjs 独立执行js压缩
    //注册任务
    grunt.registerTask("default", ['jade', 'less', 'cssmin', 'coffee', 'jshint', 'uglify', 'watch']);
};