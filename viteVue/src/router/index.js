import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/Layout/index.vue"

export const constantRoutes = [
    {
        path: "/home",
        component: Layout,
        redirect: '/home/',
        name: "Home",
        meta:{icon:'House'},
        children: [
            {
                path: '',
                name: 'ReallyHome',
                component:() => import('@/pages/Home.vue'), 
            }
        ]
    },
    {
        path: "/about",
        component: Layout,
        redirect: '/about/',
        name: "About",
        children: [
            {
                path: "",
                name: 'ReallyAbout',
                component: ()=> import('@/pages/About.vue'),
            }
        ],

    },
    {
        path: "/test",
        component: Layout,
        redirect: '/test/',
        name: "Double",
        children: [
            {
                path: '',
                component: () => import('@/pages/Test.vue'),
                name: "test",
            },
            {
                path: "sudoku",
                name: "sudoku",
                component: () => import('@/pages/Sudoku.vue'),
            },

        ],

    },
    {
        path: "/chart",
        component: Layout,
        redirect: '/chart/',
        name: "Chart",
        children: [
            {
                path: '',
                component: () => import('@/pages/Charts/chart1.vue'),
                name: "chart1",
            },
            {
                path: "chart2",
                name: "chart2",
                component: () => import('@/pages/Charts/chart2.vue'),
            },
            {
                path: "/chart/bar", // 当某个路由有children属性时，其path必须从/开始写，否则会出现路由跳转错乱的问题！
                name: "Bar",
                component: () => import('@/pages/Charts/Bar/bar1.vue'),
                redirect: '/chart/bar/',
                children: [
                    {
                        path: "",
                        name: "Bar2",
                        component: () => import('@/pages/Charts/Bar/bar2.vue'),
                    },
                    {
                        path: "bar3",
                        name: "Bar3",
                        component: () => import('@/pages/Charts/Bar/bar3.vue'),
                    },
                ]
            },
            {
                path: "/chart/pie", 
                name: "Pie",
                component: () => import('@/pages/Charts/Pie/index.vue'),
                redirect: '/chart/pie/',
                children: [
                    {
                        path: "",
                        name: "Pie1",
                        component: () => import('@/pages/Charts/Pie/Pie1.vue'),
                    },
                    {
                        path: "/chart/pie/pie2",
                        name: "PieChild",
                        component: () => import('@/pages/Charts/Pie/Pie2.vue'),
                        redirect: '/chart/pie/pie2/',
                        children: [
                            {
                                path: "",
                                name: "PieChild1",
                                component: () => import('@/pages/Charts/Pie/Pie2Child/Pie2Child1.vue'),
                            },
                            {
                                path: "pie2Child2",
                                name: "Pie2Child2",
                                component: () => import('@/pages/Charts/Pie/Pie2Child/Pie2Child2.vue'),
                            },
                        ]
                    },
                ]
            },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

export default router