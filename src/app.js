import Vue from 'vue'
import App from "./App.vue";
import './css/style.css';

import { VLazyImagePlugin } from "v-lazy-image";

Vue.use(VLazyImagePlugin);

import router from './router'

import {store} from './store'

new Vue({
        el: '#app',
        render: h => h(App),
    router,
    store
})
