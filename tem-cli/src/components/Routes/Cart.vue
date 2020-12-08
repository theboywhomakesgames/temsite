<template>
  <v-container v-if="authObj.isAuth">
    <v-dialog width="500" v-model="dialog">
      <v-card>
        <v-card-title>
          تکمیل خرید
        </v-card-title>

        <v-card-text>
          فاکتور خرید:
          {{receipt}}
          <br/>
          آدرس:
          {{addresses[chosen].address}}
          <br/>
          مبلغ:
          {{price}} تومان
        </v-card-text>

        <v-card-subtitle>
          لطفا از درستی آدرس و موارد انتخاب شده مطمین شوید
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="proceedOrder">پرداخت</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    <v-btn color="red" @click="resetCart" class="ma-4" v-if="price > 0">تخلیه سبد خرید</v-btn>

    <hr class="mt-8"/>
    <h3 class="mt-8 mb-4">آدرس مورد نظر را برای ارسال انتخاب نمایید</h3>

    <v-container>
      <v-layout row wrap>
        <v-flex class="ma-1" md-2 lg2 v-for="(itm, idx) in addresses" :key="idx">
          <v-card @click="chosen = idx" max-height="300" max-width="300" outlined :color="idx === chosen ? 'white' : '#444'">
            <v-card-title>
              <v-icon v-show="idx === chosen" color="green">mdi-check</v-icon>
              {{itm.city}}
            </v-card-title>
            <v-card-text>
              {{itm.address}}<br/>
              {{itm.zipcode}}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn color="primary" class="ma-2" @click="gotoSettings">
      افزودن آدرس
    </v-btn>

    <v-btn color="success" class="ma-2" v-if="price > 0" @click="showReceipt">پرداخت {{price}} تومان و تکمیل خرید</v-btn>
  </v-container>
  <h1 v-else>برای ادامه خرید باید وارد شوید. اگر اکانت ندارید از منو و بخش ثبت نام اقدام نمایید.</h1>
</template>

<script>
import { platform } from 'chart.js';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      addresses: [],
      chosen: 0,
      dialog: false,
      receipt: ""
    };
  },
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
    showReceipt: function(){
      if(!this.authObj.isAuth){
        this.setLoginDialog({val: true});
      }else{
        this.receipt = "";
        this.cart.forEach(element => {
          this.receipt += element.name + " " + element.size + " " + element.count + " " + element.color + "      ";
        });
        this.dialog = true;
      }
    },
    gotoSettings: function(){
      this.$router.push("/settings");
    },
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
    ...mapActions(['placeOrder', 'getMyAddresses']),
    proceedOrder: function() {
      if(!this.authObj.isAuth){
        this.setLoginDialog({val: true});
      }else{
        this.dialog = false;
        this.placeOrder(this.addresses[this.chosen])
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
    },
  },
  mounted() {
    this.getMyAddresses()
    .then(result => {
      this.addresses = result.data.addresses;
    })
    .catch(err => {
      console.log(err);
    });
  }
}
</script>