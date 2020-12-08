<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-row align="center">
        <v-col sm="9" class="d-inline-flex flex-row align-center">
          <router-link to="/">
            <img class="logo" src="../../assets/logo.png" />
          </router-link>
        </v-col>
        <v-col sm="3" class="d-inline-flex align-center flex-row justify-end">
          <v-btn icon v-if="cart.length > 0" @click="gotoCart">
            <v-badge color="secondary" :content="cart.length">
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>

          <v-btn @click="openDrawer" rounded color="white" class="black--text ma-0 pl-1 pr-1">
            منو<v-app-bar-nav-icon class="black--text"></v-app-bar-nav-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <defdrawer v-if="!authObj.isSeller || !authObj.isAuth"></defdrawer>
    <dashdrawer v-else></dashdrawer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import DefNavDrawer from './common/DefNavDrawer';
import DashboardNavDrawer from './common/DashboardNavDrawer';

export default {
  data: function() {
    return{
      
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
    ]),
    gotoCart: function() {
      this.$router.push('/cart');
    }
  },
  components: {
    defdrawer: DefNavDrawer,
    dashdrawer: DashboardNavDrawer
  },
  computed:{
    ...mapState({
      drawer: 'drawer_open',
      authObj: 'authObj',
      cart: 'cart'
    })
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