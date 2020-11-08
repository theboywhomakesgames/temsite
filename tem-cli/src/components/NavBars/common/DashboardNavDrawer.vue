<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item @click="gotoHome">
          <v-list-item-icon>
            <v-icon class="ml-10">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>صفحه اصلی</v-list-item-title>
        </v-list-item>
        
        <v-list-item @click="logout" v-if="authObj.isAuth">
          <v-list-item-icon>
            <v-icon class="ml-10">mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>خروج</v-list-item-title>
        </v-list-item>

        <v-list-item-group v-model="group" v-if="isSeller">
          <v-list-item @click="gotoStore">
            <v-list-item-icon>
              <v-icon class="ml-10">mdi-storefront</v-icon>
            </v-list-item-icon>
            <v-list-item-title>فروشگاه من</v-list-item-title>
          </v-list-item>

          <v-list-item @click="gotoSettings" v-if="isSeller">
            <v-list-item-icon>
              <v-icon class="ml-10">mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>تنظیمات فروشگاه</v-list-item-title>
          </v-list-item>

          <v-list-item @click="gotoInfo" v-if="isSeller">
            <v-list-item-icon>
              <v-icon class="ml-10">mdi-chart-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>اطلاعات</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      group: null
    }
  },
  methods: {
    gotoHome: function () {
      this.$router.push("/");
    },
    gotoStore: function() {
      this.$router.push('/store/' + this.authObj.username);
    },
    gotoLogin: function() {
      this.$router.push('/login');
    },
    gotoDashboard: function() {
      this.$router.push('/dashboard');
    },
    gotoInfo: function() {
      return this.$router.push('/dashboard/info');
    },
    gotoSettings: function() {
      return this.$router.push('/dashboard/shopsettings');
    },
    ...mapMutations([
      'openDrawer', 'closeDrawer'
    ]),
    ...mapActions(['checkAuth', 'logout']),
  },
  computed: {
    drawer: {
      get:
        function() {
          return this.$store.state.drawer_open
        },
      set:
        function(input) {
          if (input){
            return this.openDrawer()
          }
          else{
            return this.closeDrawer()
          }
        }
    },
    ...mapState([
      'authObj'
    ]),
    isSeller: function() {
      return this.authObj !== null && this.authObj.isAuth && this.authObj.isSeller;
    },
  }
}
</script>