import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/pages/Home";
import PhotoCard from "@/pages/PhotoCard";

Vue.use(VueRouter)

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        { path: '/photos/:id', component: PhotoCard }
    ],
});
export default router
