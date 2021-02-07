import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/pages/Home";
import PhotoCard from "@/pages/PhotoCard";
import UserCard from "@/pages/UserCard";
import CollectionCard from "@/pages/CollectionCard";

Vue.use(VueRouter)

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/photos/:id',
            name: 'PhotoCard',
            component: PhotoCard
        },
        {
            path: '/users/:username',
            name: 'UserCard',
            component: UserCard
        },
        {
            path: '/collections/:id',
            name: 'CollectionCard',
            component: CollectionCard
        },
    ],
});
export default router
