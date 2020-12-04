<template>
  <v-container class="d-flex flex-column justify-center align-center ">
    <h1 class="text-center">
      {{this.authObj.username}} عزیز <br/>
      خوش آمدید
    </h1>
    <v-card class="mt-8">
      <v-card-title>نمودار فروش سال</v-card-title>
      <v-card-text>
        <chart :data="data" class="mt-8"/>
      </v-card-text>
      <v-card-subtitle>موجودی حساب: {{balance}} تومان</v-card-subtitle>
      <v-card-actions>
        <v-btn rounded outlined>درخواست تسویه حساب</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Chart from './Charts/Chart.js';

export default {
  data: function() {
    return {
      sales: [],
      balance: 0
    }
  },
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
    },
    data: function() {
      let d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

      this.sales.forEach(sale => {
        let number = 0;
        sale.cart.forEach(item => {
          if(item.seller === this.authObj.username)
            number += item.count;
        });

        let date = new Date(sale.final_at);
        let month = date.getMonth();
        d[month] += number;
      });

      return {d};
    }
  },
  methods: {
    ...mapActions(['getMySales', 'getMyBalance'])
  },
  mounted() {
    this.getMySales()
    .then(result => {
      this.sales = result.data.sales;
    })
    .catch(err => {
      console.log(err);
    });

    this.getMyBalance()
    .then(result => {
      this.balance = result.data.balance;
    })
    .catch(err => {
      console.log(err);
    });
  },
}
</script>