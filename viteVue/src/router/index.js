import { createRouter, createWebHashHistory } from 'vue-router'


import Layout from "@/Layout/index.vue"
import Home from "../pages/Home.vue"
import About from "../pages/About.vue"
import Sudoke from "../pages/Sudoku.vue"
import Test from '../pages/Test.vue'
export const constantRoutes = [
    {
        path: "/home",
        component: Layout,
        redirect: '/home/',
        name: "Home",
        children: [
            {
                path: '',
                name: 'ReallyHome',
                component: Home
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
                component: About
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
                component: Test,
                name: "test",
            },
            {
                path: "sudoku",
                name: "sudoku",
                component: Sudoke
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