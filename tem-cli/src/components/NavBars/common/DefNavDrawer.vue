<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group">
        <v-list-item @click="gotoHome">
          <v-list-item-icon>
            <v-icon class="ml-10">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>صفحه اصلی</v-list-item-title>
        </v-list-item>

        <v-list-item @click="gotoDashboard" v-if="authObj !== null">
          <v-list-item-icon>
            <v-icon class="ml-10">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>داشبورد</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
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
    gotoHome: function() {
      this.$router.push('/');
    },
    gotoLogin: function() {
      this.$router.push('/login');
    },
    gotoDashboard: function() {
      this.$router.push('/dashboard');
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