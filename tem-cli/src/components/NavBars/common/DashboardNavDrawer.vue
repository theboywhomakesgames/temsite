<template>
  <div v-if="authObj !== null">
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item @click="gotoStore">
            <v-list-item-icon>
              <v-icon class="ml-10">mdi-storefront</v-icon>
            </v-list-item-icon>
            <v-list-item-title>فروشگاه من</v-list-item-title>
          </v-list-item>

          <v-list-item @click="gotoSettings">
            <v-list-item-icon>
              <v-icon class="ml-10">mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>تنظیمات فروشگاه</v-list-item-title>
          </v-list-item>

          <v-list-item @click="gotoInfo">
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
import { mapState, mapMutations } from 'vuex';

export default {
  data: function() {
    return {
      group: null
    }
  },
  methods: {
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
      return this.$router.push('/dashboard/settings');
    },
    ...mapMutations([
      'openDrawer', 'closeDrawer'
    ])
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
    ])
  }
}
</script>