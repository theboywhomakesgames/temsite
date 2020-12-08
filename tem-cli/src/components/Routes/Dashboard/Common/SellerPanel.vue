<template>
  <v-container class="d-flex flex-column justify-center align-center ">
    <v-alert dense :color="color" v-show="success !== 0" v-text="err"></v-alert>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          درخواست تسویه حساب
        </v-card-title>
        <v-card-text>
          شماره کارت و نام و نام خانوادگی را وارد کنید
          <v-textarea v-model="content">

          </v-textarea>
          درخواست در ۴۸ ساعت آینده انجام خواهد شد. در صورت ناچیز بودن موجودی ممکن است بیشتر طول بکشد.
        </v-card-text>
        <v-card-actions>
          <v-btn @click="sendTicket" color="primary">ثبت درخواست</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
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
        <v-btn rounded outlined @click="toggleDialog">درخواست تسویه حساب</v-btn>
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
      balance: 0,
      dialog: false,
      content: "",
      success: 0,
      err: "",
      color: ""
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
    ...mapActions(['getMySales', 'getMyBalance', 'createTicket']),
    toggleDialog: function() {
      this.dialog = !this.dialog;
    },
    sendTicket: function() {
      if(this.content.length > 10){
        let data = {
          title: "درخواست تسویه حساب",
          contents: [
            {
              text: this.content,
              sender: this.authObj.username,
              date: Date.now()
            }
          ]
        };

        this.createTicket(data)
        .then(result => {
          result = result.data;
          if(result.success){
            this.success = 1;
            this.color = "success";
            this.err = "درخواست شما با موفقیت ثبت شد. لطفا از ثبت دوباره درخواست خودداری نمایید";
          }else{
            this.success = -1;
            this.color = "red";
            this.err = result.err_message;
          }
        })
        .catch(err => {
          this.success = -1;
          this.err = "عدم ارتباط با سرور";
          this.color = "warning";
        });

        this.dialog = false;
        this.content = "";
      }
    }
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