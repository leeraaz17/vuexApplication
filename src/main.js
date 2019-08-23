import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';
import { ADD_PRODUCT_TO_CART, CHECKOUT } from './mutation-types'

Vue.filter('currency', function(value) {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    
    return formatter.format(value);
});

Vue.use(Vuex);
Vue.use(VueResource);
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
        cart: {
            items:[]
        }
    },
    mutations: {
        //[CHECKOUT](state) {
        checkout(state) {
            state.cart.items.forEach(function(item) {
                item.product.inStock += item.quantity;
            });

            state.cart.items = [];
        },
        //[ADD_PRODUCT_TO_CART](state, payload) {
        addProductToCart(state, payload) {
            let cartItem = null;

            for( let i = 0; i < state.cart.items.length; i++) {
                if (state.cart.items[i].product.id === payload.product.id ){
                    cartItem = state.cart.items[i];
                }
            }


            if(cartItem != null ){
                cartItem.quantity += payload.quantity;
            }
            else {
                state.cart.items.push({
                    product: payload.product, 
                    quantity: payload.quantity
                });
            }

            payload.product.inStock -= payload.quantity;
        }
    },
    getters: {
        cartTotal: (state) => {
            let total = 0;

            state.cart.items.forEach(function(item) {
                total += item.product.price * item.quantity;
            });

            return total;
        },
        taxAmount: (state, getters) => (percentage) => {
            return ((getters.cartTotal * percentage ) / 100 );
        }
    }
});

Vue.http.options.root = 'http://localhost:3000';

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    store: store
});