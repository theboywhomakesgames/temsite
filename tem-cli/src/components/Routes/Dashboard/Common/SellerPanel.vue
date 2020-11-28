<template>
  <v-container class="d-flex flex-column justify-center align-center ">
    <h1>
      {{this.authObj.username}} عزیز <br/>
      خوش آمدید
    </h1>
    <h3 class="orange--text">موجودی حساب: 55000 تومان</h3>
    <chart :data="data" class="mt-8"/>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Chart from './Charts/Chart.js';

export default {
  data: function() {
    return {
      sales: []
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
            number++;
        });

        let date = new Date(sale.final_at);
        let month = date.getMonth();
        d[month] += number;
      });

      return {d};
    }
  },
  methods: {
    ...mapActions(['getMySales'])
  },
  mounted() {
    this.getMySales()
    .then(result => {
      this.sales = result.data.sales;
    })
    .catch(err => {
      console.log(err);
    });
  },
}
</script>