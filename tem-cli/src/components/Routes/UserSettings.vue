<template>
  <v-container>
    <v-layout wrap column class="align-center">
      <v-col sm="10" lg="8" md="8">
        <h1>
          تنظیمات کاربری
        </h1>

        <v-alert :color="alert_color" v-text="alert_message" v-show="show_alert"></v-alert>

        <v-text-field v-model="address" clearable label="آدرس جدید" hint="نام و نام خانوادگی را آخر آدرس ذکر نمایید"></v-text-field>
        <v-text-field v-model="zipcode" clearable label="کد پستی جدید"></v-text-field>
        <v-text-field v-model="city" clearable label="نام شهر"></v-text-field>
        <v-btn color="primary" @click="apply">ثبت آدرس جدید</v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      address: "",
      zipcode: "",
      city: "",
      show_alert: false,
      alert_message: "",
      alert_color : "success"
    };
  },
  mounted() {
    if(!this.authObj.isAuth){
      this.$router.push("/404");
    }
  },
  computed: {
    ...mapState(['authObj'])
  },
  methods: {
    ...mapActions(['checkAuth', 'addNewAddress']),
    apply: function() {
      if(this.address.length < 5 || this.zipcode.length < 9 || this.city.length < 1){
        this.show_alert = true;
        this.alert_color = "error";
        this.alert_message = "آدرس یا کدپستی و یا نام شهر نامعتبر";
        return;
      }

      let na = [];
      na.push({address: this.address, zipcode: this.zipcode, city: this.city});

      this.addNewAddress(na)
      .then(result => {
        result = result.data;
        if(result.success){
          this.show_alert = true;
          this.alert_color = "success";
          this.alert_message = "آدرس جدید با موفقیت ثبت شد.";
          this.address = "";
          this.zipcode = "";
          this.city = "";
        }else{
          this.show_alert = true;
          this.alert_message = result.err_message;
          this.alert_color = "error";
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}
</script>