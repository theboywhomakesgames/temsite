<template>
  <v-container class="d-flex flex-column justify-center align-center ">
    <h1 class="text-center">
      {{this.authObj.username}} عزیز <br/>
      خوش آمدید
    </h1>
    
    <h2 class="mt-8">سفارشات شما</h2>
    <v-simple-table>
      <thead>
        <tr>
          <th>
            تاریخ ثبت
          </th>
          <th>
            جمع قیمت
          </th>
          <th>
            وضعیت
          </th>
          <th>
            کد مرسوله
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, idx) in orders"
          :key="idx"
        >
          <td>{{ item.final_at }}</td>
          <td>{{ item.price }} تومان</td>
          <td>{{ status[item.status] }}</td>
          <td>{{ item.parcel_code }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      orders: [],
      status: [
        "در حال بررسی",
        "ارسال شد"
      ]
    };
  },
  mounted() {
    this.getMyOrders()
    .then((result) => {
      this.orders = result.data.results;

      for(let key in this.orders){
        let p = 0;
        this.orders[key].cart.forEach(element => {
          p += element.price * element.count;
        });
        this.orders[key].price = p;
      }
    })
    .catch((err) => {
      console.log(err);
    });      
  },
  methods: {
    ...mapActions(['getMyOrders']),
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