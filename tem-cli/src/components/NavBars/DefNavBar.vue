<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-row align="center">
        <v-col sm="11" class="d-inline-flex flex-row align-center">
          <router-link to="/">
            <img class="logo" src="../../assets/logo.png" />
          </router-link>
          <v-toolbar-title>فروشگاه تم</v-toolbar-title>
        </v-col>
        <v-col sm="1" class="d-inline-flex flex-row justify-end">
          <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-app-bar>

    <defdrawer></defdrawer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import DefNavDrawer from './common/DefNavDrawer';

export default {
  data: function() {
    return{
      ...mapState({
        drawer: 'drawer_open'
      })
    }
  },
  methods: {
    gotoHome: function() {
      this.$router.push('/');
    },
    gotoLogin: function() {
      this.$router.push('/login');
    },
    ...mapMutations([
      'openDrawer',
      'closeDrawer'
    ])
  },
  components: {
    defdrawer: DefNavDrawer
  },
  computed:{
    
  }
};
</script>

<style>
.logo {
  width: 110px;
  margin: -20px;
	margin-right: -35px;
  margin-top: -10px;
}
</style>