<template>
  <v-container>
    <h1>سبد خرید</h1>
    <v-simple-table v-if="cart.length > 0">
      <thead>
        <tr>
          <th>
            نام محصول
          </th>
          <th>
            فروشنده
          </th>
          <th>
            سایز
          </th>
          <th>
            رنگ
          </th>
          <th>
            تعداد
          </th>
          <th>
            فی
          </th>
          <th>
            جمع قیمت
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, idx) in cart"
          :key="idx"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.seller }}</td>
          <td>{{ item.size }}</td>
          <td>{{ item.color }}</td>
          <td>{{ item.count }}</td>
          <td>{{ item.price }} تومان</td>
          <td>{{ item.price * item.count }} تومان</td>
          <v-btn @click="() => deleteFromCart(idx)" icon><v-icon color="red">mdi-close</v-icon></v-btn>
        </tr>
      </tbody>
    </v-simple-table>
    <h2 v-else>سبد خالی است</h2>
    <v-btn color="success" class="ma-4" v-if="price > 0" @click="proceedOrder">پرداخت {{price}} تومان و تکمیل خرید</v-btn>
    <v-btn color="red" @click="resetCart" class="ma-4" v-if="price > 0">تخلیه سبد خرید</v-btn>
  </v-container>
</template>

<script>
import { platform } from 'chart.js';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['cart', 'authObj']),
    price: function() {
      let price = 0;
      for(let i = 0; i < this.cart.length; i++){
        price += (this.cart[i].price * this.cart[i].count);
      }
      return price;
    }
  },
  methods: {
    deleteFromCart: function(index){
      let payload = [];
      payload.push(index);
      this.removeFromCart({payload, cookie: this.$cookies});
    },
    resetCart: function() {
      let payload = [];
      for(let i = 0; i < this.cart.length; i++){
        payload.push(i);
      }
      this.removeFromCart({payload, cookie: this.$cookies});
    },
    ...mapMutations(['removeFromCart', 'setLoginDialog']),
    ...mapActions(['placeOrder']),
    proceedOrder: function() {
      if(!this.authObj.isAuth){
        this.setLoginDialog({val: true});
      }else{
        this.placeOrder()
        .then(result => {
          console.log(result.data);
          if(result.data.success){
            this.resetCart();
          }
          else{
            console.log("there was a problem");
          }
        })
        .catch(err => {
          console.log(err);
        });        
      }
    }
  }
}
</script>