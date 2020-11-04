import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import Home from './components/Routes/Home';
import Login from './components/Routes/Login';
import Dashboard from './components/Routes/Dashboard/Dashboard';
import Store from './components/Routes/Stores/Store';
import Item from './components/Routes/Stores/Items/Item';
import DefNavBar from "./components/NavBars/DefNavBar";
import DashboardNavBar from "./components/NavBars/DashboardNavBar";
import NotFound from './components/Common/404';

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  state: {
    drawer_open: false,
    login_dialog_open: false,
    authObj: null,
  },
  mutations: {
    openDrawer (state) {
      state.drawer_open = true;
    },
    closeDrawer (state) {
      state.drawer_open = false;
    },
    toggleLoginDialog (state) {
      state.login_dialog_open = !state.login_dialog_open;
    },
    setLoginDialog (state, payload) {
      state.login_dialog_open = payload.val;
    }
  }
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path : '/login', components: {
      default: Login,
      nav: DefNavBar,
      inApp: Login,
    }},
    {
      path: '/dashboard', components: {
        nav: DashboardNavBar,
        inApp: Dashboard
      }
    },
    {
      path: '/store/:user/item/:item', components: {
        nav: DefNavBar,
        inApp: Item
      }
    },
    {
      path: '/store/:user', components: {
        nav: DefNavBar,
        inApp: Store
      }
    },
    {
      path : '/', components: {
        default: Home,
        nav: DefNavBar,
        inApp: Home,    
      }
    },
    {
      path: '*', components: {
        nav: DefNavBar,
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