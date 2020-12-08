import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,
  theme: {
    //dark: true,
    themes: {
      light: {
        primary: "#e85a4f",
        secondary: "#d8c3a5",
        accent: "#8e8d8a",
        error: "#ff5722",
        warning: "#ff9800",
        info: "#bd9b57",
        success: "#8bc34a"
      },
    },
  },
});
