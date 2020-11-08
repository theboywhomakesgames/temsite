import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

import vueCookies from 'vue-cookies';
Vue.use(vueCookies);

import store from './plugins/vuex';

import Home from './components/Routes/Home';
import Login from './components/Routes/Login';
import Dashboard from './components/Routes/Dashboard/Dashboard';
import ShopSettings from './components/Routes/Dashboard/ShopSettings';
import Store from './components/Routes/Stores/Store';
import Item from './components/Routes/Stores/Items/ItemDetails';
import NavBar from "./components/NavBars/NavBar";
import NotFound from './components/Common/404';
import CartPage from './components/Routes/Cart';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path : '/login', components: {
        default: Login,
        nav: NavBar,
        inApp: Login,
      }
    },
    {
      path: '/dashboard/shopsettings', components: {
        nav: NavBar,
        inApp: ShopSettings
      } 
    },
    {
      path: '/dashboard', components: {
        nav: NavBar,
        inApp: Dashboard
      }
    },
    {
      path: '/store/:user/item/:item', components: {
        nav: NavBar,
        inApp: Item
      }
    },
    {
      path: '/store/:user', components: {
        nav: NavBar,
        inApp: Store
      }
    },
    {
      path: '/cart', components: {
        nav: NavBar,
        inApp: CartPage
      }
    },
    {
      path : '/', components: {
        default: Home,
        nav: NavBar,
        inApp: Home,
      }
    },
    {
      path: '*', components: {
        nav: NavBar,
        inApp: NotFound
      }
    }
  ]
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');