<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-row align="center">
        <v-col sm="9" class="d-inline-flex flex-row align-center">
          <v-toolbar-title>داشبورد</v-toolbar-title>
        </v-col>
        <v-col sm="3" class="d-inline-flex flex-row justify-end">
          <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-app-bar>

    <defdrawer></defdrawer>
    
  </div>
</template>

<script>
import DashboardNavDrawer from './common/DashboardNavDrawer';
import { mapState, mapMutations } from 'vuex';

export default {
  data: function() {
    return{
      ...mapState({
        drawer: 'drawer_open'
      })
    }
  },
  methods: {
    ...mapMutations([
      'openDrawer',
      'closeDrawer'
    ])
  },
  components: {
    defdrawer: DashboardNavDrawer
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