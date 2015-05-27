var fis = module.exports = require('fis');

fis.cli.name = 'fis-dj';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    domain: 'http://static.dajia365.com',
    statics: '/public/static',
    templates: '/application/views',
    modules: {
        parser: {
            // 配置modules.parser插件
            sass: 'sass',
            scss: 'sass',
            jade: 'jade',
            coffee: 'coffee-script',
        },
        postprocessor: {
            // 使用AMD规范包裹代码
            js: 'amd',
            html: 'amd'
        },
        postpackager: ['autoload', 'simple'],
        lint: {
            js: 'jshint'
        }
    },
    roadmap: {
        domain: '${domain}',
        ext: {
            // sass后缀的文件将输出为css文件
            // 并且在parser之后的其他处理流程中被当做css文件处理
            sass: 'css',
            scss: 'css'
        },
        path: [
            {
                // 发布widget/page/lib里面的图片, 按照默认路径.
                reg: /^\/((?:widget|page|lib)\/.*\.(?:png|gif|jpg|ico))/i,
                release: '${statics}/$1',
                url: '/$1',
                useMap: true
            },
            {
                // 发布widget里面的css, 按照默认路径.
                reg: /^\/(widget\/.*\.(?:css|sass|scss))/i,
                release: '${statics}/$1',
                url: '/$1'
            },
            {
                // 发布widget/page/lib里面的css, 进行sprite处理, 并按照默认路径.
                reg: /^\/((?:page|lib)\/.*\.(?:css|sass|scss))/i,
                release: '${statics}/$1',
                useSprite: true,
                url: '/$1'
            },
            {
                // 一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
                // 直接引用为var $ = require('jquery');
                // 所有widget/page/modules目录下的js文件, 自动包裹成amd
                reg: /^\/((?:widget|page|modules)\/([^\/]+)\/\2\.js)/i,
                // 是组件化的，会被jswrapper包装
                isMod: true,
                // id为文件夹名
                id: '$2',
                release: '${statics}/$1',
                url: '/$1'
            },
            {
                // 所有widget/page/modules目录下的js文件, 自动包裹成amd
                reg: /^\/((?:widget|page|modules)\/(.*)\.js)/i,
                // 是组件化的，会被jswrapper包装
                isMod: true,
                // id是去掉modules和.js后缀中间的部分
                id: '$2',
                release: '${statics}/$1',
                url: '/$1'
            },
            {
                // 所有lib/js目录下的js文件, 保持原状
                reg: /^\/(lib\/js\/.*\.js)/i,
                release: '${statics}/$1',
                url: '/$1',
                useMap: false
            },
            {
                // pkg路径发布到public目录下
                reg: /^\/(pkg\/.*)/i,
                release: '${statics}/$1',
                url: '/$1',
                useMap: true
            },
            {
                //前端模板
                reg: '**.tpl',
                //当做类HTML处理
                isHtmlLike: true,
                //只是内嵌，不用发布
                release: false
            },
            {
                // 所有的页面文件发布到views目录下
                reg: /^\/page\/([^\/]+)\/\1\.html/i,
                useCache: false,
                release: '${templates}/$1'
            },
            {
                // map.json这个发布到根目录
                reg: 'map.json',
                release: '/$&'
            },
            {
                // 其他都默认不发布
                reg: '**',
                release: false
            },
        ]
    },
    settings: {
        parser: {
            jade: {
                filters: {
                    jadesrc: require('jade-highlighter')
                },
                pretty: true
            }
        },
        postpackager: {
            autoload: {
                type: 'requirejs',
                // useSiteMap设置使用整站/页面异步资源表配置，默认为false
                useSiteMap: true,
                // useInlineMap设置内联resourceMap还是异步加载resourceMap，默认为false
                useInlineMap: true,
                // 通过include属性将额外的资源增加入resourceMap中
                //include: /^\/somepath\//i,
                // 设置占位符
                //scriptTag: '<!--SCRIPT_PLACEHOLDER-->',
                //styleTag: '<!--STYLE_PLACEHOLDER-->',
                //resourceMapTag: '<!--RESOURCEMAP_PLACEHOLDER-->'
            },
            simple: {
                // 开启autoCombine可以将零散资源进行自动打包
                autoCombine: false,
                // 开启自动优化脚本与样式资源引用位置
                autoReflow: true
            }
        },
        spriter: {
            csssprites: {
                margin: 10
            }
        },
        lint: {
            jshint: {
                predef: [
                    'define',
                    'require',
                    'exports',
                    'module',
                    'JSON'
                ],
                es3: true,
                indent: 4,
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: false,
                immed: true,
                latedef: false,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                plusplus: false,
                regexp: false,
                undef: true,
                strict: false,
                trailing: true,
                unused: true,
                quotmark: 'single',
                asi: false,
                boss: true,
                debug: true,
                eqnull: true,
                esnext: true,
                evil: true,
                expr: true,
                funcscope: false,
                globalstrict: true,
                iterator: false,
                lastsemic: false,
                laxbreak: false,
                laxcomma: false,
                loopfunc: true,
                multistr: false,
                onecase: false,
                proto: false,
                regexdash: false,
                scripturl: true,
                shadow: true,
                smarttabs: false,
                sub: false,
                supernew: false,
                validthis: true,
                browser: true,
                couch: false,
                devel: false,
                dojo: false,
                jquery: false,
                mootools: false,
                node: false,
                nonstandard: false,
                prototypejs: false,
                rhino: false,
                wsh: false,
                nomen: false,
                onevar: false,
                passfail: false,
                white: false
            }
        }
    }
});

