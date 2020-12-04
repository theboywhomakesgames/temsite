<template>
  <v-container class="mt-8">
    <v-layout row wrap class="justify-center">
      <v-flex xs12 sm5 md4>
        <v-card>
          <v-img :src="thisItem.image_urls?thisItem.image_urls[0]:null" height="500" weight="500"></v-img>
          <v-card-title>{{thisItem.name}}</v-card-title>
          <v-card-text>{{thisItem.description}}</v-card-text>
          <v-card-subtitle><v-chip color="primary">{{thisItem.price}} تومان</v-chip></v-card-subtitle>
        </v-card>
      </v-flex>
      <v-flex class="ma-4" xs12 md4 sm4>
        <h1>خرید {{thisItem.name}}</h1>

        <p>
          برای خرید باید حتما عضو سایت شده باشید. با انتخاب گزینه خرید این آیتم به سبد خرید شما اضافه خواهد شد. پس از آن با کلیک روی آیکون سبد خرید در نوار ابزار می توانید برای تسویه حساب و ثبت نهایی سفارش اقدام نمایید.
        </p>

        <p>
          برای انتخاب سایز مناسب از راهنمای انتخاب سایز استفاده نمایید. همچنین توصیه می شود برای شکیل تر بودن لباس (در صورتی که دوست ندارید لباس اندامی باشد) یک سایز بزرگ تر سفارش دهید.
        </p>

        <v-select
          label="انتخاب سایز"
          :items="sizes"
          v-model="chosenSize"
        ></v-select>
        <v-select
          label="انتخاب رنگ بندی"
          :items="coloring"
          v-model="chosenColor"
        ></v-select>
        <v-text-field label="تعداد" type="number" v-model="count"></v-text-field>
        <v-btn color="success" @click="placeOrder">افزودن به سبد خرید</v-btn><br/>
        <v-btn color="success" class="mt-2" :disabled="canProceed" @click="gotoCart">تکمیل خرید</v-btn>
      </v-flex>
    </v-layout>      
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  data: function() {
    return {
      thisItem: {},
      sizes: ["SM(اسمال)", "MD(مدیوم)", "LG(لارج)", "XL(ایکس لارج)", "XXL(دو ایکس لارج)"],
      coloring: ["ملانژ", "سفید"],
      chosenSize: null,
      chosenColor: null,
      count: 1
    }
  },
  computed: {
    ...mapState(['cart']),
    canProceed: function() {
      return !this.cart.length > 0;
    },
    itemId: function() {
      return this.$route.params.item;
    },
    sellerUsername: function() {
      return this.$route.params.user;
    }
  },
  methods: {
    ...mapActions(['getAllItems']),
    ...mapMutations(['addToCart']),
    getItem: function() {
      this.getAllItems({_id: this.itemId})
      .then(result => {
        this.thisItem = result.data[0];
      })
      .catch(err => {
        console.log(err);
      });
    },
    placeOrder: function() {
      if(this.chosenSize && this.chosenColor){
        if(this.count > 0)
          this.addToCart({payload: [{...this.thisItem, size: this.chosenSize, color: this.chosenColor, count: this.count, seller: this.sellerUsername}], cookie: this.$cookies});
      }
      else{
        // err

      }
    },
    gotoCart: function() {
      this.$router.push("/cart");
    }
  },
  mounted() {
    this.getItem();
  }
}
</script>