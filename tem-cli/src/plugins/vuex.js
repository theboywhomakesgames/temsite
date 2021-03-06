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
    wrong_login: 0,
    err: "مشکل ارتباط با اینترنت"
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
      let newCart = [];
      for(let i = 0; i < state.cart.length; i++){
        if(!payload.includes(i)){
          newCart.push(state.cart[i]);
        }
      }
      state.cart = newCart;
      console.log(state.cart);

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
      state.wrong_login = 0;
      axios.post('/api/auth/attempt', {...data})
      .then(result => {
        commit('setAuthObj', result.data);
        commit('setLoginDialog', { val: !state.authObj.isAuth });
        if(!result.data.success){
          state.wrong_login = 1;
          state.err = result.data.err_message;
        }
        else{
          state.wrong_login = 0;
        }
      })
      .catch(err => {
        console.log(err);
        state.wrong_login = 1;
        state.err = "مشکل در ارتباط با سرور";
      });
    },
    registerNewUser: function({ commit, state, dispatch }, data){
      state.wrong = 0;
      axios.post('/api/reg', {...data})
      .then(result => {
        dispatch('checkAuth', {cb: () => commit('setLoginDialog', { val: !state.authObj.isAuth })});
        if(!result.data.success){
          state.wrong = 1;
          state.err = result.data.err_message;
        }
      })
      .catch(err => {
        console.log(err);
        state.wrong = 1;
        state.err = "مشکل در ارتباط با سرور";
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
    },
    placeOrder : function({ commit, state }, address){
      if(state.cart.length > 0 && state.authObj.isAuth){
        return axios.post('/api/ap/placeOrder', {
          buyer: state.authObj.username,
          cart: [...state.cart],
          address: address.address,
          zipcode: address.zipcode,
          city: address.city
        });
      }
    },
    getMyOrders: ({state}) => {
      return axios.post('/api/ap/getOrdersOf', {username: state.authObj.username});      
    },
    getMySales: ({state}) => {
      return axios.post('api/ap/getSalesOf', {username: state.authObj.username});
    },
    getMyBalance: ({state}) => {
      return axios.post('api/ap/getBalanceOf', {username: state.authObj.username});
    },
    getMyAddresses: ({state, dispatch}) => {
      return axios.post('api/ap/getAddressesOf', {username: state.authObj.username});
    },
    addNewAddress: ({state}, addresses) => {
      return axios.post('api/ap/addAddress', {username: state.authObj.username, addresses: addresses});
    },
    createTicket: ({state}, data) => {
      return axios.post('api/ap/createTicket', data);
    },
    replyToTicket: ({state}, data) => {
      return axios.post('api/ap/replyToTicket', data);
    }
  }
});