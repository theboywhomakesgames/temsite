import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,
  theme: {
    //dark: true,
    themes: {
      light: {
        primary: "#1a1a1d",
        secondary: "#c3073f",
        accent: "#950740",
        error: "#ff5722",
        warning: "#ff9800",
        info: "#bd9b57",
        success: "#8bc34a",
        background: "#242582"
      },
    },
  },
});
