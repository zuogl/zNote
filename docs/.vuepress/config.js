module.exports = {
    title: '小左同学的笔记',
    description: '小左同学的前端笔记',
    base:'/zblog/',
    theme: 'reco',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            // {
            //     text: '前端三件套',
            //     items: [
            //         { text: 'HTML', link: '/' },
            //         { text: 'CSS', link: '/' },
            //         { text: 'JavaScript', link: '/' }
            //     ]
            // },
            { text: 'Vue', link: '/Vue/' },
            { text: 'React', link: '/React/' },
            { text: 'Webpack', link: '/Webpack/' },
            {
                text: '联系我',
                items: [
                    { text: 'Github', link: 'https://github.com/zuogl' },
                    { text: '掘金', link: 'https://juejin.cn/user/2410556908897272' }
                ]
            }
        ],
        sidebar: {
            '/React/': [
                '',
                'test01',
                'test02'
            ],
            '/Vue/': [
                '',
                'test01',
                'Vuemd'
            ],
            '/Webpack/': [
                '',
                'jichu',
                'jinji'
            ],
        },
        subSidebar: 'auto', //reco主题开启右侧标题列表
    },
    locales: {
        '/': {
            lang: 'zh-CN' //修改vuepress的默认语言为中文
        }
    },
}