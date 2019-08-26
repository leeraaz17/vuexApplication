import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            };
        }
        
        if (savedPosition) {
            return savedPosition;
        }
        
        return { x: 0, y: 0 };
    }
});

const store = new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        }
    }
});

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    store: store
});