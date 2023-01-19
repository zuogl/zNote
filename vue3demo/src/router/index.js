import {createRouter,createWebHashHistory} from 'vue-router' 

import Home from "../pages/Home.vue"
import About from "../pages/About.vue"
import Sudoke from "../pages/Sudoku.vue"

const routes = [
    {
        path:"/",
        name:"Home",
        component:Home
    },
    {
        path:"/about",
        name:"About",
        component:About
    },
    {
        path:"/sudoku",
        name:"sudoku",
        component:Sudoke
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router