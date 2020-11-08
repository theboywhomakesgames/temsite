import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer_open: false,
    login_dialog_open: false,
    authObj: { isAuth: false, username: "" },
    cart: [],
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
    },
    setAuthObj (state, authObj){
      state.authObj = authObj;
    },
    addToCart (state, {payload, cookie}){
      // payload is and array
      state.cart = _.uniqWith(state.cart.concat(payload), (first, second) => {
        return first._id === second._id && first.count === second.count && first.size === second.size && first.color === second.color;
      });
      console.log("adding to cart");
      cookie.set("cart", {items: state.cart});
    },
    removeFromCart (state, {payload, cookie}){
      for(let i = 0; i < payload.length; i++){
        if(state.cart.length > 1)
          state.cart = state.cart.splice(parseInt(payload[i]), 1);
        else{
          state.cart = [];
        }
      }
      console.log("removed from cart");
      cookie.set("cart", {items: state.cart});
    },
  },
  actions: {
    checkAuth: function({ commit }, payload){
      axios.get('/api/auth/isauth')
      .then(result => {
        commit('setAuthObj', result.data);
        if(payload && payload.cb){
          payload.cb();
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    attemptLogin: function({ commit, state }, data){
      axios.post('/api/auth/attempt', {...data})
      .then(result => {
        commit('setAuthObj', result.data);
        commit('setLoginDialog', { val: !state.authObj.isAuth });
      })
      .catch(err => {
        console.log(err);
      });
    },
    registerNewUser: function({ commit, state, dispatch }, data){
      axios.post('/api/reg', {...data})
      .then(result => {
        dispatch('checkAuth', {cb: () => commit('setLoginDialog', { val: !state.authObj.isAuth })});        
      })
      .catch(err => {
        console.log(err);
      });
    },
    logout: function({commit, dispatch, state}){
      axios.get('/api/auth/logout')
      .then(result => {
        state.authObj.username = "";
        state.authObj.isAuth = false;
        state.authObj.isSeller = false;
        dispatch('checkAuth');
      })
      .catch(err => {
        console.log(err);
      });
    },
    getItemsOf: function({commit}, data){
      return axios.post('/api/ap/getItemsOf', data);
    },
    getAllItems: function({commit}, data){
      return axios.post('/api/ap/getItems', data);
    },
    addItemToUser: function({commit}, data){
      return axios.post('/api/ap/addItemToUser', data);
    },
    removeItemsFromUser: function({commit}, data){
      return axios.post('/api/ap/removeItemsFromUser', data);
    },
    fetchCookies ({state, commit}, {cookie}){
      try{
        setTimeout(
          () => {
            console.log(cookie.isKey("cart"));
            commit('addToCart', {payload: [...cookie.get("cart").items], cookie});
          },
          1000
        );
      }
      catch(err){
        console.log(err);
      }
    }
  }
});