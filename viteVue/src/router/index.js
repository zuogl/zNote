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
        children: [
            {
                path: '',
                name: "Home",
                component: Home
            }
        ]
    },
    {
        path: "/about",
        component: Layout,
        redirect: '/about/',
        children: [
            {
                path: "",
                name: "About",
                component: About
            }
        ],

    },

    {
        path: "/test",
        component: Layout,
        redirect: '/test/',
        children: [
            {
                path: '',
                component: Test,
                name: "test",
                children: [
                    {
                        path: "sudoku",
                        name: "sudoku",
                        component: Sudoke
                    },
                ]
            }

        ],

    },

]

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes:constantRoutes
})

export default router