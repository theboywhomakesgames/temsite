<template>
  <div id="app">
    <v-app>
      <router-view name="nav"> </router-view>
      <v-main>
        <router-view name="inApp"> </router-view>
      </v-main>
      <my-footer> </my-footer>
    </v-app>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import { mapActions, mapMutations } from "vuex";

export default {
  data: () => ({}),
  components: {
    "my-footer": Footer,
  },
  methods: {
    ...mapActions(['checkAuth', 'fetchCookies']),
    doFetchCookies() {
      this.fetchCookies({ cookie: this.$cookies })
    }
  },
  mounted() {
    this.checkAuth();
    this.doFetchCookies();
  },
};
</script>

<style>
@font-face {
  font-family: yekan;
  src: url("./plugins/yekan-font/yekan-regular.ttf");
}

@font-face {
  font-family: vazir;
  src: url("./plugins/vazir-font/Vazir-Light.ttf");
}

* {
  font-family: vazir;
}

.full-widther{
  width: 100%;
}
</style>
