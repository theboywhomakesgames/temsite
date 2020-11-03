<template>
  <v-app>
    <navbar></navbar>
    <v-main> Router should be here </v-main>
    <my-footer> </my-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default {
  data: () => ({}),
  components: {
    navbar: NavBar,
    "my-footer": Footer,
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
  direction: rtl;
  font-family: vazir;
}
</style>
