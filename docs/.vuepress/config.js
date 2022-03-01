const fs = require('fs')
const glob = require('glob')
const path = require('path') // 引入node的path模块
const getSidebar = () => {
    const entryFiles = glob.sync(path.join(__dirname, '../*/*.md')).map((item) => {
        return item.split('docs/')[1]
    }).reduce((acc, cur) => {
        let key = "/" + cur.split('/')[0] + "/"
        let value = cur.split('/')[1].split('.')[0]
        if (!acc[key]) {
            acc[key] = []
            value === 'README' ? acc[key].unshift('') : acc[key].push(value)
            return acc
        } else {
            value === 'README' ? acc[key].unshift('') : acc[key].push(value)
            return acc
        }
    }, {})

    return entryFiles

    // console.log("entryFiles", entryFiles)

}
let sidebar = getSidebar()
module.exports = {
    title: '小左同学的笔记',
    description: '小左同学的前端笔记',
    base: '/zblog/',
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
            {
                text: "前端",
                items: [
                    { text: 'Mini', link: '/Mini/' },
                    { text: 'Vue', link: '/Vue/' },
                    { text: 'React', link: '/React/' },
                    { text: 'Webpack', link: '/Webpack/' },
                ]
            },
            {
                text: "后端",
                items: [
                    { text: 'SQL', link: '/SQL/' },
                ]
            },
            {
                text: "技术之外", link: '/NonTechnical/'
            },
            {
                text: '联系我',
                items: [
                    { text: 'Github', link: 'https://github.com/zuogl' },
                    { text: '掘金', link: 'https://juejin.cn/user/2410556908897272' }
                ]
            }
        ],
        sidebar,
        subSidebar: 'auto', //reco主题开启右侧标题列表
        blogConfig: {
            tag: {
                location: 2,     // 在导航栏菜单中所占的位置，默认3
                text: 'Tag'      // 默认文案 “标签”
            }
        }
    },
    locales: {
        '/': {
            lang: 'zh-CN' //修改vuepress的默认语言为中文
        }
    },
}