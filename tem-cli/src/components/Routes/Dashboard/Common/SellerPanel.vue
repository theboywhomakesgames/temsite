<template>
  <v-container class="d-flex flex-column justify-center align-center ">
    <h1>
      {{this.authObj.username}} عزیز <br/>
      خوش آمدید
    </h1>
    <h3 class="orange--text">موجودی حساب: ۵۵۰۰۰ تومان</h3>
    <chart :data="{start: 3, d: [4, 6, 7, 4, 3]}" class="mt-8"/>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import Chart from './Charts/Chart.js';

export default {
  components: {
    chart: Chart
  },
  computed: {
    ...mapState([
      'authObj',
    ]),
    isSeller: function() {
      return this.authObj !== null && this.authObj.isAuth && this.authObj.isSeller;
    },
    isCli: function() {
      return this.authObj && this.authObj.isAuth && !this.authObj.isSeller;
    }
  }
}
</script>