import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer_open: false,
    login_dialog_open: false,
    authObj: { isAuth: false },
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
    }
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
    logout: function({commit, dispatch}){
      axios.get('/api/auth/logout')
      .then(result => {
        dispatch('checkAuth');
      })
      .catch(err => {
        console.log(err);
      });
    },
    getItemsOf: function({commit}, data){
      return axios.post('/api/ap/getItemsOf', data);
    }
  }
});