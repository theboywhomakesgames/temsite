import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#006e4f",
        secondary: "#74b9d4",
        accent: "#cca121",
        error: "#ff5722",
        warning: "#ff9800",
        info: "#bd9b57",
        success: "#8bc34a"
      },
    },
  },
});
