import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css";
import vuetify from './plugins/vuetify';

Vue.use(Vuetify, {
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  }
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')